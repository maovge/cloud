<template>
  <Navbar :navShow="true" title="添加出库单" :arrow="true"/>

  <!-- 出库单信息 -->
  <add @godslist="godslist" :goodsarrs="goods" :ordsta="true"/>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import add from '@/components/Inventory/add'

import { getgoodsList, addOut } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, add },
  data () {
    return {
      loading_status: false,
      goods: []
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
  },
  methods: {
    obtain () {
      this.loading_status = true
      const arr = []
      // 获取仓库商品
      getgoodsList().then(res => {
        this.loading_status = false
        if (res.data.length != 0) {
          for (const item of res.data) {
            item.goods_if_type = 'wh_goods'
            item.text = item.batch_number + ' - ' + item.wg_name
            item.value = item.goods_id
            arr.push(item)
          }
        }
      })
      this.goods = arr
    },

    godslist (e) {
      this.loading_status = true
      const data = e.info
      data.receiver = this.collection.userinfo.manager_id // 收货人ID
      data.total_quantity = 0

      for (const item of e.goods) {
        data.total_quantity += (item.goods_num * 1)
        data.wgList.push({
          wg_id: item.wg_id,
          goods_id: item.goods_id,
          wg_name: item.wg_name,
          wg_pic: item.wg_pic,
          gc_id: item.gc_id,
          gc_name: item.gc_name,
          bar_code: item.bar_code,
          batch_number: item.bar_code,
          manufacture_time: item.manufacture_time,
          cost_price: item.cost_price,
          retail_price: item.retail_price,
          sell_by_date: item.sell_by_date,
          before_stock: item.stock || 0,
          quantity: item.goods_num
        })
      }
      addOut(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.$toast('出库成功')
          this.$router.back(0)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
