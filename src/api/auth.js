/** 权限管理api **/

import Axios from "../utils/axios";

const AxiosOptions = {
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 8000,
};

const https = "https:";
export const http = new Axios(AxiosOptions);

// 管理员列表
export const getAdminList = (params) => http.get("/administrator/list", params);

// 角色列表
export const getRoleList = (params) => http.get("/role/list", params);

// 新增管理员
export const addAdmin = (data) => http.post("/administrator/add", data);

// 删除管理员
export const delAdmin = (data) => http.delete("/administrator/delete", data);

// 编辑管理员
export const updateAdmin = (data) => http.put("/administrator/update", data);

// 获取权限结构树
export const getTree = (params) => http.get("/permission/tree");

// 新增角色
export const addRole = (data) => http.post("/role/add", data);

// 删除角色
export const delRole = (params) => http.delete("/role/delete", params);

// 根据角色id获取权限结构树
export const roleMenuTreeselect = (params) => http.get("/role/detail", params);

// 编辑角色
export const updateRole = (data) => http.put("/role/update", data);

// 修改密码
export const changePassword = (data) => http.put("/administrator/modify/password", data);