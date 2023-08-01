<template>
  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,index) in list" :key="index" class="vcell">
      <van-swipe-cell>
        <div class="goods-card" @click="store(item)">
          <div class="vstore_top">

            <div class="store_id">{{ item.wh_name }}</div>
            <div class="store_name">归属：<span class="characters">{{ index == 0 ? '我的' : item.creator_name }}</span></div>
          </div>
          <div>
            <div class="store_img">
              <van-image width="100%" height="100%" :src="require('@/assets/images/stock_check.png')"/>
            </div>
            <div class="store_info">
              <div class="library">已入库：<span class="characters">{{ item.enTotal }}</span></div>
              <div class="library gout">已出库：<span class="characters">{{ item.exTotal }}</span></div>
              <div>库&nbsp;&nbsp;&nbsp;&nbsp;存：<span class="characters">{{ item.stock }}</span></div>
            </div>
            <div class="store_time">
              <div class="name">日期：<span class="characters">{{ gettimes(item.create_time) }}</span></div>
              <div class="time">详情 》</div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button square color="#409EFF" size="normal" text="修改" class="delete-button" @click="modify(item)"/>
          <!-- <van-button square color="#D7000F" size="normal" text="删除" class="delete-button" @click="delt(item)"/> -->
        </template>
      </van-swipe-cell>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <div class="goodscls">
    <van-button round icon="plus" color="#D7000F" class="vbtnicon" @click="addstore"/>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import { parseTime } from '@/util'
import { getFind, getList } from '@/api/inventory'
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
      list: [],
      info:[],
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.getfindlist()
    })
    return {}
  },
  methods: {
    // 获取当前账户仓库
    getfindlist () {
      this.loading_status = true
      getFind().then(res => {
        this.info = [res.data]
        this.getinvenlist()
      })
    },

    // 获取下级仓库列表
    getinvenlist () {
      const that = this
      that.loading_status = true
      getList(that.inven).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getinvenlist()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          if (that.inven.page == 1) {
            that.list = [...that.info, ...res.data.data]
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

    // 仓库详情
    store (e) {
      const data = {
        wh_id: e.wh_id
      }
      this.$router.push({ path: '/store_details', query: data })
    },

    // 添加仓库
    addstore () {
      this.$router.push({ path: '/store_add' })
    },

    // 修改仓库
    modify (e) {
      this.$router.push({ path: '/store_add', query: e })
    },

    // 删除仓库
    delt (e) {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除仓库信息，是否继续删除' })
        .then(() => {
          that.$toast('删除成功')
          // on confirm
        })
        .catch(() => {
          console.log('取消删除')
          // on cancel
        })
    },

    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.getinvenlist()
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

  .vstore_top{
    height: 30px;
    border-bottom: 1px solid #ccc;
    width: 90%;
    margin-left: 5%;
    position: relative;
    line-height: 30px;
    .store_name{
      position: absolute;
      right: 0;
      top: 0;
      color: #bbb;
    }
    .store_id{
      display: inline-block;
    }
  }
  .store_img{
    position: relative;
    width: 60px;
    height: 50px;
    display: inline-block;
    margin: 16px 16px 0px 5%;
  }
  .store_info{
    display: inline-block;
    font-size: 12px;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    color: #bbb;
    .library{
      display: inline-block;
    }
    .gout{
      margin-left: 10px;
    }
    .store_details{
      position: absolute;
      line-height: 48px;
      top: 0;
      right: 0;
    }
  }
  .store_time{
    font-size: 12px;
    margin-left: 5%;
    position: relative;
    padding-bottom: 6px;
    width: 90%;
    color: #bbb;
    .name{
      display: inline-block;
    }
    .time{
      position: absolute;
      top: 0;
      right: 0;
      color: #323233;
    }
  }
}

.characters{
  color: #323233;
}

.goodscls{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 20px;
  .vbtnicon{
    width: 48px;
    height: 48px;
    --van-button-icon-size:20px;
  }
}

</style>

<style>
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
