import request from "@/utils/request"
/*************************************************************交易订单 *********************************************************************8*/
//查询订单列表
export function getList(params) {
	return request({
		url: "/tranmanagementList/tradeList",
		method: "GET",
		params
	})
}
// 查询订单详情
export function getCardTransactionById(data) {
	return request({
		url: "/cardTransaction/getById",
		method: "GET",
		params: data,
	});
}
//查询新订单列表
export function getNewTradeList(params) {
	return request({
		url: "/tranmanagementList/newTradeList",
		method: "GET",
		params
	})
}
//查询新订单列表
export function downloadOrderListAll(data) {
	return request({
		url: "/tranmanagementList/getListXz3",
		method: "POST",
		data
	})
}
//订单列表的  下载
export function getDownLoad(params) {
	return request({
		url: "/tranmanagementList/getListXz",
		method: "GET",
		params,
        responseType: 'blob',
	})
}
// 交易查询页面的按流水号查询详情
export function queryDd(params) {
	return request({
		url: "/tranmanagementList/getListJy",
		method: "GET",
		params
	})
}

//查询货物详情
export function getCargodeDetails(data) {
	return request({
		url: "/tranmanagementList/getListHw",
		method: "POST",
		params: data,
	})
}

//查询货物详情
export function getDetailsDynamic(data) {
	return request({
		url: "/tranmanagementList/getLog",
		method: "get",
		params: data,
	})
}

// 订单跟踪列表
export function getListCx(data) {
	return request({
		url: "/order/getListCx",
		method: "POST",
		params: data,
	})
}

//订单跟踪列表的  下载
export function getDownLoadCx(params) {
	return request({
		url: "/order/getListXz",
		method: "GET",
		params,
        responseType: 'blob',
	})
}
/*********************************************************************交易变更************************************************************************/
//交易变更订单列表
export function getjyListCx(data) {
	return request({
		url: "/tranmanagementList/transChange",
		method: "POST",
		params: data,
	})
}

//交易变更退款列表
export function getTkListCx(data) {
	return request({
		url: "/refundorderquery/getByRefund",
		method: "GET",
		params: data,
	})
}
//交易变更退款  下载
export function getTKDownLoad(params) {
	return request({
		url: "/refundorderquery/getListrefundXz",
		method: "GET",
		params,
        responseType: 'blob',
	})
}


//交易变更拒付列表
export function getJfListCx(data) {
	return request({
		url: "/fefusepay/getList",
		method: "GET",
		params: data,
	})
}
//交易变更拒付  下载
export function getJFDownLoad(params) {
	return request({
		url:"/fefusepay/getListprotestXz",
		method: "GET",
		params,
        responseType: 'blob',
	})
}


//当点击 退款的时候 编辑 退款申请
export function submitRefundDetail(params) {
	return request({
		url: "/submitrefund/submitRefundDetail",
		method: "get",
		params: params,
	})
}

//退款申请
export function Refundapplication(data) {
	return request({
		url: "/submitrefund/submitapplication",
		method: "POST",
		params: data,
	})
}

//模板下载

export function downExcel() {
	return request({
		url: "/batchsubmitrefund/downExcel",
		method: "GET",
        responseType: 'blob',
	})
}

// 详情页中点击卡号和电子邮件后 按卡号或者电子邮件查询
export function getWithdrawDetail(data) {
	return request({
		url: "/withdraw/getDetail",
		method: "GET",
		params: data,
	});
}

// 获取提现订单动态变化
export function getWithdrawDetailDynamic(data) {
	return request({
		url: "/withdraw/getLog",
		method: "GET",
		params: data,
	});
}

// 获取子商户列表
export function getQueryAccount(data) {
	return request({
		url: "/transactionMerchantSum/merQueryAccount",
		method: "GET",
		params: data,
	})
}

// 查询报表表格
export function getTradeList(data) {
	return request({
		url: "/tranmanagementList/getTradeList",
		method: "GET",
		params: data,
	})
}

// 查询报表表格详情
export function tradseeDetails(data) {
	return request({
		url: "/tranmanagementList/tradseeDetails",
		method: "GET",
		params: data,
	})
}
















// // 查询通道列表
// export function getListTd() {
// 	return request({
// 		url: "/tradeRecord/getListTd",
// 		method: "get",
// 	})
// }

// // 交易变更 更改订单状态
// export function newupdateOperation(data) {
// 	return request({
// 		url: "/ChangeOfTransaction/newupdateOperation",
// 		method: "post",
// 		data,
// 	})
// }



// // 详情页中点击卡号和电子邮件后 按卡号或者电子邮件查询
// export function queryDeta(data) {
// 	return request({
// 		url: "/queryDeta/getList",
// 		params: data,
// 	})
// }

// // 订单退款查询
// export function orderRefund(data) {
// 	return request({
// 		url: "/orderRefund/getList",
// 		method: "GET",
// 		params: data,
// 	})
// }

// // 订单退款下载excel
// export function seehkDetailExcel(data) {
// 	return request({
// 		url: "/orderRefund/seehkDetailExcel",
// 		method: "GET",
// 		params: data,
// 	})
// }


// // 拒付列表
// export function protest(data) {
// 	return request({
// 		url: "/protest/getList",
// 		method: "GET",
// 		params: data,
// 	})
// }

// // 订单跟踪详情页面
// export function getListId(data) {
// 	return request({
// 		url: "/protocolMgmt/getListId",
// 		method: "GET",
// 		params: data,
// 	})
// }

// // 拒付录入
// export function addprotest(data) {
// 	return request({
// 		url: "/addprotest/insert",
// 		method: "POST",
// 		data,
// 	})
// }
