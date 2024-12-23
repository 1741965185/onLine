import request from "@/utils/request"

// 根据虚拟实物获取所属行业
export function getBlongBusiness(params) {
	return request({
		url: "/getBlongBusiness",
		method: "GET",
		params,
	})
}
// 根据虚拟实物获取所属行业
export function getCertificationsCategory(params) {
	return request({
		url: "/mercertification/getCertification",
		method: "GET",
		params,
	})
}
// 获取卡设置
export function getCardSetting(params) {
	return request({
		url: "/cardApplication/getCardSetting",
		method: "GET",
		params,
	})
}

// 获取验证码
export function getRand(data) {
	return request({
		url: "/getRandWithEmail",
		method: "POST",
		data
	})
}

// 商户注册
export function merchantRegister(data) {
	return request({
		url: "/merchantRegister",
		method: "POST",
		data
	})
}

// 生成密钥
export function generateKey() {
	return request({
		url: "/generateKey",
		method: "POST",
	})
}