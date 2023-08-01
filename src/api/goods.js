import request from '@/util/request.js'

/*
* 查询商品列表
* @data{
    goods_id 商品ID
    goods_name 商品名称
    status 商品状态 1：启用，2：禁用
    gc_id 分类ID
    pageNum 页面数据
  }
 */
export function getList(data) {
  return request({
    url: '/management/goods.goods/getList',
    method: 'post',
    data
  })
}

/*
 * 查询单条商品
 * @data{
   goods_id 商品ID
 }
 */
export function getFind(data) {
  return request({
    url: '/management/goods.goods/getFind',
    method: 'post',
    data
  })
}

/*
 * 查询公用商品列表
 * @data{
   goods_id 商品ID
   goods_name 商品名称
   status 商品状态 1：启用，2：禁用
   gc_id 分类ID
   pageNum 页面数据调
 }
 */
export function getPublic(data) {
  return request({
    url: '/management/goods.goods/getPublic',
    method: 'post',
    data
  })
}

/*
 * 添加商品
 * @data{
   goods_name 商品名称
   pic 商品图片
   bar_code 条形码
   cost_price 成本价
   retail_price 零售价
   sell_by_date 保质期
   status 状态 1：启用，2：禁用，默认1
   is_public 公用商品 1：是，2：否，默认2
   gc_id 分类ID
   gc_name 分类名称 当分类ID大于0是，分类名称必传
 }
 */
export function addgoods(data) {
  return request({
    url: '/management/goods.goods/add',
    method: 'post',
    data
  })
}

/*
 * 修改商品
 * @data{
   goods_id 商品ID
   goods_name 商品名称
   pic 商品图片
   bar_code 条形码
   cost_price 成本价
   retail_price 零售价
   sell_by_date 保质期
   status 状态 1：启用，2：禁用，默认1
   is_public 公用商品 1：是，2：否，默认2
   gc_id 分类ID
   gc_name 分类名称 当分类ID大于0是，分类名称必传
 }
 */
export function update(data) {
  return request({
    url: '/management/goods.goods/update',
    method: 'post',
    data
  })
}

/*
 * 删除商品
 * @data{
   goods_id 商品ID
 }
 */
export function delgoods(data) {
  return request({
    url: '/management/goods.goods/del',
    method: 'post',
    data
  })
}

/*
 * 查询商品分类列表
 * @data{
   gc_name 分类名称
   pageNum 页面数据调
 }
 */
export function getcategory(data) {
  return request({
    url: '/management/goods.goods_category/getList',
    method: 'post',
    data
  })
}

/*
 * 添加商品分类
 * @data{
   gc_name 分类名称
   sort 排序
   status 状态 1.启用 2.禁用
 }
 */
export function addcategory(data) {
  return request({
    url: '/management/goods.goods_category/add',
    method: 'post',
    data
  })
}

/*
 * 修改商品分类
 * @data{
   gc_id 分类ID
   gc_name 分类名称
   sort 排序
   status 状态 1.启用 2.禁用
 }
 */
export function updatecategory(data) {
  return request({
    url: '/management/goods.goods_category/update',
    method: 'post',
    data
  })
}

/*
 * 删除商品分类
 * @data{
   gc_id 分类ID
 }
 */
export function delcategory(data) {
  return request({
    url: '/management/goods.goods_category/del',
    method: 'post',
    data
  })
}
