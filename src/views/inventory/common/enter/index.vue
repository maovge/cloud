<template>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="item in list" :key="item" class="vcell" @click="enter(item)">
      <div class="venter_top">
        <div class="enter_id">物流单号：<span class="enter_name">{{ item.logistics_no }}</span></div>
        <!-- <div class="enter_name">测试仓库</div> -->
      </div>
      <div class="enter_info">
        <div class="enter_img">
          <van-image width="100%" height="100%" :src="require('@/assets/images/stock-in.png')"/>
        </div>
        <div class="enter_user">
          <div class="enter_limitation enter_num_wid">联系人：<span class="enter_name">{{ item.contacts }}</span></div>
          <div class="enter_limitation">联系电话：<span class="enter_name">{{ item.mobile }}</span></div>
          <div class="enter_limitation">发货地址：
            <span class="enter_name">{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address }}</span>
          </div>
        </div>
        <div class="enter_bot">
          <div class="enter_time">发货时间：<span class="enter_name">{{ gettimes(item.send_time) }}</span></div>
          <div class="enter_status">
            <van-tag color="#409EFF" v-if="item.status == 1">已发货</van-tag>
            <van-tag color="#67C23A" v-if="item.status == 2">已收货</van-tag>
            <van-tag color="#F56C6C" v-if="item.status == 3">拒绝收货</van-tag>
            <van-tag color="#909399" v-if="item.status == 4">已撤销</van-tag>
          </div>
        </div>
      </div>

    </van-cell>
  </van-list>

  <div style="height: 20px;"></div>

  <div class="goodscls">
    <van-button round icon="plus" color="#D7000F" class="vbtnicon" @click="addenter"/>
  </div>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <Loadin :loading_status="loading_status" />

</template>

<script>
import { parseTime } from '@/util'
import { getEnList } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'
export default {
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: false,
      list: [],
      inven: {
        page: 1,
        pageNum: 15
      }
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
      getEnList(that.inven).then(res => {
        if (res.state == 200) {
          that.loading_status = false
          that.list = [...that.list, ...res.data.data]
          that.finished = false
          that.loading = false
          if (that.inven.page == res.data.last_page || res.data.last_page == 0) {
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

    // 创建入库单
    addenter () {
      this.$router.push({ path: '/enter_add' })
    },

    // 详情
    enter (e) {
      const data = {
        wo_id: e.wo_id,
        type: true
      }
      this.$router.push({ path: '/enter_details', query: data })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
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
    // .enter_name{
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    // }
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
      height: 60px;
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
      .enter_status{
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
  }
}

.enter_name{
  color: #323233;
}

.goodscls{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 20px;
}

.vbtnicon{
  width: 48px;
  height: 48px;
  --van-button-icon-size:20px;
}

</style>
