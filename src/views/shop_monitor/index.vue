<template>
  <Navbar :navShow="true" title="监控管理" :arrow="true"/>
  <div style="height: 200px;">
    <div v-if="!infovide.url" class="abnormal">{{ msg }}</div>
  </div>

  <div class="mon_video" v-if='!loading_status && infovide.url'>
    <Broadcast ref="videosing" ids="video" :first="false" :info="infovide" :width="width" :template="templete" :height="200"/>
  </div>

  <div class="mon_top">
    <div class="mon_info">
      <div class="mon_name"><span class="mon_text">{{ info.hardware_name }}</span></div>
      <div class="mon_code">摄像头编号：<span class="mon_text">{{ info.hardware_number }}</span></div>
      <div>观看时间：<span class="mon_text">{{ gettimes(new Date()) }}</span></div>
      <div class="mon_record" @click="history(info.hardware_number,info.hardware_name)">更多</div>
    </div>
    <van-row class="mon_operate mon_text">
      <van-col span="6" @click="speech">
        <van-icon size="20" :name="require('@/assets/images/mkf_'+ maikefeng +'.png')" />
        <div class="mon_icon_text">讲话</div>
      </van-col>
      <van-col span="6" @click="sound">
        <van-icon size="20" :name="require('@/assets/images/sy_'+ shengyin +'.png')" />
        <div class="mon_icon_text">声音</div>
      </van-col>
      <van-col span="6" @click="picture">
        <van-icon size="20" :name="require('@/assets/images/li_'+ luxiang +'.png')" />
        <div class="mon_icon_text">录像</div>
      </van-col>
      <van-col span="6" @click="screenshot">
        <van-icon size="20" :name="require('@/assets/images/jt_'+ jietu +'.png')" />
        <div class="mon_icon_text">截图</div>
      </van-col>
    </van-row>
  </div>

  <div class="mon_list">
    <van-list>
      <van-cell v-for="(item,key) in list" :key="key"  class="mon_list_video" @click="convert(item)">
        <div class="mon_img">
          <div class="mon_vide" v-if="item.infos == ''">设备不在线</div>
          <div v-else>
            <!-- 一个页面最多一个主监控画面，四个小监控画面 -->
            <Broadcast :ref="'videosing'+item.sh_id" :ids="'video'+key" :first="key > 4 ? true : false " :info="item.infos" :width="100" :height="70"/>
          </div>
        </div>
        <div class="mon_list_info">
          <div class="mon_list_name mon_text">{{ item.hardware_name }}</div>
          <div class="mon_list_code">摄像头编号:<span class="mon_text">{{ item.hardware_number }}</span></div>
          <div class="mon_list_status">
            设备状态：
            <van-tag v-if="item.status == 1" plain type="success">启用</van-tag>
            <van-tag v-if="item.status == 2" plain type="danger">禁用</van-tag>
          </div>
        </div>
      </van-cell>
    </van-list>
    <van-empty description="查无信息" />
    <div style="height: 20px;"></div>
  </div>

  <Loadin v-if="list.length == 0" :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import Broadcast from '@/components/Broadcast'

import { parseTime } from '@/util'
import { getAddress } from '@/api/live'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Broadcast },
  data () {
    return {
      loading_status: false,
      width: 300,
      info: {},
      infovide: {
        token: '',
        url: ''
      },
      msg: '加载中...',
      maikefeng: 'one',
      shengyin: 'two',
      luxiang: 'one',
      jietu: 'one',
      list: [],
      num: 0,
      num_status: true
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
  },
  methods: {
    // 获取数据
    obtain () {
      const inventory = JSON.parse(localStorage.getItem('store'))
      if (this.$route.query.num != undefined && this.num_status == true) {
        this.num_status = false
        this.num = this.$route.query.num
      }
      let numk = 0
      this.list = []
      this.width = window.innerWidth
      this.loading_status = true
      if (inventory.length != 1) {
        for (let i = 0; i < inventory.length; i++) {
          inventory[i].infos = ''
          if (this.num != i) {
            this.list.push(inventory[i])
            this.getvideos(this.list[numk].hardware_number, false, numk)
            numk++
          }
        }
      }

      this.info = inventory[this.num]
      this.getvideos(inventory[this.num].hardware_number, true, this.num)
    },

    // 获取视频
    getvideos (e, k, l) {
      const that = this
      getAddress({ deviceSerial: e,type:1 }).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getvideos(e, k, l)
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          if (k) {
            that.infovide = res.data
          } else {
            that.list[l].infos = res.data
          }
        } else {
          if (k) {
            that.msg = res.msg
          } else {
            that.list[l].infos = ''
          }
        }
      })
    },

    history (e, k) {
      const data = {
        hardware_number: e,
        hardware_name: k
      }
      this.$router.push({ path: '/monitor_details', query: data })
    },

    // 查看其他监控
    convert (e) {
      if (e.infos == '') {
        this.$toast('设备离线，无法查看')
        return
      }
      const inventory = JSON.parse(localStorage.getItem('store'))
      for (const key in inventory) {
        if (inventory[key].sh_id == e.sh_id) {
          this.num = key
        }
        if (this.$refs['videosing' + inventory[key].sh_id] == undefined) {
          if (this.info.infos != '') {
            this.$refs.videosing.stop()
          }
        } else {
          this.$refs['videosing' + inventory[key].sh_id].stop()
        }
      }
      this.obtain()
    },

    // 讲话开关
    speech () {
      if (this.maikefeng == 'one') {
        this.maikefeng = 'two'
        this.$refs.videosing.startTa(1)
      } else {
        this.maikefeng = 'one'
        this.$refs.videosing.startTa(2)
      }
    },

    // 声音开关
    sound () {
      if (this.shengyin == 'one') {
        this.shengyin = 'two'
        this.$refs.videosing.sound(1)
      } else {
        this.shengyin = 'one'
        this.$refs.videosing.sound(2)
      }
    },

    // 录像开关
    picture () {
      if (this.luxiang == 'one') {
        this.luxiang = 'two'
        this.$refs.videosing.startSave(1)
      } else {
        this.luxiang = 'one'
        this.$refs.videosing.startSave(2)
      }
    },

    // 视频截图
    screenshot () {
      const that = this
      that.jietu = 'two'
      this.$refs.videosing.capture()
      setTimeout(function () {
        that.jietu = 'one'
      }, 100)
      // this.$toast('截图已保存至本地')
    },

    // 当前年月日
    gettimes (e) {
      const time = parseTime(e * 1, '')
      return time
    }

  }
}
</script>

<style lang="scss" scoped>
.mon_video{
  width: 100%;
  height: 200px;
  position: fixed;
  top: 46px;
  z-index: 999;
}

.abnormal{
  width: 100%;
  height: 200px;
  text-align: center;
  background: #000;
  color: #fafafa;
  line-height: 200px;
  font-size: 14px;
}

.mon_top{
  width: 98%;
  margin-left: 1%;
  background: #fafafa;
  color: #bbb;
  margin-top: 10px;
  border-radius: 4px;
  .mon_info{
    padding: 10px;
    position: relative;
    .mon_name{
      font-size: 14px;
      margin-bottom: 6px;
    }
    .mon_code{
      margin-bottom: 6px;
    }
    .mon_record{
      position: absolute;
      top: 10px;
      right: 10px;
      background: #D7000F;
      width: 52px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      color: #fafafa;
      border-radius: 25px;
    }
  }
  .mon_operate{
    text-align: center;
    padding: 10px 0;
    .mon_icon_text{
      padding-top: 6px;
    }
  }
}

.mon_list{
  width: 98%;
  margin-left: 1%;
  margin-top: 10px;
  .mon_list_video{
    margin-bottom: 10px;
    background: #fafafa;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    font-size: 12px;
  }
  .mon_img{
    display: inline-block;
    width: 100px;
    height: 70px;
    .mon_vide{
      width: 100px;
      height: 70px;
      background: #000;
      text-align: center;
      line-height: 70px;
      color: #fafafa;
    }
  }
  .mon_list_info{
    display: inline-block;
    position: absolute;
    margin-left: 10px;
    color: #bbb;
    .mon_list_name{
      margin-top: 2px;
      font-size: 14px;
    }
    // .mon_list_code{
    //   margin-top: 2px;
    // }
    // .mon_list_status{
    //   margin-top: 2px;
    // }
  }

}

.mon_text{
  color: #323233;
}

</style>
