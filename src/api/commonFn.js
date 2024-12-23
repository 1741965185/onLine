import { http } from "./auth";

// 获取结算币种
export const settlementCurrency = (params) => http.get("/common/settlementCurrency/list");

// 获取原始币种
export const originCurrency = (params) => http.get("/common/originCurrency/list");

// 获取商户号
export const merQueryAccount = (params) => http.get("/transactionMerchantSum/merQueryAccount");
