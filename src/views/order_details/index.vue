<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="订单详情" :arrow="true"/>

  <van-sticky :offset-top="46">
    <div class="infos">订单信息</div>
  </van-sticky>

  <van-cell-group class="info_back">
    <van-cell title="订单编号:" :border="false" :value="info.mch_no" />
    <van-cell title="用户名称:" :border="false" :value="info.user_name || '--'" />
    <van-cell title="门店名称:" :border="false" :value="info.store_name" />
    <van-cell title="终端编号:" :border="false" :value="info.terminal_no" />
    <van-cell title="订单类型:" :border="false" :value="gettypes('order_type',[info.order_type])" />
    <van-cell title="支付状态:" :border="false" :value="gettypes('payment_status',[info.payment_status])">
      <template #value>
        <van-tag plain :color="info.paystatus.color">{{ info.paystatus.value }}</van-tag>
      </template>
    </van-cell>
    <van-cell v-if="info.refund_status >= 2" title="退款状态:" :border="false">
      <template #value>
        <van-tag plain :color="info.statusinfo.color">{{ info.statusinfo.value }}</van-tag>
      </template>
    </van-cell>
    <van-cell title="支付类型:" :border="false">
      <template #value>
        {{ gettypes('pay_type',[info.payment_type]) + '-' + gettypes('payment_method',[info.payment_method]) }}
      </template>
    </van-cell>
    <van-cell title="支付时间:" :border="false" :value="gettimes(info.payment_time)" />
    <van-cell title="支付金额:" :border="false">
      <template #value>
        ￥{{ info.total_price }}
      </template>
    </van-cell>
    <van-cell title="商品数量:" :border="false">
      <template #value>
        {{ info.total_quantity || 0 }} 件
      </template>
    </van-cell>
  </van-cell-group>

  <van-sticky :offset-top="46">
    <div class="infos">商品信息</div>
  </van-sticky>

  <van-cell-group v-for="(item,index) in info.details" class="info_back_goods">
    <van-cell title="货架号" :border="false">
      <template #value>
        {{ item.shelves_number }} 货架
      </template>
    </van-cell>
    <van-cell title="商品图片" :border="false">
      <template #value>
        <van-image width="60" height="60" :src="item.goods_pic"/>
      </template>
    </van-cell>
    <van-cell title="商品名称" :border="false" :value="item.goods_name" />
    <van-cell title="商品售价" :border="false">
      <template #value>￥ {{ item.retail_price }}</template>
    </van-cell>
    <van-cell title="商品数量" :border="false">
      <template #value>{{ item.quantity }} 件</template>
    </van-cell>
    <van-cell v-if="item.refund_quantity != 0" title="退款数量" :border="false">
      <template #value>{{ item.refund_quantity }} 件</template>
    </van-cell>
  </van-cell-group>


  <!-- <div style="height: 20px;"></div> -->

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { parseTime } from '@/util'
import { typeoption, typearr } from '@/util/type'
import { getDetails } from '@/api/order'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      loading_status:false,
      info: {
        statusinfo:{
          color:'',
        },
        paystatus:{
          color:'',
        }
      }
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
  },
  methods: {
    obtain () {
      const data = {
        order_id: this.$route.query.order_id
      }
      this.loading_status = true
      getDetails(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          res.data.statusinfo = this.gettypes('refund_status',[res.data.refund_status],true)
          res.data.paystatus = this.gettypes('payment_status',[res.data.payment_status],true)
          this.info = res.data
          console.log(this.info)
        }
      })
    },

    // 订单类型
    gettypes (e, k,l) {
      if (k[0] == undefined) {
        return
      }
      const data = typeoption(e, k)
      if (data.length == 0) {
        return '--'
      }
      if(l){
        return data[0]
      }
      return data[0].value
    },

    // 日期
    gettimes (e) {
      const time = parseTime(e)
      return time
    }

  }
}
</script>
<style lang="scss" scoped>
.info_back{
  --van-cell-background-color:#fafafa;
  --van-cell-text-color:#323233;
  --van-cell-value-color:#323233;
  white-space: nowrap;
  width: 96%;
  margin-left: 2%;
  border-radius: 4px;
  overflow: hidden;
}
.info_back_goods{
  --van-cell-background-color:#fafafa;
  --van-cell-text-color:#323233;
  --van-cell-value-color:#323233;
  white-space: nowrap;
  width: 96%;
  margin-left: 2%;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 10px;
  margin-bottom: 10px;
}
.infos{
  font-size: 14px;
  padding: 10px;
  font-weight: 550;
  position: relative;
  background: #f2f2f2;
}
</style>
