<template>
  <!-- 导航栏 -->
  <Navbar :navShow="true" title="门店盘点" :arrow="true"/>

  <van-tabs v-model:active="active" @click-tab="tabinfo" class="vtabs" background="#fafafa" color="#D7000F" title-inactive-color="#323232" title-active-color="#D7000F">
    <van-tab title="盘点记录" name="inventory"><span class="invent">盘点记录</span></van-tab>
    <van-tab title="补扣记录" name="order"><span class="invent">补扣记录</span></van-tab>
  </van-tabs>

  <div style="height: 46px;"></div>

  <!-- 仓库管理 -->
  <inventory v-if="active == 'inventory'" />

  <order v-if="active == 'order'" />

</template>

<script>

import Navbar from '@/components/Navbar'
import inventory from './common/inventory'
import order from './common/order'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, inventory, order },
  data () {
    return {
      active: 'inventory'
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
      const inventory = localStorage.getItem('inventory')
      if (inventory != null) {
        this.active = inventory
      }
    },

    // 切换
    tabinfo (e) {
      localStorage.setItem('inventory', e.name)
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
