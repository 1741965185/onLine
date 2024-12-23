import { http } from "./auth";
import axios from "axios";
const options = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
// 汇总金额
export const upload = (data) => http.formPost("/file/upload", data);
export const uploadFid = (data) => http.formPost("/file/uploadFid", data);
//实名状态
export const getCertificationStatus = (params) => http.get("/mercertification/getStatus", params);
//提交实名
export const certificationApply= (params) => http.get("/mercertification/apply", params);
//申请开卡
export const openCard= (data) => http.post("/cardApplication/openCard", data);

//transferOut 转出
export const transferOut= (data) => http.post("/cardTransaction/transferOut", data);
//转入
export const transferIn= (data) => http.post("/cardTransaction/transferIn", data);
//激活卡
export const activeCard= (data) => http.post("/cardManage/activeCard", data);
//申请开卡
export const addVpaScene= (data) => http.post("/cardManage/addVpaScene", data);
//提交实名
export const addInformation= (data) => http.post("/withdraw/addInformation", data);
export const submitTransferOrderInfo= (data) => http.post("/tranmanagementList/submitTransferOrderInfo", data);

