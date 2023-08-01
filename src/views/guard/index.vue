<template>
  <!-- 导航栏 -->
  <Navbar :navShow="true" title="值守管理" :arrow="true"/>

  <div v-if="list.length != 0" class="guard" :style="'height:'+height+'px;'">
    <van-row>
      <!-- 左侧 -->
      <van-col class="guard_left" :style="'height:'+height+'px;width:'+width_left+'%;'">
        <van-sidebar v-model="active" @change="onChange">
          <van-sidebar-item v-for="(item,index) in list" :key="index" :title="item.store_name" />
        </van-sidebar>
         <div class="Telescoping" @click="telescop" :style="margleft"><van-icon :name="arrow" /></div>
      </van-col>

      <!-- 右侧 -->
      <van-col class="guard_right" :style="'height:'+height+'px;width:'+width_right+'%;'">

        <van-image radius="4px" width="100%" height="180" :src="info.pic"/>

        <van-collapse v-model="machine" :border="false" class="guard_collapse">

          <van-collapse-item title="门店信息" name="1">
            <van-field autocomplete="off" class="vinput" label="门店名称" readonly v-model="info.store_name"  input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="门店地址" readonly v-model="info.addressing"  input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="店长名称" readonly v-model="info.store_manager_name"  input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="联系电话" readonly v-model="info.mobile"  input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="紧急开锁密码" readonly v-model="info.mobile"  input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="远程上锁" readonly is-link input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="远程开锁" readonly is-link input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="授权开锁" readonly is-link input-align="right"/>
            <van-field autocomplete="off" class="vinput" label="托管" readonly v-model="height"  input-align="right"/>
          </van-collapse-item>

          <van-collapse-item title="监控设备" name="2" >
            <van-row gutter="1" class="guard_row">
              <van-col span="12" class="guard_col" v-for="(item,index) in monitorarr" :key="index" @click="monitor(index)">
                <div class="guard_list_info">
                  <div class="guard_list_video">
                    <div class="mon_vide" v-if="item.infos == ''">设备不在线</div>
                    <div v-else class="mon_videos">
                      <Broadcast :ref="'videosing'+item.sh_id" :ids="'video'+index" :first="index > 4 ? true : false " :info="item.infos" :width="width_video" :height="height_video"/>
                    </div>
                  </div>
                  <!-- <div class="guard_list_name guard_text">{{ item.hardware_name }}</div> -->
                  <!-- <div class="guard_list_time">时间：<span class="guard_text">{{ gettimes(item.create_time) }}</span></div> -->
                </div>
              </van-col>
            </van-row>
            <van-empty v-if="monitorarr.length == 0" description="查无信息" />
          </van-collapse-item>

          <van-collapse-item title="到访记录" name="3">
            <van-empty description="查无信息" />
          </van-collapse-item>

        </van-collapse>

      </van-col>
    </van-row>
  </div>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'
import Broadcast from '@/components/Broadcast'

import { parseTime } from '@/util'
import { getshopList, gethardwareList } from '@/api/shop'
import { getAddress } from '@/api/live'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Broadcast },
  data () {
    return {
      loading_status: true, // 加载
      machine: [], // 折叠默认

      height: '667', // 左侧栏默认高度
      width_left: 0, // 左侧栏宽度
      arrow: 'arrow', // 左侧栏收缩图标
      margleft: 'margin-left:-10px;', // 左侧栏图标间距
      active: 0, // 左侧栏默认选中的值
      list: [], // 左侧栏信息
      monitorarr: [], // 监控摄像头

      width_right: 100, // 右侧栏宽度
      info: {}, // 右侧栏信息
      width_video: 160, // 监控画面默认宽度
      height_video: 130 // 监控画面默认高度
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
      that.obtain()
    }
  },
  methods: {

    obtain () {
      const that = this
      that.active = 0

      // that.width_video = window.innerWidth / 3
      // that.height_video = 100

      getshopList({ pageNum: 9999 }).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.height = window.outerHeight - 40
        that.loading_status = false
        for (const item of res.data.data) {
          item.addressing = item.province + '' + item.city + '' + item.area + '' + item.address
        }
        that.list = res.data.data
        that.onChange(that.active)
      })
    },

    onChange (e) {
      const that = this
      that.info = that.list[e]
      // 获取门店的所有硬件信息
      gethardwareList({ store_id: that.info.store_id, pageNum: 9999 }).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.onChange(that.active)
          }, 1000)
          return
        }
        if (res.state == 200) {
          that.monitorarr = []
          let numk = 0
          for (const item of res.data.data) {
            // 收集所有监控摄像头编号
            if (item.hardware_type == 8) {
              item.infos = ''
              that.monitorarr.push(item)
              that.getvideos(that.monitorarr[numk].hardware_number, numk)
              numk++
            }
          }
        }
      })
    },

    getvideos (e, l) {
      const that = this
      getAddress({ deviceSerial: e }).then(res => {
        if (res.state == 200) {
          that.monitorarr[l].infos = res.data
        }
      })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '').split(' ')
      return time[0]
    },

    telescop () {
      if (this.arrow == 'arrow') {
        this.arrow = 'arrow-left'
        this.width_left = 25
        this.width_right = 75
        this.margleft = ''
      } else {
        this.arrow = 'arrow'
        this.width_left = 0
        this.width_right = 100
        this.margleft = 'margin-left:-10px;'
      }
    },

    monitor (e) {
      const that = this
      localStorage.setItem('store', JSON.stringify(that.monitorarr))
      that.$router.push({ path: '/shop_monitor', query: { num: e } })
    }

  }
}
</script>
<style lang="scss" scoped>
.guard{
  position: fixed;
  width: 100%;
  .guard_left{
    overflow: overlay;
    --van-sidebar-width:94px;
    transition: width 0.5s;
    background: #F7F8FA;
  }
  .guard_right{
    overflow: overlay;
    position: relative;
    transition: width 0.5s;
    margin-top: 10px;
    padding: 0 3%;
  }
}

.Telescoping{
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #323233;
  font-size: 20px;
  border-radius: 25px;
  margin-left: 80px;
  z-index: 1;
  margin-top: 240px;
  transition: margin-left 0.5s;
}

.guard_collapse{
  --van-collapse-item-content-background-color:#fafafa;
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
  padding-bottom: 40px;
  .guard_row{
    // width: 98%;
    // margin-left: 1%;
    padding-bottom: 20px;
    .guard_col{
      margin-bottom: 1px;
      .guard_list_info{
        // border: 1px solid #ccc;
        // border-radius: 4px;
        // padding: 1px;
        font-size: 12px;
        color: #bbb;
        overflow: hidden;
        .guard_list_video{
          background: black;
          height: 130px;
          // border-radius: 4px;
          text-align: center;
          // line-height: 100px;
          overflow: hidden;
          .mon_vide{
            // width: 142px;
            height: 130px;
            background: #000;
            text-align: center;
            line-height: 130px;
            color: #fafafa;
          }
          .mon_videos{
            width: 100%;
            height: 130px;
          }
        }
        .guard_list_name{
          text-align: left;
          padding: 6px 0;
          font-weight: 550;
          font-size: 14px;
        }
        .guard_list_time{
          white-space: nowrap;
        }
      }
    }
  }
}

.vinput{
  padding: 0 6px 6px 6px;
}

.guard_text{
  color: #323233;
}

</style>

<style type="text/css">
.guard_collapse .van-collapse-item .van-cell{
  background: #fafafa;
  font-size: 12px;
}
.van-cell:after{
  border-bottom: 0;
}
</style>
