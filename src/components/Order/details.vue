<template>

  <van-sticky :offset-top="46">
    <div class="infos">订单信息</div>
  </van-sticky>

  <van-cell-group inset >
    <van-cell class="vinput vtext" title="订单ID" value="1" />
    <van-cell class="vinput vtext" title="会员名称" value="猫哥" />
    <van-cell class="vinput vtext" title="会员电话" value="15269874123" />
    <van-cell class="vinput vtext" title="订单编号" value="20230705141742910062235" />
    <van-cell class="vinput vtext" title="订单类型" value="普通订单" />
    <van-cell class="vinput vtext" title="支付类型" value="微信支付" />
    <van-cell class="vinput vtext" title="支付方式" value="小程序支付" />
    <van-cell class="vinput vtext" title="支付金额" value="￥1200.00" />
    <van-cell class="vinput vtext" title="支付状态" value="已支付" />
    <van-cell class="vinput vtext" title="支付时间" value="2023-07-05 15:01:59" />
    <van-cell class="vinput vtext" title="提货时间" value="2023-07-05 15:01:59" />
    <van-cell class="vinput vtext" title="支付编号" value="ERP20230705141742910062235" />
    <van-cell v-if="status" class="vinput vtext" title="查看监控" is-link  @click="notices(info, 1)"/>
    <van-cell v-if="status" class="vinput vtext" title="公众号通知" is-link  @click="notices(info, 2)"/>
    <van-cell v-if="status" class="vinput vtext" title="短信通知" is-link  @click="notices(info, 3)"/>
  </van-cell-group>


  <van-sticky :offset-top="46">
    <div class="infos">商品信息</div>
  </van-sticky>
  
 <div v-for="(item,index) in info.list" class="vgoodsinfo">
    <van-cell-group inset >
      <van-cell class="vinput vtext" title="货架编号" value="1" />
      <van-cell class="vinput vtext" title="商品名称" value="纯牛奶" />
      <van-cell class="vinput vtext imgs" title="商品图片">
        <template #right-icon>
          <van-image width="70" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"/>
        </template>
      </van-cell>
      <van-cell class="vinput vtext" title="商品条形码" value="1234567899655" />
      <van-cell class="vinput vtext" title="生产编号" value="20230705173957" />
      <van-cell class="vinput vtext" title="生产日期" value="20230705173957" />
      <van-cell class="vinput vtext" title="单价" value="15.00" />
      <van-cell class="vinput vtext" title="数量" value="3" />
      <van-cell class="vinput vtext" title="总额" value="45.00" />
    </van-cell-group>
  </div>




</template>

<script>

export default {
  emits: ['notice'], // 提前声明你要使用的自定义事件
  props: {
    info:{
      type:Object,
      default:{}
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {}
  },
  methods: {
    notices(e,k){
      let data = {
        item:e,
        status:k
      }
       this.$emit('notice',data)
    }
  }
}
</script>
<style lang="scss" scoped>
.infos{
  font-size: 14px;
  padding: 10px;
  font-weight: 550;
  position: relative;
  background: #f2f2f2;
}

.vinput{
  background-color: #fafafa;
}

.vtext{
  --van-cell-value-color:#323233;
  white-space: nowrap;
}

.vgoodsinfo{
  margin-bottom: 10px;
}
</style>
