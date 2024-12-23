// Vuex模块
import {getCertificationStatus } from "@/api/certification";
import router from "@/router";

const certification = {
	state: {
		isPopupVisible: false,
	},
	mutations: {
		showPopup(state) {
			state.isPopupVisible = true;
		},
		hidePopup(state) {
			state.isPopupVisible = false;
		},
	},
	actions: {
		// 0 未实名 1 已实名 2 审核中
		checkAuditStatus({ commit , dispatch}) {
			return new Promise((resolve, reject) => {
				getCertificationStatus({
					merId: sessionStorage.getItem("merId"),
				})
					.then((response) => {
						const certificationStatus = response.data;
						if (certificationStatus === 1) {
							resolve(); // 审核已通过
						} else if (certificationStatus === 0) {
							commit("showPopup"); // 未提交审核，显示弹窗
							reject(); // 通过reject方法终止Promise链，防止继续执行后续代码
						} else {
							// 审核中，可以选择继续等待或者跳转到审核页面
							// 根据实际需求编写相应的逻辑
							commit("showPopup"); // 未提交审核，显示弹窗
							// dispatch("goToAuthentication"); // 调用 goToAuthentication action
							reject(); // 通过reject方法终止Promise链，防止继续执行后续代码
						}
					})
					.catch((error) => {
						console.error(error);
						reject(error); // 处理接口请求失败的情况
					});
			});
		},
		goToAuthentication({ commit }) {
			commit("hidePopup"); // 隐藏弹窗
			// 跳转到实名认证页面
			router.push({
				path: "/AuthenticationProcessing",
				name: "AuthenticationProcessing",
				meta: {
					title: "实名认证",
				},
			});
		},
	},
};
export default certification