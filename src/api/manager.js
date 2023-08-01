import request from '@/util/request.js'

// 账号管理
/*
* 查询管理员账号列表
* @data{
    nickname 昵称
    account 账号
    pid 父级ID
    sex 性别，1：未定义，2：男，3：女
    status 状态，1：开启，2：禁用
    page 页数
    pageNum 翻页数据
  }
 */
export function getauthmanagerList(data) {
  return request({
    url: '/management/auth.auth_manager/getList',
    method: 'post',
    data
  })
}

/*
* 添加管理员账号
* @data{
    nickname 昵称
    account 账号
    password 密码
    sex 性别，1：未定义，2：男，3：女
    pic 图片
    status 状态，1：开启，2：禁用
    page 页数
    pageNum 翻页数据
  }
 */
export function addmanager(data) {
  return request({
    url: '/management/auth.auth_manager/add',
    method: 'post',
    data
  })
}

/*
* 修改账号信息
* @data{
    manager_id 账号ID
    nickname 昵称
    sex 性别，1：未定义，2：男，3：女
    pic 头像图片
    status 状态，1：开启，2：禁用
  }
 */
export function updatemanager(data) {
  return request({
    url: '/management/auth.auth_manager/update',
    method: 'post',
    data
  })
}

/*
* 修改账号密码
* @data{
    manager_id 账号ID
    password 密码
  }
 */
export function updatePassword(data) {
  return request({
    url: '/management/auth.auth_manager/updatePassword',
    method: 'post',
    data
  })
}

/*
* 删除账号
* @data{
    manager_id 账号ID
  }
 */
export function delmanager(data) {
  return request({
    url: '/management/auth.auth_manager/del',
    method: 'post',
    data
  })
}

/*
* 查询账号关联权限角色列表
* @data{
    manager_id 账号ID
  }
 */
export function getroleList(data) {
  return request({
    url: '/management/auth.auth_manager_role/getList',
    method: 'post',
    data
  })
}

/*
* 管理员账号绑定权限角色
* @data{
    manager_id 账号ID
    role_id 权限角色ID，逗号间隔
  }
 */
export function bindrole(data) {
  return request({
    url: '/management/auth.auth_manager_role/bind',
    method: 'post',
    data
  })
}

/*
* 管理员账号绑定权限角色
* @data{
    mr_id 账号关联权限角色ID，逗号间隔
  }
 */
export function unbindrole(data) {
  return request({
    url: '/management/auth.auth_manager_role/unbind',
    method: 'post',
    data
  })
}
