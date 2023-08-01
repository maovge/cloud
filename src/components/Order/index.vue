<template>
  <div class="order_list">
    <van-swipe-cell>
      <div class="order_list_top">
        <div class="order_list_id">ID：<span class="order_text">1</span></div>
        <div class="order_list_order">订单编号：<span class="order_text">20230705141742910062235</span></div>
      </div>
      <div class="order_list_goods">
        <div class="order_list_img">
          <van-image width="70" height="70" :src="require('@/assets/images/product.png')"/>
          <div class="order_list_type">普通订单</div>
        </div>
        <div class="order_list_info">
          <div class="order_list_data">会员名称：<span class="order_text">猫哥</span></div>
          <div class="order_list_data">会员电话：<span class="order_text">15269874123</span></div>
          <div class="order_list_data">支付类型：<span class="order_success">微信 <span class="order_text">(小程序支付)</span></span></div>
          <div class="order_list_data">支付金额：
            <span class="order_red">
              <span style="font-size: 10px;">￥</span>
              1200.00
              <span class="order_success">(已支付)</span>
            </span>
          </div>
        </div>
        <div class="order_list_bottom">
          <div class="order_list_time">支付时间：<span class="order_text">2023-07-05 15:01:59</span></div>
          <div class="order_list_details order_text">详情 》</div>
        </div>
      </div>

      <template #right v-if="status">
        <van-button  class="delete-button" square color="#424242" text="查看监控" @click="notices(item,1)" />
        <van-button  class="delete-button" square color="#07C160" text="公众号通知" @click="notices(item,2)" />
        <van-button  class="delete-button" square color="#0E6DF5" text="短信通知" @click="notices(item,3)" />
      </template>

    </van-swipe-cell>
  </div>
</template>

<script>

export default {
  emits: ['notice'], // 提前声明你要使用的自定义事件
  props: {
    item:{
      type:Object,
      default:{}
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  data() {
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
.order_list{
  font-size: 12px;
  color: #bbb;
  padding: 0 10px;
 .order_list_top{
    position: relative;
    border-bottom: 1px solid #bbb;
   .order_list_id{
      display: inline-block;
   }
   .order_list_order{
      display: inline-block;
      position: absolute;
      right: 0;
   }
 }
 .order_list_goods{

    position: relative;
   .order_list_img{
      display: inline-block;
      height: 70px;
      width: 70px;
      position: relative;
      margin: 6px 10px 6px 0;
     .order_list_type{
      position: absolute;
      bottom: 0;
      background: #D7000F;
      width: 100%;
      text-align: center;
      height: 16px;
      line-height: 16px;
      color: #fafafa;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      letter-spacing: 1px;
     }
   }
   .order_list_info{
     width: 222px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: absolute;
      padding-top: 5px;
     .order_list_data{
      height: 19px;
      line-height: 19px;
     }
   }
   .order_list_bottom{
     position: relative;
     .order_list_time{
       display: inline-block;
     }
     .order_list_details{
       display: inline-block;
       position: absolute;
       right: 0;
     }
   }
 }
}

.order_text{
  color: #323233;
}

.order_success{
  color: #67C23A;
}

.order_red{
  color: #D7000F;
}
</style>
<style>
.order_list{
  margin: 0;
  background-color: @white;
}

.delete-button{
  height: 100%;
  width: 40px;
}
</style>
