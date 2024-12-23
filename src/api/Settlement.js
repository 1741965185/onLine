import request from "@/utils/request"
import {param} from "@/utils";

// 获取 查看划款表
export function getHKList(params){
    return request({
        url:"/query/getList",
        method:"get",
        params
    })
}
// 获取 按条件搜索 划款表
export function getCXList(params){
    return request({
        url:"/query/getList",
        method:"get",
        params
    })
}


// 点击查看后 查看 外卡划款 的 --本期交易划款 --异常单划款以及上期补划 --手续费

export function getwkhk(params){
    return request({
        url:"/query/getwkHK",
        method:"post",
        params
    })
}



// 获取 外卡划款的划款明细
export function getCrossSectionDetails(params){
    return request({
        url:"/query/getMx",
        method:"get",
        params
    })
}


// 获取补划订单 总数据 
export function getStrokeOrder(params){
    return request({
        url:"/settlement/getList",
        method:"get",
        params
    })
}


// 获取 条件查看 补划订单 数据
export function getCheckStrokeOrder(params){
    return request({
        url:"/settlement/getList",
        method:"get",
        params
    })
}
// 补划订单 的下载
export function getBHDownLoad(params){
    return request({
        url:"/settlement/getListExcelOne",
        method:"get",
        params
    })
}



// 未计算统计unbalancedAccount
export function unbalancedAccount(params){
    return request({
        url:"/monery/getList",
        method:"get",
        params
    })
}

// 获取提现列表
export function getwithdrawList(params){
    return request({
        url:"/withdraw/getList",
        method:"get",
        params
    })
}

// 获取收款人列表
export function getmerbeneficiaryist(params){
    return request({
        url:"/merbeneficiary/getList",
        method:"get",
        params
    })
}
// 删除收款人
export function delmerbeneficiary(params){
    return request({
        url:"/merbeneficiary/delete",
        method:"get",
        params
    })
}
//重新调
export function remerbeneficiary(params){
    return request({
        url:"/merbeneficiary/reApply",
        method:"get",
        params
    })
}

// 添加收款人
export function addMerbeneficiary(params){
    return request({
        url:"/merbeneficiary/apply",
        method:"get",
        params
    })
}

// // 添加收款人
// export function addMerbeneficiary(params){
//     return request({
//         url:"/merbeneficiary/apply",
//         method:"get",
//         params
//     })
// }

// 添加收款人
export function getMerbeeficiaryDetail(params){
    return request({
        url:"/merbeneficiary/getDetail",
        method:"get",
        params
    })
}

// 获取手续费
export function getRateAndBankInfo(params){
    return request({
        url:"/withdraw/getRateAndBankInfo",
        method:"get",
        params
    })
}

export function addwithdraw(params){
    return request({
        url:"/withdraw",
        method:"post",
        data : params
    })
}

//更新提现列表
export function updateWithdraw(data) {
    return request({
        url: "/withdraw/updateById",
        method: "post",
        data,
    });
}

export function getAmount(params){
    return request({
        url:"/withdraw/getAmount",
        method:"get",
        params:params
    })
}



