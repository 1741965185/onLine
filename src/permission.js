import router from "./router";
import {
	getToken
} from "@/utils/auth";
import store from "./store";
import {
	Message
} from "element-ui";

const whiteList = ["/login", "/register","/404"];

router.beforeEach((to, from, next) => {
	if (sessionStorage.getItem("JWT")) {
		if (to.path === "/login") {
			next({
				path: "/"
			});
		} else {
			if (store.getters.permissions.length === 0) {
				// 判断当前用户是否已拉取完user_info信息
				store.dispatch("GetInfo").then(() => {
					store.dispatch("GenerateRoutes").then(accessRoutes => {
						// 根据roles权限生成可访问的路由表
						router.addRoutes(accessRoutes); // 动态添加可访问路由表
						next({
							...to,
							replace: true
						}); // hack方法 确保addRoutes已完成
					});
				}).catch(err => {
					store.dispatch("FedLogOut").then(() => {
						Message.error(err);
						next({
							path: "/"
						});
					});
				});
			} else {
				// noCache：false进行keep-alive缓存
				// if (!to.meta.noCache) {
				// 	store.commit('tagsView/ADD_CACHED_VIEW', to.name)
				// }
				next();
			}
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next();
		} else {
			next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
		}
	}
});
