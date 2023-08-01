<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="策略管理" :arrow="true"/>

  <van-tabs v-model:active="active" @click-tab="tabinfo" class="vtabs" background="#fafafa" color="#D7000F" title-inactive-color="#323232" title-active-color="#D7000F">
    <van-tab title="收款策略" name="collection"><span class="invent">收款策略</span></van-tab>
    <van-tab title="收费策略" name="charge"><span class="invent">收费策略</span></van-tab>
    <van-tab title="分润策略" name="cents"><span class="invent">分润策略</span></van-tab>
  </van-tabs>

  <div style="height: 46px;"></div>

  <collection v-if="active == 'collection'" />

  <charge v-if="active == 'charge'" />

  <cents v-if="active == 'cents'" />

</template>

<script>

import Navbar from '@/components/Navbar'
import collection from './common/collection'
import charge from './common/charge'
import cents from './common/cents'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, collection, charge, cents },
  data () {
    return {
      active: 'collection'
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
      const inventory = localStorage.getItem('strategy_type')
      if (inventory != null) {
        this.active = inventory
      }
    },
    tabinfo (e) {
      localStorage.setItem('strategy_type', e.name)
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
