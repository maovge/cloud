<template>
  <Navbar :navShow="true" title="历史记录" :arrow="true"/>

  <div id="video"></div>

  <Loadin :loading_status="loading_status" />
</template>

<script>

import Navbar from '@/components/Navbar'
import EZUIKit from '@/util/ezuikit.js'

import { getAddress } from '@/api/live'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      loading_status:false,
      infovide: {
        deviceSerial: '',
        type: 2,

        startTime: '',
        stopTime: '',
      },
      player:''
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
      let that = this
      if(that.infovide.deviceSerial == ''){
        that.infovide.deviceSerial = that.$route.query.hardware_number
        let time = new Date()
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        m = m <= 9 ? '0' + m : m
        d = d <= 9 ? '0' + d : d
        let ymd = y + '-' + m + '-' + d
        that.infovide.startTime = ymd + ' 00:00:00'
        that.infovide.stopTime = ymd + ' 23:59:59'
      }
      that.loading_status = true
      getAddress(that.infovide).then(res=>{
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.loading_status = false
        if(res.state == 200){
          that.getvideos(res.data.token,res.data.url)
        }
      })

    },
    // 播放视频
    getvideos(e,k){
      let that = this
      that.player = new EZUIKit.EZUIKitPlayer({
        id: 'video', // 视频容器ID
        accessToken: e,
        url: 'ezopen://open.ys7.com/BA1434612/1.hd.local.rec?begin=20230730000000&end=20230730235959',
        height: 200,
      })
    }

  }
}
</script>

<style lang="scss" scoped></style>
