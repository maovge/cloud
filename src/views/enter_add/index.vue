<template>
  <Navbar :navShow="true" title="添加入库单" :arrow="true"/>

  <!-- 入库单信息 -->
  <add @godslist="godslist" :goodsarrs="goods"/>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'
import add from '@/components/Inventory/add'

import { getList } from '@/api/goods'
import { getgoodsList, addEn } from '@/api/inventory'

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
    return {}
  },
  methods: {
    obtain () {
      const arr = []
      // 获取商品库信息
      getList().then(res => {
        if (res.data.length != 0) {
          for (const item of res.data) {
            item.goods_if_type = 'goods'
            item.text = item.goods_name
            item.value = item.goods_id
            arr.push(item)
          }
        }
      })

      // 获取仓库商品
      getgoodsList().then(res => {
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
      data.receiver = this.collection.userinfo.manager_id
      data.total_quantity = 0
      data.wgList = []
      for (const item of e.goods) {
        data.total_quantity += (item.goods_num * 1)
        let wg = '0'
        if (item.goods_if_type == 'wh_goods') {
          wg = item.wg_id
        }
        data.wgList.push({
          wg_id: wg,
          goods_id: item.goods_id,
          wg_name: item.goods_name || item.wg_name,
          wg_pic: item.pic || item.wg_pic,
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
      // const datas = JSON.stringify(data)
      // console.log(datas)

      addEn(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.$toast('添加成功')
          this.$router.back(0)
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped></style>
