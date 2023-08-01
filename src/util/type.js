
let datas = {
  // 门店类型 0：未定义，1：云值守，2：云仓
  shop_type: [
    {id:'0', value:'未定义', color:'#' },
    {id:'1', value:'云值守', color:'#E6A23C' },
    {id:'2', value:'云仓', color:'#409EFF' },
  ],
  // 支付类型 0:未定义，1：微信支付，2：支付宝支付，3：通联支付，4：京东收银，5：提货码
  pay_type: [
    {id:'0', value:'未定义', color:'#' },
    {id:'1', value:'微信支付', color:'#67C23A' },
    {id:'2', value:'支付宝支付', color:'#409EFF' },
    {id:'3', value:'通联支付', color:'#F56C6C' },
    {id:'4', value:'京东收银', color:'#909399' },
    {id:'5', value:'提货码', color:'#E6A23C' },
  ],
  // 硬件类型 1：电子锁，2：密码锁，3：UPS，4：拾音器，5：扬声器，6：反扫器，7：小票机，8：摄像头
  hardware_type: [
    {id:'0', value:'未定义', color:'#' },
    {id:'1', value:'电子锁', color:'#409EFF' },
    {id:'2', value:'密码锁', color:'#009577' },
    {id:'3', value:'UPS', color:'#7AADB1' },
    {id:'4', value:'拾音器', color:'#7AA5D8' },
    {id:'5', value:'扬声器', color:'#CCB1D3' },
    {id:'6', value:'反扫器', color:'#B51759' },
    {id:'7', value:'小票机', color:'#EE9F26' },
    {id:'8', value:'摄像头', color:'#909399' },
  ],
  // 订单类型 1：普通订单，2：云值守订单，3：自提订单，4：骑手派送，5：补扣订单
  order_type:[
    {id:'0', value:'未定义', color:'#' },
    {id:'1', value:'普通订单', color:'#' },
    {id:'2', value:'云值守订单', color:'#' },
    {id:'3', value:'自提订单', color:'#' },
    {id:'4', value:'骑手派送', color:'#' },
    {id:'5', value:'补扣订单', color:'#' },
  ],
  // 支付方式 1：免支付，11：付款码支付，12：JSAPI支付，13：小程序支付，14：Native支付，15：刷脸支付，21：手机网站支付，22：当面付（付款码），23：当面付（扫码支付），31：扫码支付，32：反扫支付，41：扫码支付，42：刷卡支付（被扫支付）
  payment_method:[
    {id:'0', value:'未定义', color:'#' },
    {id:'1', value:'免支付', color:'#' },
    {id:'11', value:'付款码支付', color:'#' },
    {id:'12', value:'JSAPI支付', color:'#' },
    {id:'13', value:'小程序支付', color:'#' },
    {id:'14', value:'Native支付', color:'#' },
    {id:'15', value:'刷脸支付', color:'#' },
    {id:'21', value:'手机网站支付', color:'#' },
    {id:'22', value:'当面付(付款码)', color:'#' },
    {id:'23', value:'当面付(扫码支付)', color:'#' },
    {id:'31', value:'扫码支付', color:'#' },
    {id:'32', value:'反扫支付', color:'#' },
    {id:'41', value:'扫码支付', color:'#' },
    {id:'42', value:'刷卡支付(被扫支付)', color:'#' },
  ],
  // 支付状态，1：待支付，2：已支付，3：支付失败
  payment_status:[
    {id:'0', value:'未定义', color:'#909399' },
    {id:'1', value:'待支付', color:'#909399' },
    {id:'2', value:'已支付', color:'#67C23A' },
    {id:'3', value:'支付失败', color:'#F56C6C' },
  ],
  // 退款状态，1：未退款，2：已退款，3：退款失败
  refund_status:[
    {id:'0', value:'未定义', color:'#909399' },
    {id:'1', value:'未退款', color:'#409EFF' },
    {id:'2', value:'已退款', color:'#E6A23C' },
    {id:'3', value:'退款失败', color:'#F56C6C' },
  ]
}

/*
 * @type 类型 shop_type、pay_type、hardware_type、order_type、payment_method
 * @arr 数组 [1,2,3,4]
 * @status true 返回对象 false 返回数组，默认false
 * return 返回数组对象
 */
export function typeoption(type, arr,status) {
  if(arr.length == 0){
    return ''
  }
  let data = []
  for(let item of arr){
    for(let ime of datas[type]){
      if(item == ime.id){
        data.push(ime)
      }
    }
  }
  if(status){
    return data[0]
  }
  return data
}

/*
 * @type 类型 shop_type、pay_type、hardware_type、order_type、payment_method
 * return 返回对象
 */
export function typearr(type) {
  return datas.type
}
