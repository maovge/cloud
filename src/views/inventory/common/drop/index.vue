<template>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="item in list" :key="item" class="vcell" @click="enter(item.wc_id)">
      <div class="venter_top">
        <div class="enter_id">ID: <span class="enter_names">{{ item.wc_id }}</span></div>
        <div class="enter_name">
          <van-tag v-if="item.status == 1" color="#67C23A">正常</van-tag>
          <van-tag v-if="item.status == 2" color="#F56C6C">缺货</van-tag>
          <van-tag v-if="item.status == 3" color="#E6A23C">多货</van-tag>
        </div>
      </div>
      <div class="enter_info">
        <div class="enter_img">
          <van-image width="100%" height="100%" :src="require('@/assets/images/stock_check.png')"/>
        </div>
        <div class="enter_user">
          <div class="enter_limitation enter_num_wid">盘点人：<span class="enter_names">{{ item.manager_nickname }}</span></div>
          <div class="enter_limitation">盘点类型：<span class="enter_names">{{ item.type == 1 ? '门店' : '仓库' }}盘点</span></div>
          <div class="enter_limitation">
            {{ item.type == '1' ? '门店名称' : '仓库名称' }}：<span class="enter_names">{{ item.store_name || item.wh_name }}</span>
          </div>
        </div>
        <div class="enter_bot">
          <div class="enter_time">盘点时间：<span class="enter_names">{{ gettimes(item.create_time) }}</span></div>
          <div class="time">详情 》</div>
        </div>
      </div>

    </van-cell>
  </van-list>

  <div style="height: 20px;"></div>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <Loadin :loading_status="loading_status" />

</template>

<script>
import { parseTime } from '@/util'
import { getwareList } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: false,
      inven: {
        type: 2,
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
  },
  methods: {
    // 获取信息
    obtain () {
      const that = this
      that.loading_status = true
      getwareList(that.inven).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getinvenlist()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.list = [...that.list, ...res.data.data]
          that.finished = false
          that.loading = false
          if (that.inven.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
      })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    // 详情
    enter (e) {
      const data = {
        wc_id: e
      }
      this.$router.push({ path: '/drop_details', query: data })
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
  .venter_top{
    height: 30px;
    border-bottom: 1px solid #ccc;
    width: 90%;
    margin-left: 5%;
    position: relative;
    line-height: 30px;
    .enter_name{
      position: absolute;
      right: 0;
      top: 0;
    }
    .enter_id{
      display: inline-block;
      color: #bbb;
    }
  }
  .enter_info{
    position: relative;
    .enter_img{
      position: relative;
      width: 60px;
      display: inline-block;
      margin: 16px 16px 6px 5%;
    }
    .enter_user{
      display: inline-block;
      position: absolute;
      top: 16px;
      height: 20px;
      line-height: 20px;
      color: #bbb;
      .enter_num{
        color: #323233;
        position: absolute;
        right: 0;
        max-width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .enter_limitation{
        max-width: 228px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .enter_num_wid{
        max-width: 164px;
      }
    }
    .enter_bot{
      position: relative;
      padding-bottom: 10px;
      margin: 0 15px;
      .enter_time{
        display: inline-block;
        color: #bbb;
      }
      .time{
        position: absolute;
        top: 0;
        right: 0;
        color: #323233;
      }
    }
  }
}

.enter_names{
  color: #323233;
}

</style>
