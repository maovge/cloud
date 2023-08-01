import request from '@/util/request.js'

// 收款方策略
/*
* 查询收款方策略列表
* @data{
    sp_name 策略名称
    app_id 应用ID
    mch_id 商户ID
    status 状态，1：启用，2：禁用
    page 页数
    pageNum 翻页数据
  }
 */
export function getpayeeList(data) {
  return request({
    url: '/management/strategy.strategy_payee/getList',
    method: 'post',
    data
  })
}

/*
* 添加收款方策略
* @data{
    sp_name 策略名称
    payee_type 收款方类型，1：微信支付，2：支付宝支付，3：通联支付，4：京东收银
    app_id 应用ID
    mch_id 商户ID，可能存在收款方平台没有商户号
    content 配置内容
    status 状态，1：启用，2：禁用
  }
 */
export function addpayee(data) {
  return request({
    url: '/management/strategy.strategy_payee/add',
    method: 'post',
    data
  })
}

/*
* 修改收款方策略
* @data{
    sp_id 策略ID
    sp_name 策略名称
    payee_type 收款方类型，1：微信支付，2：支付宝支付，3：通联支付，4：京东收银
    app_id 应用ID
    mch_id 商户ID，可能存在收款方平台没有商户号
    content 配置内容
    status 状态，1：启用，2：禁用
  }
 */
export function uppayeedate(data) {
  return request({
    url: '/management/strategy.strategy_payee/update',
    method: 'post',
    data
  })
}

/*
* 删除收款方策略
* @data{
    sp_id 策略ID
  }
 */
export function delpayee(data) {
  return request({
    url: '/management/strategy.strategy_payee/del',
    method: 'post',
    data
  })
}

/*
* 查询单条收款方策略
* @data{
    sp_id 策略ID
  }
 */
export function getFind(data) {
  return request({
    url: '/management/strategy.strategy_payee/getFind',
    method: 'post',
    data
  })
}

// 收费策略
/*
* 查询收费策略列表
* @data{
    charge_name 策略名称
    charge_type 收费类型，1：固定金额，2：固定比例
    status 状态，1：启用，2：禁用
    page 分页
    pageNum 翻页数据
  }
 */
export function getchargeList(data) {
  return request({
    url: '/management/strategy.strategy_charge/getList',
    method: 'post',
    data
  })
}

/*
* 添加收费策略
* @data{
    charge_name 策略名称
    numerical_value 收费金额/收费比例，金额：小数点两位，比例：1~100整数
    cycle 周期，天数，0：不限制
    charge_type 收费类型，1：固定金额，2：固定比例
    charge_mode 收费模式，1：先用后收，2：先收后用，当收费类型为固定金额时必传
    desc 说明
    status 状态，1：启用，2：禁用
  }
 */
export function addcharge(data) {
  return request({
    url: '/management/strategy.strategy_charge/add',
    method: 'post',
    data
  })
}

/*
* 修改收费策略
* @data{
    sc_id 策略ID
    charge_name 策略名称
    numerical_value 收费金额/收费比例，金额：小数点两位，比例：1~100整数
    cycle 周期，天数，0：不限制
    charge_type 收费类型，1：固定金额，2：固定比例
    charge_mode 收费模式，1：先用后收，2：先收后用，当收费类型为固定金额时必传
    desc 说明
    status 状态，1：启用，2：禁用
  }
 */
export function upchargedate(data) {
  return request({
    url: '/management/strategy.strategy_charge/update',
    method: 'post',
    data
  })
}

/*
* 删除收费策略
* @data{
    sc_id 策略ID
  }
 */
export function delcharge(data) {
  return request({
    url: '/management/strategy.strategy_charge/del',
    method: 'post',
    data
  })
}

// 分润策略
/*
* 查询分润策略列表
* @data{
    income_name 策略名称
    status 状态，1：启用，2：禁用
    page 页数
    pageNum 翻页数据
  }
 */
export function getincomeList(data) {
  return request({
    url: '/management/strategy.strategy_income/getList',
    method: 'post',
    data
  })
}

/*
* 添加分润策略列表
* @data{
    income_name 策略名称
    income_value 收益比例，百分比，1-99
    transfer_method 分润方式，1：电子钱包，21：微信企业转账至零钱，22：微信商户转账至零钱，3：支付宝转账至零钱，4：京东收银分账
    desc 说明
    status 状态，1：启用，2：禁用
  }
 */
export function addincome(data) {
  return request({
    url: '/management/strategy.strategy_income/add',
    method: 'post',
    data
  })
}

/*
* 修改分润策略列表
* @data{
    si_id 策略ID
    income_name 策略名称
    income_value 收益比例，百分比，1-99
    transfer_method 分润方式，1：电子钱包，21：微信企业转账至零钱，22：微信商户转账至零钱，3：支付宝转账至零钱，4：京东收银分账
    desc 说明
    status 状态，1：启用，2：禁用
  }
 */
export function upincomedate(data) {
  return request({
    url: '/management/strategy.strategy_income/update',
    method: 'post',
    data
  })
}

/*
* 删除分润策略列表
* @data{
    si_id 策略ID
  }
 */
export function delincome(data) {
  return request({
    url: '/management/strategy.strategy_income/del',
    method: 'post',
    data
  })
}

// 策略门店
/*
*  查询策略绑定的门店列表
* @data{
    si_id 策略ID
    store_id 门店ID
    s_type 策略类型，1：收款方配置策略，2：收费策略，3：分润策略
    page 分页
    pageNum 页面数据条数
  }
 */
export function getstoreList(data) {
  return request({
    url: '/management/strategy.strategy_store/getList',
    method: 'post',
    data
  })
}

/*
* 绑定门店
* @data{
    si_id 策略ID
    store_id 门店ID，逗号隔开，可批量绑定
    s_type 策略类型，0：未定义策略，1：收款方配置策略，2：收费策略，3：分润策略
  }
 */
export function bindstore(data) {
  return request({
    url: '/management/strategy.strategy_store/bind',
    method: 'post',
    data
  })
}

/*
* 取消绑定
* @data{
    ss_id 绑定ID
  }
 */
export function unbindstore(data) {
  return request({
    url: '/management/strategy.strategy_store/unbind',
    method: 'post',
    data
  })
}

// 绑定账号
/*
* 查询策略绑定的账号列表
* @data{
    s_id 绑定ID
    manager_id 账号ID
    s_type 策略类型，1：分润策略
    page 页数
    pageNum 页面数据条数
  }
 */
export function getmanagerList(data) {
  return request({
    url: '/management/strategy.strategy_manager/getList',
    method: 'post',
    data
  })
}

/*
* 绑定账号
* @data{
    s_id 绑定ID
    manager_id 门店ID
    sort 排序 1 - 999999，以小至大
    s_type 策略类型，1：分润策略
  }
 */
export function bindmanager(data) {
  return request({
    url: '/management/strategy.strategy_manager/bind',
    method: 'post',
    data
  })
}

/*
* 取消绑定
* @data{
    sm_id 绑定ID
  }
 */
export function unbindmanager(data) {
  return request({
    url: '/management/strategy.strategy_manager/unbind',
    method: 'post',
    data
  })
}