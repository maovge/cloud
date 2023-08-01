<template>
  <div>
    <!-- 导航栏 -->
    <Navbar :navShow="true" title="门店管理" :arrow="true"/>

    <div class="vtabs">

      <!-- 搜索栏 -->
      <Lookup placeholder="请输入门店名称" @look="look"/>

      <!-- 筛选 -->
      <Screen :status="false" :scrennlist="scrennlist" @tegtion="tegtion"/>

    </div>

    <div :style="JSON.stringify(scrennlist) == '{}' ? 'height: 60px;' : 'height: 94px;'"></div>

    <!-- 门店信息 -->
    <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
      <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="edit(item.store_id)">
        <Shop :item="item" />
      </van-cell>
    </van-list>

    <van-empty v-if="list.length == 0" description="查无信息" />

    <div style="height: 20px;"></div>

    <Loadin :loading_status="loading_status" />

  </div>

</template>

<script>
import Navbar from '@/components/Navbar'
import Lookup from '@/components/Lookup'
import Screen from '@/components/Screen'
import Shop from '@/components/Shop'

import { getshopList } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Shop, Lookup, Screen },
  data () {
    return {
      loading: false, // 加载
      finished: true, // 加载状态
      loading_status: true,
      scrennlist: {
        // Manager: true,
        region: true,
        shopstatus: true,
        doortype: true
      },
      inven: {
        store_name: '',
        terminal_no: '',
        store_type: '',
        province_id: '',
        city_id: '',
        area_id: '',
        store_manager: '',
        status: '',
        page: 1,
        pageNum: 15
      },
      list: []
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
      that.inven.page = 1
      that.obtain()
    }
  },
  methods: {
    obtain () {
      const that = this
      getshopList(that.inven).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          for (const item of res.data.data) {
            const types = item.store_type.split(',')
            item.typeone = types[0] || '0'
            item.typetwo = types[1] || '0'
          }
          if (that.inven.page == 1) {
            that.list = res.data.data
          } else {
            that.list = [...that.list, ...res.data.data]
          }

          that.finished = false
          that.loading = false
          if (that.inven.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
      })
    },

    // 搜索栏
    look (e) {
      this.inven.store_name = e
      this.inven.page = 1
      this.obtain()
    },

    // 筛选
    tegtion (e) {
      this.inven.store_manager = e.Manager || ''
      this.inven.province_id = e.region == undefined ? '' : e.region[0] || ''
      this.inven.city_id = e.region == undefined ? '' : e.region[1] || ''
      this.inven.area_id = e.region == undefined ? '' : e.region[2] || ''
      this.inven.status = e.status || ''
      this.inven.store_type = e.type || ''
      this.inven.page = 1
      this.obtain()
    },

    // 跳转详情
    edit (e) {
      const data = {
        store_id: e
      }
      this.$router.push({ path: '/shop_details', query: data })
    },

    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.obtain()
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

.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
}
</style>
