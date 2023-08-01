<template>
  <Navbar :navShow="true" title="仓库详情" :arrow="true"/>

  <div class="vInventory">
    <van-button round type="primary" size="small" color="#D7000F" @click="goucheck">仓库盘点</van-button>
  </div>

  <!-- 商品信息 -->
  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="details(item)">
      <Goodslist :item="item" :useto="false" :tagicon="true"/>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import Goodslist from '@/components/Goodslist'

import { getgoodsList } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Goodslist },
  data () {
    return {
      loading: false, // 加载
      finished: true, // 加载状态
      loading_status: false,
      whdata: {
        wh_id: '',
        bar_code: '',
        batch_number: '',
        manufacture_time: '',
        status: '',
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

      if (that.$route.query.wh_id == undefined) {
        that.$toast('非法请求')
        that.$router.back(0)
        return
      }

      that.whdata.wh_id = that.$route.query.wh_id
      that.loading_status = true
      getgoodsList(that.whdata).then(res => {
        if (res.state == 200) {
          that.loading_status = false
          that.list = [...that.list, ...res.data.data]
          that.finished = false
          that.loading = false
          if (that.whdata.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
        }
      })
    },

    // 仓库商品详情
    details (e) {
      const data = {
        info: this.$qs.stringify(e),
        source: 'store'
      }
      this.$router.push({ path: '/goods_details', query: data })
    },

    // 仓库盘点
    goucheck () {
      const that = this
      const data = {
        wh_id: that.whdata.wh_id,
        wh_name: that.list[0].wh_name
      }
      this.$router.push({ path: '/store_inventory', query: data })
    },

    // 加载更多
    onLoad () {
      this.whdata.page++
      this.loading_status = true
      this.obtain()
    }
  }
}
</script>
<style lang="scss" scoped>
.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
}
.vInventory{
  padding-top: 10px;
  text-align: right;
  margin-right: 20px;
}
</style>
