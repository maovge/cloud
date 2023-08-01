<template>

  <!-- 搜索栏 -->
  <Lookup placeholder="请输入订单编号" :looktype="true" @look="look"/>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,index) in list" :key="index" class="vcell" @click="details(item.order_id)">
      <div class="list_whole">
        <div class="list_top">
          <div class="list_cname ">订单编号：<span class="list_color">{{ item.trade_no }}</span></div>
          <div class="list_code">
            <van-tag v-if="item.payment_status == 1">未支付</van-tag>
            <div v-if="item.payment_status == 2">
              <van-tag type="success" v-if="item.refund_status == 1">已支付</van-tag>
              <van-tag type="warning" v-if="item.refund_status == 2">已退款</van-tag>
              <van-tag type="danger" v-if="item.refund_status == 3">退款失败</van-tag>
            </div>
            <van-tag type="danger" v-if="item.payment_status == 3">支付失败</van-tag>
          </div>
        </div>
        <div class="list_info">
          <div class="list_img">
            <van-image width="80" height="80" :src="require('@/assets/images/product.png')"/>
          </div>
          <div class="list_icon">
            <van-tag v-if="item.order_type == 1" plain color="#67C23A">普通订单</van-tag>
            <van-tag v-if="item.order_type == 2" plain color="#409EFF">云值守订单</van-tag>
            <van-tag v-if="item.order_type == 3" plain color="#F56C6C">自提订单</van-tag>
            <van-tag v-if="item.order_type == 4" plain color="#E6A23C">骑手派送</van-tag>
            <van-tag v-if="item.order_type == 5" plain color="#909399">补扣订单</van-tag>
          </div>
          <div class="list_data">
            <div class="list_text list_name">{{ item.store_name }}</div>
            <div class="list_text">消费者：<span class="list_color">{{ item.user_name || '--' }}</span></div>
            <div class="list_text">付款金额：<span class="list_color">￥{{ item.total_price }}</span></div>
            <div class="list_text">付款方式：
              <span class="list_color" style="color:#67C23A;" v-if="item.payment_type == 1">微信支付</span>
              <span class="list_color" style="color:#409EFF;" v-if="item.payment_type == 2">支付宝支付</span>
              <span class="list_color" style="color:#F56C6C;" v-if="item.payment_type == 3">通联支付</span>
              <span class="list_color" style="color:#E6A23C;" v-if="item.payment_type == 4">京东收银</span>
              <span class="list_color" style="color:#909399;" v-if="item.payment_type == 5">提货码</span>
            </div>
          </div>
        </div>
        <div class="list_bottom">
          <div class="list_time">日期：<span class="list_color">{{ gettimes(item.create_time) }}</span></div>
          <div class="list_details list_color">详情》</div>
        </div>
      </div>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Lookup from '@/components/Lookup'

import { parseTime } from '@/util'
import { getordersList } from '@/api/order'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Lookup },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: false,
      scrennlist: {
        paytype: true,
        paystatus: true
      },
      inven: {
        trade_no: '',
        mch_no: '',
        store_name: '',
        terminal_no: '',
        payment_type: '',
        payment_time: '',
        refund_status: '',
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

    obtain () {
      const that = this
      that.loading_status = true
      getordersList(that.inven).then(res => {
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

    look (e) {
      this.inven.trade_no = e
      this.inven.page = 1
      this.obtain()
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    // 详情
    details (e) {
      const data = {
        order_id: e
      }
      this.$router.push({ path: '/order_details', query: data })
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
  .list_whole{
    padding: 8px 10px;
    color: #bbb;
    .list_top{
      position: relative;
      border-bottom: 1px solid #bbb;
      height: 20px;
      line-height: 20px;
      padding-bottom: 2px;
      .list_cname{
        display: inline-block;
        width: 230px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .list_code{
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
    .list_info{
      margin-top: 10px;
      position: relative;
      .list_img{
        height: 80px;
        width: 80px;
        display: inline-block;
        margin-right: 10px;
      }
      .list_icon{
        display: inline-block;
        position: absolute;
        right: 0;
        top: -4px;
      }
      .list_data{
        display: inline-block;
        position: absolute;
        .list_name{
          font-size: 14px;
          width: 166px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #323233;
        }
        .list_text{
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .list_bottom{
      position: relative;
      .list_time{
        display: inline-block;
      }
      .list_details{
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }

  }
}

.list_color{
  color: #323233;
}
</style>
