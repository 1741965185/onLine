/*
 * @Author: yjh
 * @Date: 2021-08-02 18:33:09
 * @LastEditTime: 2021-08-02 18:33:12
 * @LastEditors: yjh
 * @Description: 账户管理页面接口
 * @FilePath: *
 */
import request from '@/utils/request';

// 获取账户管理列表
export function getAccountList(data) {
  return request({
    url: '/subMerchant/list ',
    method: 'POST',
    data,
  });
}

// 根据id获取子商户信息
export function accountDetail(params) {
  return request({
    url: '/accountDetail',
    method: 'GET',
    params,
  });
}

// 新增子商户
export function addAccount(data) {
  return request({
    url: '/addAccount',
    method: 'POST',
    data,
  });
}

// 修改子商户
export function updAccount(data) {
  return request({
    url: '/updAccount',
    method: 'POST',
    data,
  });
}

// 重置子商户密码
export function updatePwd(data) {
  return request({
    url: '/subMerchant/modifyPassword',
    method: 'POST',
    data,
  });
}

// 添加子商户
export function addSubMerchant(data) {
  return request({
    url: '/subMerchant/add',
    method: 'POST',
    data,
  });
}

// 子商户详情
export function subMerchantDetail(params) {
  return request({
    url: '/subMerchant/detail',
    method: 'GET',
    params,
  });
}

// 编辑子商户
export function editSubMerchant(data) {
  return request({
    url: '/subMerchant/edit',
    method: 'POST',
    data,
  });
}

// 根据域名获取商户信息
export function getMerchantInfo(params) {
  return request({
    url: '/getDomain',
    method: 'GET',
    params,
  });
}
