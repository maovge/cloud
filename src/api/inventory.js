import request from '@/util/request.js'

// 仓库管理
/*
* 查询当前账号仓库
* @data{}
 */
export function getFind(data) {
  return request({
    url: '/management/warehouse.warehouse/getFind',
    method: 'post',
    data
  })
}

/*
* 查询下级仓库
* @data{
  page 页面数
  pageNum 页面条数
}
 */
export function getList(data) {
  return request({
    url: '/management/warehouse.warehouse/getList',
    method: 'post',
    data
  })
}

/*
* 添加仓库
* @data{
  wh_name 仓库名称
  province_id 省份ID
  province 省份名称
  city_id 城市ID
  city 城市名称
  area_id 区域ID
  area 区域名称
  address 详细地址
  stock_warning 仓库总库存预警
  status 状态，1：开启，2：禁用
}
 */
export function addwarehouse(data) {
  return request({
    url: '/management/warehouse.warehouse/add',
    method: 'post',
    data
  })
}

/*
* 修改仓库
* @data{
  wh_id 仓库ID
  wh_name 仓库名称
  province_id 省份ID
  province 省份名称
  city_id 城市ID
  city 城市名称
  area_id 区域ID
  area 区域名称
  address 详细地址
  stock_warning 仓库总库存预警
  status 状态，1：开启，2：禁用
}
 */
export function update(data) {
  return request({
    url: '/management/warehouse.warehouse/update',
    method: 'post',
    data
  })
}

/*
* 查询仓库商品
* @data{
  wh_id 仓库ID
  bar_code 条形码
  batch_number 生产批号
  manufacture_time 生产日期
  status 状态，开启：1，禁用：2
  page 页数
  pageNum 页面数据条数
}
 */
export function getgoodsList(data) {
  return request({
    url: '/management/warehouse.warehouse_goods/getList',
    method: 'post',
    data
  })
}

// 入库管理
/*
 *查询入库列表
 @data{
   page
   pageNum
 }
 */
export function getEnList(data) {
  return request({
    url: '/management/warehouse.warehouse_order/getEnList',
    method: 'post',
    data
  })
}

/*
 *查询出/入库详情
 @data{
   wo_id 入库单ID
 }
 */
export function getDetails(data) {
  return request({
    url: '/management/warehouse.warehouse_order/getDetails',
    method: 'post',
    data
  })
}

/*
 *确认收货
 @data{
   wo_id 入库单ID
 }
 */
export function receipt(data) {
  return request({
    url: '/management/warehouse.warehouse_order/receipt',
    method: 'post',
    data
  })
}

/*
 *拒绝收货
 @data{
   wo_id 入库单ID
 }
 */
export function rejection(data) {
  return request({
    url: '/management/warehouse.warehouse_order/rejection',
    method: 'post',
    data
  })
}

/*
 *新增入库单
 @data{
   receiver 接收方账号ID
   total_quantity 总入库数量
   contacts 收货联系人
   mobile 收货手机号码
   province_id 省份ID
   city_id 城市ID
   area_id 区域ID
   address 详细地址
   logistics_no 物流单号
   remark 备注
   wgList [{ 出入库商品数据
     wg_id 仓库商品ID
     goods_id 商品ID
     wg_name 商品名称
     wg_pic 商品图片
     bar_code 条形码
     batch_number 生产批号
     manufacture_time 生产时间
     cost_price 商品进价
     retail_price 商品售价
     sell_by_date 保质期，天数
     before_stock 出库前库存
     quantity 商品数量
   }]
 }
 */
export function addEn(data) {
  return request({
    url: '/management/warehouse.warehouse_order/addEn',
    method: 'post',
    data
  })
}

// 出库管理
/*
 *查询出库单列表
 @data{
   receiver 收货人ID
   contacts 联系人名称
   mobile 手机号码
   page 页数
   pageNum 页面数据条数
 }
 */
export function getOutList(data) {
  return request({
    url: '/management/warehouse.warehouse_order/getOutList',
    method: 'post',
    data
  })
}

/*
 *撤销出库单
 @data{
   wo_id 出库单ID
 }
 */
export function cancel(data) {
  return request({
    url: '/management/warehouse.warehouse_order/cancel',
    method: 'post',
    data
  })
}

/*
 *新增出库单
 @data{
   receiver 接收方账号ID
   total_quantity 总出库数量
   contacts 收货联系人
   mobile 收货手机号码
   province_id 省份ID
   city_id 城市ID
   area_id 区域ID
   address 详细地址
   logistics_no 物流单号
   remark 备注
   wgList [{ 出入库商品数据
     wg_id 仓库商品ID
     goods_id 商品ID
     wg_name 商品名称
     wg_pic 商品图片
     gc_id 分类ID
     gc_name 分类名称
     bar_code 条形码
     batch_number 生产批号
     manufacture_time 生产时间
     cost_price 商品进价
     retail_price 商品售价
     sell_by_date 保质期，天数
     before_stock 出库前库存
     quantity 商品数量
   }]
 }
 */
export function addOut(data) {
  return request({
    url: '/management/warehouse.warehouse_order/addOut',
    method: 'post',
    data
  })
}

// 盘点管理
/*
 *仓库/门店盘点列表
 @data{
   type 盘点类型，1：门店盘点，2：仓库盘点
   status 状态，1：正常，2：缺货，3：多货
   create_time 盘点时间段
   page 当前页数
   pageNum 页面数据条数
 }
 */
export function getwareList(data) {
  return request({
    url: '/management/warehouse.warehouse_check/getList',
    method: 'post',
    data
  })
}

/*
 *仓库/门店盘点详情
 @data{
   wc_id 盘点单ID
   page 当前页数
   pageNum 页面数据条数
 }
 */
export function getdetailsList(data) {
  return request({
    url: '/management/warehouse.warehouse_check_details/getList',
    method: 'post',
    data
  })
}

/*
 *生成仓库/门店盘点单
 @data{
   user_id 盘点人用户表ID
   wh_id 仓库ID，type=2时必传
   wh_name 仓库名称，type=2时必传
   store_id 门店ID，type=1时必传
   store_name 门店名称，type=1时必传
   type 盘点类型，1：门店盘点，2：仓库盘点
   status 状态，1：正常，2：缺货，3：多货
   details[{ 盘点详情
     wg_id 仓库商品ID
     goods_id 商品库ID
     goods_name 商品名称
     pic 商品图片
     gc_id 商品分类ID
     gc_name 商品分类名称
     bar_code 商品条码
     batch_number 生产批号
     manufacture_time 生产日期
     sell_by_date 保质期，天数
     ss_id 货架ID，type=1时必传
     shelves_number 货架编号，type=1时必传
     stock 系统库存
     actual_stock 实际库存
     expire 过期商品，1：是，0：否
     overdue 过期日期
     status 盘点状态，1：正常，2：缺货，3：多货
   }]
   
 }
 */
export function setInventory(data) {
  return request({
    url: '/management/warehouse.warehouse_check/Inventory',
    method: 'post',
    data
  })
}