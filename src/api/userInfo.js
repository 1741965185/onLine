import request from "@/utils/request";

export function getUserInfo(params) {
	return request({
		url: "/merchantadministration/getList",
		method: "get",
		params,
	});
}

// 修改个人信息
export function getChangeUserInfo(data) {
	return request({
		url: "/merchantadministration/updatemerchatadmin",
		method: "post",
		data,
	});
}

// 获取 个人信息的网址 等
export function getListData(params) {
	return request({
		url: "/channelpayable/getList",
		method: "post",
		params,
	});
}

//获取IP白名单列表
export function getIPListData(params) {
	return request({
		url: "/ipWhite/getList",
		method: "get",
		params,
	});
}

// 根据网址 审核状态 查询通道支付网址
export function getCheckPayURL(params) {
	return request({
		url: "/channelpayable/getList",
		method: "post",
		params,
	});
}

// 通道 可支付网址删除
export function getDeletePayURL(params) {
	return request({
		url: "/channelpayable/dechannel",
		method: "post",
		params,
	});
}

// 通道可支付网址新增
export function getAddPayURL(data) {
	return request({
		url: "/merchantWebsiteList/addWebsite",
		method: "POST",
		data,
	});
}

// 通道可支付网址提交申请
export function getSubmitPayURL(params) {
	return request({
		url: "/channelpayable/applyforchannel",
		method: "post",
		params,
	});
}

// 通道支付网址新增弹窗中获取子商户下拉
export function getMerchantSon() {
	return request({
		url: "/merchantWebsiteList/getMerchantSon",
		method: "GET",
	});
}

// 商户白名单列表
export function getWhiteList() {
	return request({
		url: "/white/list",
		method: "GET",
	}
	);
}
export function getPrivateKey(verify){
	return request({
		url: "/merchantadministration/getPrivateKey?verify="+verify,
		method: "GET",
	})
}

export function getPublicKey(){
	return request({
		url: "/merchantadministration/getPublicKey",
		method: "GET",
	})
}

export function updateRsa(params){
	return request({
		url: "/merchantadministration/updateRsa",
		method: "POST",
		params,
	})
}


export function getPrivateKeyVerify(){
	return request({
		url: "/merchantadministration/getPrivateKeyVerify",
		method: "GET"
	})
}
export function saveIP(data) {
	return request({
		url: "/ipWhite/add",
		method: "POST",
		data
	})
}

export function deleteIP(data) {
	return request({
		url: "/ipWhite/removeById",
		method: "POST",
		data
	})
}
