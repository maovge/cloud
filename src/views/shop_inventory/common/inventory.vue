<template>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="edit(item.wc_id)">
      <div class="inv_data_list">
        <div class="inv_data_top">编号: <span class="inv_text">{{ item.wc_id }}</span></div>
        <div class="inv_data_info">
          <div class="inv_data_img">
            <van-image width="70" height="70" :src="require('@/assets/images/staff_user.png')"/>
          </div>
          <div class="inv_data_user">
            <div class="inv_data_name inv_text">{{ item.manager_nickname }}</div>
            <div class="inv_data_number">盘点门店：<span class="inv_text">{{ item.store_name }}</span></div>
            <div>
              <van-tag v-if="item.status == 1" plain type="success">正常</van-tag>
              <van-tag v-if="item.status == 2" plain type="danger">缺货</van-tag>
              <van-tag v-if="item.status == 3" plain type="warning">多货</van-tag>
            </div>
          </div>
          <div class="inv_data_btm">
            <div class="inv_data_time">盘点时间：<span class="inv_text">{{ gettimes(item.create_time) }}</span></div>
            <div class="inv_data_del inv_text">详情》</div>
          </div>
        </div>
      </div>
    </van-cell>
  </van-list>

  <!-- 盘点 -->
  <div class="addinvent">
    <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="inventadd"/>
  </div>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import { parseTime } from '@/util'
import { getwareList } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: {},
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: false,
      inven: {
        type: '1',
        status: '',
        create_time: '',
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
      getwareList(that.inven).then(res => {
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

    // 盘点单详情
    edit (e) {
      const data = {
        wc_id: e
      }
      this.$router.push({ path: '/shop_inventory_details', query: data })
    },

    // 新增盘点单
    inventadd () {
      this.$router.push({ path: '/shop_inventory_add' })
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
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
  .inv_data_list{
    font-size: 12px;
    padding: 0 6px;
    color: #bbb;
    .inv_data_top{
      border-bottom: 1px solid #bbb;
    }
    .inv_data_info{
      position: relative;
      .inv_data_img{
        display: inline-block;
        width: 70px;
        height: 70px;
        margin: 6px 10px 6px 0;
      }
      .inv_data_user{
        display: inline-block;
        position: absolute;
        margin-top: 6px;
        .inv_data_name{
          height: 22px;
          line-height: 22px;
          font-size: 14px;
        }
        .inv_data_number{
          height: 20px;
          line-height: 20px;
        }
      }
      .inv_data_btm{
        position: relative;
        .inv_data_time{
          display: inline-block;
        }
        .inv_data_del{
          display: inline-block;
          position: absolute;
          right: 0;
        }
      }
    }
  }
}

.inv_text{
  color: #323233;
}

.addinvent{
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
