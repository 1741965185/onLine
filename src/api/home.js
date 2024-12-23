import { http } from "./auth";

// 汇总金额
export const getSummary = (params) => http.get("/transactionMerchantSum/getSummary", params);

// 交易金额
export const getTradeSum = (params) => http.get("/transactionMerchantSum/getTradeSum", params);

// 交易金额
export const getProtest = (params) => http.get("/transactionMerchantSum/getProtest", params);

// 首页账户金额
export const getAccountBalance = (params) => http.get("/transactionMerchantSum/getAccountBalance",params);
// 获取商户号
export const merQueryAccount = (params) => http.get("/transactionMerchantSum/merQueryAccount");
// 生成充值链接
export const checkStand = (data) => http.post("https://bit.onlinepay.ai/cashier/checkStandPay", data);
// 显示通知信息
export const getCountandList = (params) => http.get("merchantnotice/getNotice", params);
// 阅读去除小红点通知信息
export const allRead = (data) => http.post("merchantnotice/allRead", data);

// 获取商户号
export const getCurrency = (params) => http.get("/transactionMerchantSum/getCurrency",params);// 获取商户号
export const checkStandPay = (data) => http.post("/cashier/checkStandPay", data);
// 开户
export const addAccountBalance = (data) => http.post("/transactionMerchantSum/addAccountBalance", data);
// 获取币种详情
export const getCurrencyDetail = (params) => http.get("/transactionMerchantSum/getCurrencyDetail", params);// 获取汇率
// 获取汇率
export const getCurrRate = (params) => http.get("/cashier/getRate", params);// 获取汇率
// 币种
export const getPayCurrency = (params) => http.get("/cashier/getPayCurrency" , params);
// 币种
export const getPayMethodList = (params) => http.get("/cashier/getPayMethodList" , params);
//获取收款人列表
export const getPayeeList = (param) => http.get("/withdraw/getBeneficiary",param);

export const getHomeList = (param) => http.get("/tranmanagementList/homeTradeList",param);

//获取网络对应的地址
export const getAddress = (param) => http.get("/netWorkAddress/getAddress",param);

export const getAccount = (param) => http.get("/netWorkAddress/getAccount",param);

//插入对应网络的地址
export const insertAddress = (data) => http.post("/netWorkAddress/insertNetWorkAddress",data);
