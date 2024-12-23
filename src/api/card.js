/*ghx*/
import request from '@/utils/request';

// 获取充值卡列表
export function getCardList(params) {
  return request({
    url: '/cardManage/cardList',
    method: 'Get',
    params,
  });
}
//  充值卡启用
export function unCancelCard(data) {
  return request({
    url: "/cardManage/updateStatus",
    method: "post",
    data,
  });
}
// 获得
export function getVpaScene(params) {
  return request({
    url: "/cardManage/getVpaScene",
    method: "get",
    params,
  });
}
// 修改场景
export function updateVpaScene(data) {
  return request({
    url: "/cardManage/updateVpaScene",
    method: "post",
    data,
  });
}
// 获取充值卡详情
export function getCardById(params) {
  return request({
    url: '/cardManage/getById',
    method: 'Get',
    params,
  });
}
// 获取充值卡详情
export function getPayInfo(params) {
  return request({
    url: '/cardManage/getPayInfo',
    method: 'Get',
    params,
  });
}
export function getCardTransactionList(params) {
  return request({
    url: '/cardTransaction/getList',
    method: 'Get',
    params,
  });
}
