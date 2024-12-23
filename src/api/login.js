import request from '@/utils/request'

// 登录方法
export function login(account,password) {
  const data = {
    account,
		password
  }
  return request({
    url: '/loginByAccount',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/administrator/getByToken',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
// 新老视图
export function updateNewView(data) {
  return request({
    url: '/merchantadministration/updateNewView',
    method: 'POST',
    data: data
  })
}

// 获取动态路由
export function getMenu() {
	return request({
		url: '/menu/getMenu',
		method: 'GET'
	})
}