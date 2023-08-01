<template>
  <div class="home">
    <!-- 导航栏 -->
    <Navbar :navShow="true" title="首页"/>

    <!-- 数据信息 -->
    <top :trade="trade"/>

    <!-- 代办事项 -->
    <handle />

    <!-- 菜单栏 -->
    <menubar />

    <!-- 排行榜 -->
    <profit :info="info" />

    <Loadin :loading_status="loading_status" />

  </div>

</template>

<script>
import Navbar from '@/components/Navbar'
import top from '@/components/Home/top'
import handle from '@/components/Home/handle'
import menubar from '@/components/Home/menubar'
import profit from '@/components/Home/profit'

import { salesSummary, storeSummary, profitSummary, cargoDamageSummary, storeSaleList, goodsSaleList } from '@/api/common'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, top, handle, menubar, profit },
  data () {
    return {
      trade: {
        sale: {},
        damage: {},
        profit: {},
        store: {}
      },
      info:{
        store:[],
        goods:[]
      },
      loading_status: true
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.loading_status = true
      getCurrentInstance().ctx.obtain()
    })
  },
  activated () {
    const that = this
    if (!that.loading_status) {
      that.obtain()
    }
  },
  methods: {
    obtain () {
      // 清除库存管理记录
      localStorage.setItem('inventory', null)
      localStorage.setItem('order_type', null)
      localStorage.setItem('strategy_type', null)

      this.getsales()
      this.getstore()
      this.getprofit()
      this.getcargo()
      this.getstores()
      this.getgoods()
    },

    // 获取销售汇总数据
    getsales () {
      const that = this
      salesSummary().then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getsales()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.trade.sale = {
            todaySale: res.data.todaySale,
            yearSale: res.data.yearSale
          }
        }
      })
    },

    // 获取门店汇总数据
    getstore () {
      const that = this
      storeSummary().then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getstore()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.trade.store = {
            storeUn: res.data.storeUn,
            storeWh: res.data.storeWh
          }
        }
      })
    },

    // 获取利润汇总数据
    getprofit () {
      const that = this
      profitSummary().then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getprofit()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.trade.profit = {
            todayProfit: res.data.todayProfit,
            yearProfit: res.data.yearProfit
          }
        }
      })
    },

    // 获取货损汇总数据
    getcargo () {
      const that = this
      cargoDamageSummary().then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getcargo()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.trade.damage = {
            todayCargoDamageAmount: res.data.todayCargoDamageAmount,
            yearCargoDamageAmount: res.data.yearCargoDamageAmount
          }
        }
      })
    },

    // 门店排行榜
    getstores () {
      const that = this
      storeSaleList().then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getstores()
          }, 1000)
          return
        }
        that.loading_status = false
        if(res.state == 200){
          that.info.store = res.data.data
        }
      })
    },

    // 商品排行榜
    getgoods () {
      let that = this
      goodsSaleList().then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getstores()
          }, 1000)
          return
        }
        that.loading_status = false
        if(res.state == 200){
          that.info.goods = res.data.data
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped></style>
