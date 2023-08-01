<template>
  <div>
    <!-- 导航栏 -->
    <Navbar :navShow="true" title="订单管理" :arrow="true"/>

    <van-tabs v-model:active="active" @click-tab="tabinfo" class="vtabs" background="#fafafa" color="#D7000F" title-inactive-color="#323232" title-active-color="#D7000F">
      <van-tab title="销售订单" name="order"><span class="invent">销售订单</span></van-tab>
      <van-tab title="补货订单" name="replenish"><span class="invent">补货订单</span></van-tab>
    </van-tabs>

    <div style="height: 46px;"></div>

    <order v-if="active == 'order'" />

    <replenish v-if="active == 'replenish'" />

  </div>

</template>

<script>
import Navbar from '@/components/Navbar'
import order from './common/order'
import replenish from './common/replenish'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, order, replenish },
  data () {
    return {
      active: 'replenish'
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
      const inventory = localStorage.getItem('order_type')
      if (inventory != null) {
        this.active = inventory
      }
    },
    tabinfo (e) {
      localStorage.setItem('order_type', e.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.vtabs{
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 46px;
}
.invent{
  display: none;
}
</style>
