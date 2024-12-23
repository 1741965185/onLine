import request from "@/utils/request"
/**********************************************************************基础设置*************************************************************/
//接口下载
export function downApiWord(data) {
	return request({
		url: "/interfacedown/downZip",
		method: "GET",
		params: data,
        responseType: 'blob',
	})
}