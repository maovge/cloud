<template>
  <!-- 导航栏 -->
  <Navbar :navShow="true" title="到访记录" :arrow="true"/>

  <!-- 商品信息 -->
  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell">
      <div class="access_list_data">
        <div class="access_list_top">
          <div class="access_list_id">编号: <span class="access_text">{{ item.visit_id }}</span></div>
          <div class="access_list_time">到店时间：<span class="access_text">{{ gettimes(item.create_time) }}</span></div>
        </div>
        <div class="access_list_info">
          <div class="access_list_bag">
            <van-image class="access_list_img" :src="item.record_type == 1 ? require('@/assets/images/enter.png') : require('@/assets/images/leave.png')"/>
          </div>
          <div class="access_list_user">
            <div class="access_list_height">终端编号：<span class="access_text">{{ item.terminal_no || '--' }}</span></div>
            <div class="access_list_height">会员昵称：<span class="access_text">{{ item.unlock_id || '--' }}</span></div>
            <div class="access_list_height">开锁方式：<span class="access_text">扫码开门</span></div>
          </div>
          <!-- <div class="access_list_monitor" @click="monitor(item,$event)">查看监控</div> -->
        </div>
        <div class="access_list_bot">
          <div class="access_list_time">离店时间：<span class="access_text">{{ gettimes(item.update_time) }}</span></div>
          <!-- <div class="access_list_details access_text">详情 》</div> -->
        </div>
      </div>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { parseTime } from '@/util'
import { getvisitList } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Screen },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: true,
      inven: {
        terminal_no: '',
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
    return {}
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
      if (that.inven.terminal_no == '') {
        that.inven.terminal_no = that.$route.query.terminal
      }
      getvisitList(that.inven).then(res => {
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

    // 下一页
    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.obtain()
    },

    // 详情
    details (e) {
      const data = {
        info: this.$qs.stringify(e)
      }
      this.$router.push({ path: '/shop_access_details', query: data })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    // 查看监控
    monitor (e, event) {
      console.log('查看监控')
      event.stopPropagation()
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
  .access_list_data{
    padding: 0 10px;
    position: relative;
    font-size: 12px;
    color: #bbb;
    .access_list_top{
      position: relative;
      border-bottom: 1px solid #ccc;
      .access_list_id{
        display: inline-block;
      }
      .access_list_time{
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .access_list_info{
      position: relative;
      .access_list_bag{
        display: inline-block;
        background: #f1f1f1;
        height: 70px;
        width: 70px;
        margin: 10px 10px 0 0;
        .access_list_img{
          width: 60px;
          height: 60px;
          margin: 5px;
        }
      }
      .access_list_user{
        display: inline-block;
        position: absolute;
        margin-top: 10px;
        .access_list_height{
          height: 22px;
          line-height: 22px;
          width: 172px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .access_list_monitor{
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 10px;
        color: #D7000F;
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid #D7000F;
      }
    }
    .access_list_bot{
      position: relative;
      .access_list_time{
        display: inline-block;
      }
      .access_list_details{
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
  }
}

.access_text{
  color: #323233;
}

</style>
