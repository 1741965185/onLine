import request from "@/utils/request";

// 保证金划款列表
export function hkSeeBondList(data) {
	return request({
		url: "/hkSeeBondList/getList",
		method: "GET",
		params: data,
	});
}

// 保证金详情
export function seeBonds(data) {
	return request({
		url: "/hkSeeBondList/seeBonds",
		method: "GET",
		params: data,
	});
}

// 保证金明细
export function seeBondDetails(data) {
	return request({
		url: "/hkSeeBondList/seeDetailed",
		method: "GET",
		params: data,
	});
}