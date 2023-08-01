<template>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,index) in list" :key="index" class="vcell" @click="details(item.si_id)">
      <div class="list_whole">

        <div class="list_top">
          <div class="list_cname ">名称：<span class="list_color">{{ item.income_name }}</span></div>
          <div class="list_code">
            <span class="list_color">
              <van-tag v-if="item.status == 1" plain type="success">启用</van-tag>
              <van-tag v-if="item.status == 2" plain type="danger">禁用</van-tag>
            </span>
          </div>
        </div>

        <div class="list_type">
          <div class="list_info_text">
            <div class="list_info_title">分润比例：</div><span class="list_color">{{ item.income_value }}%</span>
          </div>
          <div class="list_info_text">
            <div class="list_info_title">分润方式：</div>
            <span v-if="item.transfer_method == 1" class="list_color">电子钱包</span>
            <span v-if="item.transfer_method == 3" class="list_color">支付宝转账至零钱</span>
            <span v-if="item.transfer_method == 4" class="list_color">京东收银分账</span>
            <span v-if="item.transfer_method == 21" class="list_color">微信企业转账至零钱</span>
            <span v-if="item.transfer_method == 22" class="list_color">微信商户转账至零钱</span>
          </div>
          <div class="list_info_text">
            <div class="list_info_title">备注信息：</div><span class="list_color">{{ item.desc || '--' }}</span>
          </div>
        </div>

        <div class="list_bottom">
          <div class="list_time">创建日期：<span class="list_color">{{ gettimes(item.create_time) }}</span></div>
          <div class="list_details">详情》</div>
        </div>

      </div>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import { parseTime } from '@/util'
import { getincomeList } from '@/api/strategy'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: false,
      inven: {
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
      getincomeList(that.inven).then(res => {
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

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    details (e) {
      const data = {
        s_id: e,
        s_type: 1,
        type: 3
      }
      this.$router.push({ path: '/strategy_collection', query: data })
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
    .list_type_0{
      text-align: center;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #323233;
    }
    .list_type{
      padding: 10px 0;
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
        color: #323233;
      }
    }
  }
}

.list_color{
  color: #323233;
}

.list_info_text{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 26px;
  line-height: 26px;
  .list_info_title{
    display: inline-block;
    width: 76px;
  }
}

</style>
