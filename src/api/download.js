import Axios from "../utils/axios";

const AxiosOptions = {
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 10000,
};

const https = "https:";
export const http = new Axios(AxiosOptions);

// 下载订单列表
export const downloadOrderList = (params) => http.get("/tranmanagementList/getListXz2", params);
// 下载订单列表
export const downloadOrderListAllTest = (params) => http.get("/tranmanagementList/getListXz3", params);

// 下载订单追踪
export const downloadTracking = (params) => http.get("/order/getListXz2", params);

// 下载补划订单
export const downloadBhOrder = (params) => http.get("/settlement/getListExcelOne2", params);

// 下载物流管理
export const downloadLogistics = (params) => http.get("/deliver/downExcelNew2", params);

// 下载拒付
export const downloadProtest = (params) => http.get("/fefusepay/getListprotestXz2", params);

// 下载退款
export const downloadRefund = (params) => http.get("/refundorderquery/getListrefundXz2", params);

// 下载划款表明细
export const downloadQueryUpload = (params) => http.get("/query/Upload2", params);

// 下载报表
export const downloadTradeList = (params) => http.post("/tranmanagementList/downloadTradeList6", params);
