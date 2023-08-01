import request from '@/util/request.js'


/* 获取门店列表
  * @data{
    store_name 门店名称
    terminal_no 终端编号
    store_type 店铺类型，1：云值守，2：云仓，可多选，逗号隔开
    province_id 省份ID
    city_id 城市ID
    area_id 区域ID
    store_manager 店长ID
    status 状态，1：开启，2：禁用
    page 页数
    pageNum 页面数据条数
  }
 */
export function getshopList(data) {
  return request({
    url: '/management/store.store/getList',
    method: 'POST',
    data
  })
}

/* 门店详情
  * @data{
    store_id ID
  }
 */
export function getinfoFind(data) {
  return request({
    url: '/management/store.store/getFind',
    method: 'POST',
    data
  })
}

/* 添加门店
  * @data{
    store_name 门店名称
    pic 门店图片
    store_manager 店长ID
    province_id 省份ID
    city_id 城市ID
    area_id 区域ID
    address 详细地址
    contacts 联系人名称
    mobile 手机号码
    store_type 门店类型，逗号隔开，1：云值守，2：云仓
    terminal_no 终端编号
    status 状态，1：开启，2：禁用
  }
 */
export function addshop(data) {
  return request({
    url: '/management/store.store/add',
    method: 'POST',
    data
  })
}

/* 修改门店
  * @data{
    store_id 门店ID
    store_name 门店名称
    pic 门店图片
    store_manager 店长ID
    province_id 省份ID
    city_id 城市ID
    area_id 区域ID
    address 详细地址
    contacts 联系人名称
    mobile 手机号码
    store_type 门店类型，逗号隔开，1：云值守，2：云仓
    terminal_no 终端编号
    status 状态，1：开启，2：禁用
  }
 */
export function upshopdate(data) {
  return request({
    url: '/management/store.store/update',
    method: 'POST',
    data
  })
}

/* 删除门店
  * @data{
    store_id 门店ID
  }
 */
export function delshop(data) {
  return request({
    url: '/management/store.store/del',
    method: 'POST',
    data
  })
}

/* 店员列表
  * @data{
    store_id 门店ID
    page 页数
    pageNum 页面数据条数
  }
 */
export function getclerkList(data) {
  return request({
    url: '/management/store.store_clerk/getList',
    method: 'POST',
    data
  })
}

/* 添加店员
  * @data{
    store_id 门店ID
    store_name 门店名称
    terminal_no 门店终端编号
    sc[{ 店员列表
      manager_id 账号ID
      nickname 店员名称
      mobile 手机号码
      clerk_type 店员类型，1：普通店员，2：值守人
    }]
  }
 */
export function addclerk(data) {
  return request({
    url: '/management/store.store_clerk/add',
    method: 'POST',
    data
  })
}

/* 删除店员
  * @data{
    sc_id 店员ID
  }
 */
export function delclerk(data) {
  return request({
    url: '/management/store.store_clerk/del',
    method: 'POST',
    data
  })
}

/* 门店硬件列表
  * @data{
    store_id 门店ID
    page 页数
    pageNum 页面数据条数
  }
 */
export function gethardwareList(data) {
  return request({
    url: '/management/store.store_hardware/getList',
    method: 'POST',
    data
  })
}

/* 添加门店硬件
  * @data{
    store_id 门店ID
    store_name 门店名称
    sh[{ 硬件列表
      hardware_name 硬件名称
      hardware_number 硬件编号
      hardware_type 硬件类型，1：电子锁，2：密码锁，3：UPS，4：拾音器，5：扬声器，6：反扫器，7：小票机，8：摄像头
      status 状态，1：启用，2：禁用
    }]
  }
 */
export function addhardware(data) {
  return request({
    url: '/management/store.store_hardware/add',
    method: 'POST',
    data
  })
}

/* 修改门店硬件
  * @data{
    store_id 门店ID
    hardware_name 门店名称
    hardware_number 硬件编号
    hardware_type 硬件类型，1：电子锁，2：密码锁，3：UPS，4：拾音器，5：扬声器，6：反扫器，7：小票机，8：摄像头
    status 状态，1：启用，2：禁用
  }
 */
export function uphardwaredate(data) {
  return request({
    url: '/management/store.store_hardware/update',
    method: 'POST',
    data
  })
}

/* 删除门店硬件
  * @data{
    sh_id 门店硬件信息ID
  }
 */
export function delhardware(data) {
  return request({
    url: '/management/store.store_hardware/del',
    method: 'POST',
    data
  })
}

/* 营业时间列表
  * @data{
    store_id 门店ID
    page 页数
    pageNum 页面数据条数
  }
 */
export function getopentimeList(data) {
  return request({
    url: '/management/store.store_open_time/getList',
    method: 'POST',
    data
  })
}

/* 添加营业时间
  * @data{
    store_id 门店ID
    sot[{ 开店时间
      start_time 开始时间点
      end_time 结束时间点
    }]
  }
 */
export function addopentime(data) {
  return request({
    url: '/management/store.store_open_time/add',
    method: 'POST',
    data
  })
}

/* 修改营业时间
  * @data{
    sot_id 营业时间ID
    store_id 门店ID
    start_time 开始时间点
    end_time 结束时间点
  }
 */
export function upopentimedate(data) {
  return request({
    url: '/management/store.store_open_time/update',
    method: 'POST',
    data
  })
}

/* 删除营业时间
  * @data{
    sot_id 营业时间ID
  }
 */
export function delopentime(data) {
  return request({
    url: '/management/store.store_open_time/del',
    method: 'POST',
    data
  })
}

/* 查询门店货架列表
  * @data{
    store_id 门店ID
  }
 */
export function getshelvesList(data) {
  return request({
    url: '/management/store.store_shelves/getList',
    method: 'POST',
    data
  })
}

/* 添加门店货架数据
  * @data{
    store_id 门店ID
    store_name 门店名称
    ss[{ 门店货架
      shelves_number 货架编号
      goods_id 商品ID
      wg_id 仓库商品ID
      goods_name 商品名称
      goods_c_id 商品分类ID
      goods_c_name 商品分类名称
      goods_pic 商品图片
      cost_price 成本价
      retail_price 零售价
      stock 库存数量
      batch_number 生成批号
      manufacture_time 生产时间
      sell_by_date 保质期，天数
    }]
  }
 */
export function addshelves(data) {
  return request({
    url: '/management/store.store_shelves/add',
    method: 'POST',
    data
  })
}

/* 修改门店货架数据
  * @data{
    ss_id 货架ID
    goods_id 商品ID
    wg_id 仓库商品ID
    goods_name 商品名称
    goods_c_id 商品分类ID
    goods_c_name 商品分类名称
    goods_pic 商品图片
    cost_price 成本价
    retail_price 零售价
    stock 库存数量
    batch_number 生成批号
    manufacture_time 生产时间
    sell_by_date 保质期，天数
  }
 */
export function upshelvesdate(data) {
  return request({
    url: '/management/store.store_shelves/update',
    method: 'POST',
    data
  })
}

/* 删除门店货架数据
  * @data{
    ss_id 货架ID
  }
 */
export function delshelves(data) {
  return request({
    url: '/management/store.store_shelves/del',
    method: 'POST',
    data
  })
}

/* 更换门店货架数据
  * @data{
    ss_id 货架ID
    goods_id 商品ID
    wg_id 仓库商品ID
    goods_name 仓库商品名称
    goods_c_id 商品分类ID
    goods_c_name 商品分类名称
    goods_pic 商品图片
    cost_price 进货价
    retail_price 零售价
    bar_code 商品条形码
    batch_number 生产批号
    manufacture_time 生产日期
    sell_by_date 保质期
  }
 */
export function changeGoods(data) {
  return request({
    url: '/management/store.store_shelves/changeGoods',
    method: 'POST',
    data
  })
}

/* 商品补货
  * @data{
    rep[{
      ss_id 货架ID
      quantity 数量
    }]
  }
 */
export function replenishment(data) {
  return request({
    url: '/management/store.store_shelves_rep/replenishment',
    method: 'POST',
    data
  })
}

/* 门店到访记录
  * @data{
    store_name 门店名称
    terminal_no 设备终端编号
    record_type 记录类型，1：进店，2：离店
    status 操作结果，1：成功，2：失败
    create_time 创建时间段
    page 页数
    pageNum 页面数据条数
  }
 */
export function getvisitList(data) {
  return request({
    url: '/management/store.store_visit/getList',
    method: 'POST',
    data
  })
}
