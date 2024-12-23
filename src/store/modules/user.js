import { login, logout, getInfo, updateNewView } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
	state: {
		token: "",
		name: "",
		roles: [],
		permissions: [],
		merType: 0, // 0是主商户 1是子商户
		identity: 0, // 0：未认证，1：企业 2：个人
		newView: 0, // 0是旧的，1是新的
		// 0关闭 1开
		permissionMap: {
			"download": 0,
			"website": 0,
			"submerchant": 0,
			"information": 0,
			"permission": 0
		},
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_NAME: (state, name) => {
			state.name = name;
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles;
		},
		SET_PERMISSIONS: (state, permissions) => {
			state.permissions = permissions;
		},
		SET_IS_PARENT_MER: (state, merType) => {
			state.merType = merType;
		},
		SET_IDENTITY: (state, identity) => {
			state.identity = identity;
		},
		SET_PERMISSIONMAP: (state, permissionMap) => {  // 添加这一个mutation
			state.permissionMap = permissionMap;
		},
		SET_NEWVIEW: (state, newView) => {
			state.newView = newView;

			// 调用 API 接口更新后端数据
			updateNewView({ newView }).then(response => {
				// 处理 API 返回结果，例如显示成功提示
				console.log("视图设置更新成功");
			}).catch(error => {
				// 处理 API 错误，例如显示错误提示
				console.error("视图设置更新失败", error);
			});
		},
	},

	actions: {

		// 登录
		Login({ commit }, userInfo) {
			const { account, password } = userInfo;
			return new Promise((resolve, reject) => {
				login(account, password).then(res => {
					sessionStorage.setItem("merNo", res.data.merNo);
					sessionStorage.setItem("user", res.data.user);
					sessionStorage.setItem("merId", res.data.merId);
					sessionStorage.setItem("JWT", res.data.authorization);
					// setToken(res.data.authorization);
					commit("SET_TOKEN", res.data.authorization);
					resolve(res);
				}).catch(error => {
					reject(error);
				});
			});
		},

		// 获取用户信息
		GetInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getInfo({ token: sessionStorage.getItem("JWT") }).then(result => {
					const res = result.data;
					const userName = res.userName;
					sessionStorage.setItem("secret", res.secret);
					sessionStorage.setItem("encryption", res.encryption);
					if (res.permissionList && res.permissionList.length > 0) { // 验证返回的roles是否是一个非空数组
						commit("SET_PERMISSIONS", res.permissionList);
					} else {
						commit("SET_ROLES", ["ROLE_DEFAULT"]);
					}

					commit("SET_NAME", userName);
					commit("SET_IS_PARENT_MER", res.merType);
					commit("SET_IDENTITY", res.identity);
					commit("SET_PERMISSIONMAP", res.permissionMap);
					commit("SET_NEWVIEW", res.newView);

					resolve(res);
				}).catch(error => {
					reject(error);
				});
			});
		},

		// 退出系统
		LogOut({ commit, state }) {
			// return new Promise((resolve, reject) => {
			//   logout(state.token).then(() => {
			//     commit('SET_TOKEN', '')
			//     commit('SET_ROLES', [])
			//     commit('SET_PERMISSIONS', [])
			//     removeToken()
			//     resolve()
			//   }).catch(error => {
			//     reject(error)
			//   })
			// })
		},

		// 前端 登出
		FedLogOut({ commit }) {
			return new Promise(resolve => {
				commit("SET_TOKEN", "");
				commit("SET_ROLES", []);
				commit("SET_PERMISSIONS", []);
				commit("SET_IDENTITY", 0);
				// removeToken();
				sessionStorage.clear()
				resolve();
			});
		},
	},
};

export default user;
