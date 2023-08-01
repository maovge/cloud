<template>
  <div class="whole">
    <van-tabs v-model:active="active" class="vtabs" background="#D7000F" color="#fafafa" title-inactive-color="#fafafa" title-active-color="#fafafa">

      <van-tab title="销售信息" name="money">
        <van-row>
          <van-col span="10">
            <div class="title">今天销售额</div>
            <div class="content">￥{{ trade.sale.todaySale || '0.00' }}</div>
          </van-col>
          <van-col span="10" offset="4">
            <div class="title">本年销售额</div>
            <div class="content">￥{{ trade.sale.yearSale || '0.00' }}</div>
          </van-col>
        </van-row>
      </van-tab>

      <van-tab title="货损情况" name="damage">
        <van-row>
          <van-col span="10">
            <div class="title">今日货损</div>
            <div class="content">{{ trade.damage.todayCargoDamageAmount || '0' }} 件</div>
          </van-col>
          <van-col span="10" offset="4">
            <div class="title">本年货损</div>
            <div class="content">{{ trade.damage.yearCargoDamageAmount || '0' }} 件</div>
          </van-col>
        </van-row>
      </van-tab>

      <van-tab title="销量利润" name="profit">
        <van-row>
          <van-col span="10">
            <div class="title">今日利润</div>
            <div class="content">￥{{ trade.profit.todayProfit || '0.00' }}</div>
          </van-col>
          <van-col span="10" offset="4">
            <div class="title">本年利润</div>
            <div class="content">￥{{ trade.profit.yearProfit || '0.00' }}</div>
          </van-col>
        </van-row>
      </van-tab>

      <van-tab title="门店数量" name="total">
        <van-row>
          <van-col span="10">
            <div class="title">云值守数量</div>
            <div class="content">{{ trade.store.storeUn || '0' }} 间</div>
          </van-col>
          <van-col span="10" offset="4">
            <div class="title">云仓门店</div>
            <div class="content">{{ trade.store.storeWh || '0' }} 间</div>
          </van-col>
        </van-row>
      </van-tab>

    </van-tabs>
  </div>

</template>

<script>
export default {
  props: {
    trade: {
      type: Object,
      default: {
        sale: {},
        damage: {},
        profit: {},
        store: {}
      }
    }
  },
  data () {
    return {
      active: 'money'
    }
  },
  methods: { }
}
</script>

<style lang="scss" scoped>
.whole{
  height: 120px;
  background: #D7000F;
}

.vtabs{
  --van-tabs-line-height:30px;
  --van-tabs-bottom-bar-height:2px;
}

.title{
  padding-top:30px;
  text-align:center;
  font-size: 14px;
  color:#fafafa;
}

.content{
  padding-top:10px;
  text-align:center;
  font-size: 16px;
  color:#fafafa;
}

</style>
