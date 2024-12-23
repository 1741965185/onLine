import Vue from "vue"
import Router from "vue-router"
import dynamic from "./dynamic"
Vue.use(Router)

/* Layout */
import Layout from "@/layout"
import ParentView from "@/components/ParentView"
import VueQrcode from "vue-qrcode";
/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */


export const constantRoutes = [{
		path: "/redirect",
		component: Layout,
		hidden: true,
		children: [{
			path: "/redirect/:path(.*)",
			component: (resolve) => require(["@/views/redirect"], resolve),
		}, ],
	},
	{
		path: "/login",
		component: (resolve) => require(["@/views/login"], resolve),
		hidden: true,
	},
	{
		path: "/register",
		component: (resolve) => require(["@/views/register"], resolve),
		hidden: true,
	},
	{
		path: "/404",
		component: (resolve) => require(["@/views/error/404"], resolve),
		hidden: true,
	},
	{
		path: "/401",
		component: (resolve) => require(["@/views/error/401"], resolve),
		hidden: true,
	},
	{
		path: "",
		component: Layout,
		redirect: "index",
		hidden: true,
		children: [{
			path: "index",
			component: (resolve) => require(["@/views/Home"], resolve),
			name: "首页",
			meta: {
				title: "首页",
				icon: "dashboard",
				noCache: true,
				affix: true
			},
		}, ],
	},
	{
		path: "/auth",
		component: Layout,
		hidden: true,
		children: [{
			path: "manage",
			component: (resolve) => require(["@/views/Auth/index"], resolve),
			name: "AuthManage",
			meta: {
				title: "权限管理"
			},
		}, ],
	},
	{
		// passageway/configure
		path: "/passageway",
		component: Layout,
		hidden: true,
		children: [{
			path: "configure",
			component: (resolve) => require(["@/views/Passageway/configure"], resolve),
			name: "Configure",
			meta: {
				title: "个人信息"
			},
		}, ],
	},
	{
		// passageway/cashier
		path: "/passageway",
		component: Layout,
		hidden: true,
		children: [{
			path: "cashier",
			component: (resolve) => require(["@/views/Passageway/cashier"], resolve),
			name: "Cashier",
			meta: {
				title: "支付网址"
			},
		}, ],
	},
	{
		// passageway/account
		path: "/passageway",
		component: Layout,
		hidden: true,
		children: [{
			path: "account",
			component: (resolve) => require(["@/views/Passageway/account"], resolve),
			name: "Account",
			meta: {
				title: "子商户管理"
			},
		}, ],
	},
	{
		// passageway/account
		path: "/recharge",
		component: (resolve) => require(["@/views/recharge/index.vue"], resolve),
		hidden: true,
		name: "Recharge",
		meta: {
			title: "充值"
		},
	},
	{
		// passageway/account
		path: "/moneyTransfer",
		component: (resolve) => require(["@/views/moneyTransfer/index.vue"], resolve),
		hidden: true,
		name: "moneyTransfer",
		meta: {
			title: "汇款"
		},
	},
	{
		// passageway/account
		path: "/digitTransfer",
		component: (resolve) => require(["@/views/moneyTransfer/digitTransfer.vue"], resolve),
		hidden: true,
		name: "digitTransfer",
		meta: {
			title: "提现"
		},
	},
	{
		// passageway/account
		path: "/collection",
		component: (resolve) => require(["@/views/Collection/index.vue"], resolve),
		hidden: true,
		name: "Collection",
		meta: {
			title: "新增收款人"
		},
	},
	{
		// passageway/configure
		path: "/serve",
		component: Layout,
		hidden: true,
		children: [{
			path: "download",
			component: (resolve) => require(["@/views/Serve/download.vue"], resolve),
			name: "Download",
			meta: {
				title: "下载中心"
			},
		}, ],
	},
	{
		// passageway/account
		path: "/verify",
		component: (resolve) => require(["@/views/Verify/verifySelect.vue"], resolve),
		hidden: true,
		name: "Verify",
		meta: {
			title: "实名认证"
		},
	},
	{
		// passageway/account
		path: "/companyVerification",
		component: (resolve) => require(["@/views/Verify/companyVerification.vue"], resolve),
		hidden: true,
		name: "companyVerification",
		meta: {
			title: "企业实名认证"
		},
	},
	{
		// passageway/account
		path: "/personalVerification",
		component: (resolve) => require(["@/views/Verify/personalVerification.vue"], resolve),
		hidden: true,
		name: "personalVerification",
		meta: {
			title: "个人实名认证"
		},
	},
	{
		// passageway/account
		path: "/AuthenticationProcessing",
		component: (resolve) => require(["@/views/Verify/AuthenticationProcessing.vue"], resolve),
		hidden: true,
		name: "AuthenticationProcessing",
		meta: {
			title: "实名认证"
		},
	},
	{
		path: "/operation",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "operationlog",
				component: (resolve) => require(["@/views/OperationLog/index"], resolve),
				name: "OperationLog",
				meta: { title: "操作日志" },
			},
		],
	},
	{
		path: "/cardApplication",
		component: (resolve) => require(["@/views/Card/cardApplication.vue"], resolve),
		hidden: true,
		name: "cardApplication",
		meta: {
			title: "cardApplication"
		},
	},
	{
		path: "/openSubCard",
		component: (resolve) => require(["@/views/Card/openSubCard.vue"], resolve),
		hidden: true,
		name: "openSubCard",
		meta: {
			title: "openSubCard"
		},
	},
	{
		path: "/openSubCard",
		component: (resolve) => require(["@/views/Card/openSubCard.vue"], resolve),
		hidden: true,
		name: "openSubCard",
		meta: {
			title: "openSubCard"
		},
	},
	{
		path: "/fundTransfer",
		component: (resolve) => require(["@/views/FundTransfer/FundTransfer.vue"], resolve),
		hidden: true,
		name: "fundTransfer",
		meta: {
			title: "fundTransfer"
		}
	},


	{
		// passageway/account
		path: "/currencySelect",
		component: (resolve) => require(["@/components/RechangeDetail/currencySelect.vue"], resolve),
		hidden: true,
		name: "currencySelect",
		meta: {
			title: "充值"
		},
	},{
		// passageway/account
		path: "/networkSelect",
		component: (resolve) => require(["@/components/RechangeDetail/networkSelect.vue"], resolve),
		hidden: true,
		name: "networkSelect",
		meta: {
			title: "充值"
		},
	},
	{
		// passageway/account
		path: "/buyAndSell",
		component: (resolve) => require(["@/views/BuyAndSell/index.vue"], resolve),
		hidden: true,
		name: "buyAndSell",
		meta: {
			title: "买入和卖出"
		},
	},
	{
		// passageway/account
		path: "/rechargeAddress",
		component: (resolve) => require(["@/components/RechangeDetail/rechangeAddress.vue"], resolve),
		hidden: true,
		name: "rechargeAddress",
		meta: {
			title: "充值"
		},
	},
	...dynamic,
	// 支持与帮助的参考文档路由
	// {
	// 	path: "/reference",
	// 	component: Layout,
	// 	redirect: "/referenceIndex",
	// 	hidden: true,
	// 	alwaysShow: true,
	// 	isFlag: true,
	// 	meta: {
	// 		icon: "business",
	// 		noCache: false,
	// 		parentTitle: "",
	// 		title: "API参考",
	// 	},
	// 	children: [{
	// 			path: "/referenceIndex",
	// 			hidden: true,
	// 			component: (resolve) => require(["@/views/Reference/index"], resolve),
	// 			name: "referenceIndex",
	// 			meta: {
	// 				title: "参考首页"
	// 			},
	// 		},
	// 		{
	// 			path: "payInterface",
	// 			name: "payInterface",
	// 			component: (resolve) => require(["@/views/Reference/payInterface"], resolve),
	// 			meta: {
	// 				title: "支付接口"
	// 			},
	// 		},
	// 	],
	// },
]
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
	mode: "history", // 去掉url中的#
	scrollBehavior: () => {
		({
			y: 0
		})
	},
	routes: constantRoutes,
})