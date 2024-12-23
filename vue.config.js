"use strict";
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

const name = process.env.VUE_APP_TITLE || "OnlinePay"; // 网页标题

module.exports = {
	// 部署生产环境和开发环境下的URL
	// 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
	// 例如 https://www.baidu.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
	// 例如，如果你的应用被部署在 https://www.baidu.com/a/，则设置 baseUrl 为 /a/。
	publicPath: process.env.BASE_URL,

	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: "dist",

	// 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: "static",

	// 是否开启eslint保存检测，有效值：ture | false | 'error'
	lintOnSave: false,

	// 如果你不需要生产环境的 source wzMap，可以将其设置为 false 以加速生产环境构建。
	// 既可以减少包大小，也可以加密源码。
	productionSourceMap: false,

	// webpack-dev-server 相关配置
	devServer: {
		// host: "pay0623.tapxyz.com",
		// host: 'localhost',
		// https: true, // 是否使用https协议
		// port: "443",
		// port: '8086',
		open: true, // 是否自动弹出浏览器页面
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: "http://192.168.3.17:8180/merchant", // 本地
				// target: "http://192.168.3.219:8180/merchant", // 本地
				// target: "http://192.168.3.219:8180/merchant", // 本地
				// target: "http://192.168.20.13:8180/merchant", // 王洛龙
				//  target: "http://192.168.20.32:8180/merchant", // 邹亮
				// target: "http://192.168.20.18:8180/merchant", // 邓颖辉
				// target: "http://192.168.30.9:8082/merchant", // 支付商户后台测试端口
				// target: "https://payment.jysc.net/merchant", // 支付商户后台预发端口
				// 开启代理，在本地创建一个虚拟服务端
				changeOrigin: true,
				// ws: false, // 是否启用websockets
				pathRewrite: {
					["^" + process.env.VUE_APP_BASE_API]: "",
				},
			},
		},
		// disableHostCheck: true
	},

	// 打包文件是否使用hash
	filenameHashing: true,

	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto',
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.js$/,
					include: /node_modules\/@okxweb3/, // 对特定的 node_modules 进行处理
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		},
		name: name,
		resolve: {
			alias: {
				"@": resolve("src"),
			},
		},
		plugins: [
			// 配置webpack 压缩
			new CompressionPlugin({
				algorithm: "gzip",
				test: /\.js$|\.html$|\.css/, // 匹配文件名
				threshold: 10240, // 对超过10kb的数据进行压缩
				deleteOriginalAssets: false, // 是否删除原文件
			}),
		],
	},

	/*
	* 用chainWebpack做高级配置
	* Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
	* 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
	* 它允许我们更细粒度的控制其内部配置。接下来有一些常见的在 vue.config.js 中的 chainWebpack 修改的例子。
	* */
	chainWebpack: config => {
		config.plugins.delete("preload"); // TODO: need test
		config.plugins.delete("prefetch"); // TODO: need test

		// 修复HMR
		config.resolve.symlinks(true);

		// svg rule loader
		config.module
			.rule("svg")
			.exclude.add(resolve("src/assets/icons"))
			.end();
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/assets/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]",
			})
			.end();

		// element-ui chunks
		config.optimization.splitChunks({
			chunks: "all",
			cacheGroups: {
				libs: {
					name: "chunk-libs",
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					chunks: "initial", // only package third parties that are initially dependent
				},
				elementUI: {
					name: "chunk-elementUI", // split elementUI into a single package
					priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
					test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
				},
				commons: {
					name: "chunk-commons",
					test: resolve("src/components"), // can customize your rules
					minChunks: 3, //  minimum common number
					priority: 5,
					reuseExistingChunk: true,
				},
			},
		});
		config.optimization.runtimeChunk("single"),
			{
				from: path.resolve(__dirname, "./public/robots.txt"), //防爬虫文件
				to: "./", //到根目录下
			};
		// 开启 BundleAnalyzerPlugin
		// config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
	},
	transpileDependencies: [
		'@okxweb3/crypto-lib',
		'bigint-crypto-utils',
		'@okxweb3/coin-ethereum',
		'@okxweb3/coin-bitcoin'
	]
};
