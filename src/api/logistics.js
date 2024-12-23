import request from "@/utils/request"

// 获取  物流管理  数据
export function getlogistics(params){
    return request({
        url:"/deliver/getList",
        method:"post",
        params
    })
}
// 获取  按条件查询 物流管理  数据
export function getChecklogistics(params){
    return request({
        url:"/deliver/getListNew",
        method:"get",
        params
    })
}

// 获取  编辑 物流管理  数据
export function getRedactlogistics(data){
    return request({
        url:"/deliver/updatelogistics",
        method:"post",
        data
    })
}
// 移除  物流管理  数据 getWLDownLoad
export function removeRedactlogistics(params){
    return request({
        url:"/deliver/deleteS",
        method:"post",
        params
    })
}

//  物流管理  数据 下载
export function getWLDownLoad(params){
    return request({
        url:"/deliver/DownloadExcel",
        method:"get",
        params
    })
}
