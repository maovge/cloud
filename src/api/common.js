import request from '@/util/request.js'

/* 文件上传
  * @data{
    folder 文件夹名称
    file 上传文件的名称
  }
 */
export function uploadFile(data) {
  return request({
    url: '/management/common/uploadFile',
    method: 'POST',
    data
  })
}

/* 查询城市列表
  * @data{
    city_pid 上级ID，不传默认0
    city_fullname 全称
    city_title 简称
    city_code 编码
    city_level 层级
  }
 */
export function getcityList(data) {
  return request({
    url: '/management/common.city/getList',
    method: 'POST',
    data
  })
}

/* 获取账户信息
  * @data{
    nickname 昵称
    account 账号
    pid 父级ID
    sex 性别，1：未定义，2：男，3：女
    status 状态，1：开启，2：禁用
    page 页数
    pageNum 翻页页面数据条数
  }
 */
export function getmanagerList(data) {
  return request({
    url: '/management/auth.auth_manager/getList',
    method: 'POST',
    data
  })
}

/*  获取销售汇总数据
  * @data{}
 */
export function salesSummary(data) {
  return request({
    url: '/management/index/salesSummary',
    method: 'POST',
    data
  })
}

/*  获取门店汇总数据
  * @data{}
 */
export function storeSummary(data) {
  return request({
    url: '/management/index/storeSummary',
    method: 'POST',
    data
  })
}

/*  获取利润汇总数据
  * @data{}
 */
export function profitSummary(data) {
  return request({
    url: '/management/index/profitSummary',
    method: 'POST',
    data
  })
}

/*  获取货损汇总数据
  * @data{}
 */
export function cargoDamageSummary(data) {
  return request({
    url: '/management/index/cargoDamageSummary',
    method: 'POST',
    data
  })
}

/*  获取门店销售排行榜
  * @data{
    pageNum 信息条数
  }
 */
export function storeSaleList(data) {
  return request({
    url: '/management/index/storeSaleList',
    method: 'POST',
    data
  })
}

/*  获取商品销售排行榜
  * @data{
    pageNum 信息条数
  }
 */
export function goodsSaleList(data) {
  return request({
    url: '/management/index/goodsSaleList',
    method: 'POST',
    data
  })
}
