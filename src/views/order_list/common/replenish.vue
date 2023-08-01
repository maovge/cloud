<template>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,index) in list" :key="index" class="vcell">
      <div class="list_whole">
        <div class="list_top">
          <div class="list_cname ">名称：<span class="list_color">{{ item.store_name }}</span></div>
          <div class="list_code">ID：<span class="list_color">{{ item.rep_id }}</span></div>
        </div>
        <div class="list_info">
          <div class="list_img">
            <van-image width="80" height="80" :src="item.goods_pic"/>
          </div>
          <div class="list_icon">
            <van-tag v-if="item.rep_type == 1" plain type="success">上机补货</van-tag>
            <van-tag v-if="item.rep_type == 2" plain type="danger">设备退货</van-tag>
          </div>
          <div class="list_data">
            <div class="list_text list_name">{{ item.goods_name }}</div>
            <div class="list_text">货架编号：<span class="list_color">{{ item.shelves_number }} 货架</span></div>
            <div class="list_text">补货前数量：<span class="list_color">{{ item.before_stock }} 件</span></div>
            <div class="list_text">补货数量：<span class="list_color">{{ item.quantity }} 件</span></div>
          </div>
        </div>
        <div>补货日期：<span class="list_color">{{ gettimes(item.create_time) }}</span></div>
      </div>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import { parseTime } from '@/util'
import { getrepList } from '@/api/order'
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
      getrepList(that.inven).then(res => {
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

}

.list_color{
  color: #323233;
}
</style>
