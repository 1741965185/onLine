import axios from "axios";
import qs from "qs";
import { getToken } from "./auth";
import errorCode from "./errorCode";
import store from "../store";
import { Message, MessageBox, Notification } from "element-ui";
import i18n from "@/i18n";

class Axios {
	constructor(options = {}) {
		this.baseURL = options.baseURL || "";
		this.timeout = options.timeout || 20000;
		this.headers = options.headers ? { "Content-Type": "application/json", ...options.headers } : { "Content-Type": "application/json" };
		// this.requestInterceptors = options.requestInterceptors;
		// this.responseInterceptors = options.responseInterceptors;
		// axios 拦截设置及错误处理
		// this.requestInterceptorsError = options.requestInterceptorsError;
		// this.responseInterceptorsError = options.responseInterceptorsError;
		this.init();
	}

	init() {
		this.http = axios.create({
			baseURL: this.baseURL,
			headers: this.headers,
			timeout: this.timeout,
			transformRequest(data) {
				let strData = qs.stringify(data);
				return strData;
			},
		});
		this.setInterceptors();
	}

	setInterceptors() {
		// 设置响应和请求
		this.http.interceptors.request.use(config => {
			// 是否需要设置 token
			const isToken = (config.headers || {}).isToken === false;
			if (sessionStorage.getItem("JWT") && !isToken) {
				// 让每个请求携带自定义token 请根据实际情况自行修改
				config.headers["Authorization"] = sessionStorage.getItem("JWT");
				config.headers["merNo"] = sessionStorage.getItem("merNo");
				config.headers["merId"] = sessionStorage.getItem("merId");
				config.headers["user"] = sessionStorage.getItem("user");
				config.headers["lang"] = localStorage.getItem('lang') || "zh";
			}
			return config;
		}, error => {
			return Promise.reject(error);
		});
		// 响应拦截器
		this.http.interceptors.response.use(res => {
			//TODO code码需要后端统一
			const code = res.data.code || res.data.status || 200;
			// 获取错误信息  res中的msg是错误信息 data.data是成功信息
			const msg = errorCode[code] || res.data.msg || errorCode["default"];
			if (code === 401) {
				MessageBox.confirm(i18n.t('sysText.expiredLoginStatus'), i18n.t('sysText.systemPrompt'), {
						confirmButtonText: i18n.t('sysText.reLogin'),
						cancelButtonText: i18n.t('sysText.cancel'),
						type: 'warning',
					},
				).then(() => {
					sessionStorage.clear()
					store.dispatch("FedLogOut").then(() => {
						location.href = "/index";
					});
				}).catch(() => {
				});
			} else if (code === 500) {
				Message({
					message: msg,
					type: "error",
				});
				return Promise.reject("error");
			} else if (code === "00000") {
				return res.data;
			} else if (code !== 200) {
				Notification.error({
					title: msg,
				});
				return Promise.reject("error");
			} else {
				return res.data;
			}
		}, error => {
			return Promise.reject(error);
		});
	}

	request(options) {
		return this.http.request(options);
	}

	get(url, params = {}, options = {}) {
		return this.request({
			method: "get",
			url,
			params: { // 这里让get请求中的body中数据拼接到url后面
				...params,
			},
			...options,
		});
	}

	delete(url, options = {}) {
		return this.request({
			method: "delete",
			url,
			params: {
				...options,
			},
		});
	}

	post(url, data = {}, options = {}) {
		return this.request({
			method: "post",
			url,
			data,
			transformRequest: [($data) => {
				return JSON.stringify($data);
			}],
			...options,
		});
	}

	formPost(url, data = {}, options = {}) {
		return this.request({
			method: "post",
			url,
			data,
			transformRequest: [(data) => data], // 使用自定义的转换函数
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			...options,
		});
	}

	put(url, data, options = {}) {
		return this.request({
			method: "put",
			url,
			data,
			transformRequest: [($data) => {
				return JSON.stringify($data);
			}],
			...options,
		});
	}

	formPut(url, data, options = {}) {
		return this.request({
			method: "put",
			url,
			data,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			...options,
		});
	}

}

export default Axios;