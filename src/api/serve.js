import { http } from './auth'

// 下载中心列表
export const downloadGetList = (params) => http.get("/download/getList", params);

// 删除下载中心数据
export const downloadDeleteList = (data) => http.post("/download/delete", data);
