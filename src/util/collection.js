/*
 * 定义全局变量
 *
 */
let collection = {
  userinfo: JSON.parse(sessionStorage.getItem('userinfo')) || '', // 用户个人信息
}

export default collection
