<template>
  <Navbar :navShow="true" title="盘点记录" :arrow="true"/>

  <!-- 盘点信息 -->
  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,index) in list" :key="index" class="vcell">
      <Inventory :library="true" :info="item" />
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div class="limit"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import Inventory from '@/components/Inventory'

import { getdetailsList } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Inventory },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: false,
      inven: {
        wc_id: '',
        page: 1,
        pageNum: 15
      },
      list: []
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
      const that = this
      that.loading_status = true
      that.inven.wc_id = that.$route.query.wc_id
      getdetailsList(that.inven).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
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

    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.obtain()
    }
  }
}
</script>
<style lang="scss" scoped>
.vcell{
  background: #fafafa;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 0;
  font-size: 12px;
}
.limit{
  height: 20px;
}
</style>
