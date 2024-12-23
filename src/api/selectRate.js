import {http} from './auth'

// 查询汇率列表
export const findMerchantRate = (data) => http.post("/findMerchantRate", data);
