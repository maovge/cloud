<template>
  <div>
    <!-- 导航栏 -->
    <Navbar :navShow="true" title="库存管理" :arrow="true"/>

    <van-tabs v-model:active="active" @click-tab="tabinfo" class="vtabs" background="#fafafa" color="#D7000F" title-inactive-color="#323232" title-active-color="#D7000F">
      <van-tab title="仓库管理" name="store"><span class="invent">仓库管理</span></van-tab>
      <van-tab title="入库管理" name="enter"><span class="invent">入库管理</span></van-tab>
      <van-tab title="出库管理" name="gout"><span class="invent">出库管理</span></van-tab>
      <van-tab title="盘点单" name="drop"><span class="invent">盘点单</span></van-tab>
    </van-tabs>

    <div style="height: 46px;"></div>

    <!-- 仓库管理 -->
    <store v-if="active == 'store'" />
    <enter v-if="active == 'enter'" />
    <gout v-if="active == 'gout'" />
    <drop v-if="active == 'drop'" />

  </div>

</template>

<script>
import Navbar from '@/components/Navbar'
import store from './common/store/index'
import enter from './common/enter/index'
import gout from './common/gout/index'
import drop from './common/drop/index'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, store, enter, gout, drop },
  data () {
    return {
      active: 'store'
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  methods: {
    obtain(){
      let inventory = localStorage.getItem('inventory');
      if(inventory != null){
        this.active = inventory
      }
    },
    // 切换标签
    tabinfo(e){
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
