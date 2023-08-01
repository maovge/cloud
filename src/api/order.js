import request from '@/util/request.js'

/*
* 查询销售记录
* @data{
    trade_no 订单编号，模糊查询
    mch_no 支付编号，模糊查询
    store_name 门店名称，模糊查询
    terminal_no 设备终端编号，模糊查询
    payment_type 支付类型，1：微信支付，2：支付宝支付，3：通联支付，4：京东收银，5：提货码
    payment_time 支付时间段，开始时间~结束时间
    refund_status 退款状态，1：未退款，2：已退款，3：退款失败
    page 页数
    pageNum 页面数据
  }
 */
export function getordersList(data) {
  return request({
    url: '/management/sale.sale_orders/getList',
    method: 'post',
    data
  })
}

/*
* 查询销售详情
* @data{
    order_id 订单ID
    page 页数
    pageNum 页面数据
  }
 */
export function getDetails(data) {
  return request({
    url: '/management/sale.sale_orders/getDetails',
    method: 'post',
    data
  })
}

/*
* 查询补货记录
* @data{
    manager_id 补货员ID
    store_id 门店ID
    store_name 门店名称
    shelves_number 货架编号
    goods_name 商品名称
    bar_code 商品条形码
    batch_number 生产批号
    rep_type 补货类型，1：上机补货，2：设备退货
    page 页数
    pageNum 页面数据
  }
 */
export function getrepList(data) {
  return request({
    url: '/management/store.store_shelves_rep/getList',
    method: 'post',
    data
  })
}