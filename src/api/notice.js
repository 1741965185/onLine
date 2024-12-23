// 显示通知信息
import { http } from "@/api/auth";

export const getNoticeList = (params) => http.get("merchantnotice/getList", params);