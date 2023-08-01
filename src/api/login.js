import request from '@/util/request.js'

// 获取验证码
export function getCaptcha(data) {
  return request({
    url: '/management/login/getCaptcha',
    method: 'POST',
    data
  })
}

/* 登录
 * @data = {
    account 登录账号
    password 登录密码
    code 验证码
 }
 */
export function login(data) {
  return request({
    url: '/management/login/login',
    method: 'POST',
    data
  })
}

// 退出登录
export function logout(data) {
  return request({
    url: '/management/login/logout',
    method: 'POST',
    data
  })
}
