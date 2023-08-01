<template>
  <div :id="ids"></div>
  <div class="timer" v-if="time_status">
    <div class="time_red"></div>
    <div class="time_num">{{ time_num }}</div>
  </div>
</template>

<script>
/**
 * 离开页面前需要调用 stop() 注销监控画面，否则占用资源导致卡顿
 */
// import EZUIKit from 'ezuikit-js'
import EZUIKit from '@/util/ezuikit.js'

import { formatSeconds } from '@/util'
import { getthemeData } from './themDate.js'

export default {
  props: {
    ids: { // 容器ID
      type: String,
      default: ''
    },
    info: { // 监控信息
      type: Object,
      default: {
        token: '',
        url: ''
      }
    },
    audio: { // 1.开启声音，0.关闭声音，默认开启
      type: Number,
      default: 1
    },
    width: { // 监控宽度
      type: Number,
      default: 100
    },
    height: { // 监控高度
      type: Number,
      default: 200
    },
    templete: { // 播放器模板 simple:极简版、standard:标准版、security:安防版(预览回放)、vioce:语音版
      type: String,
      default: 'simple'
    },
    first: { // 加载完成就停止播放，释放内存 true停止播放，false继续播放
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      time_num: '00:00', // 录像时长
      time_status: false, // true开始录像，false结束录像
      num: 10 // 允许重连次数为10次，防止陷入死循环
    }
  },
  mounted: function () {
    const that = this
    const data = getthemeData(that.templete)

    that.player = new EZUIKit.EZUIKitPlayer({
      id: that.ids, // 视频容器ID
      accessToken: that.info.token,
      url: that.info.url,
      // template: that.templete, // 不采用
      themeData: {
        header: {
          color: '#1890ff',
          activeColor: '#FFFFFF',
          backgroundColor: '#000000',
          btnList: data.header
        },
        footer: {
          color: '#FFFFFF',
          activeColor: '#1890FF',
          backgroundColor: '#00000021',
          btnList: data.footer
        }
      },
      audio: that.audio,
      plugin: ['talk'],
      width: that.width,
      height: that.height,
      handleSuccess: function (res) { // 播放成功回调
        if (that.first) {
          console.log('first', that.first)
          that.player.stop()
        }
        that.num = 10 // 重置允许重连次数
        console.log('播放成功', res)
      },
      handleError: function (res) { // 播放失败回调
        that.$toast('网络连接失败，重新连接中')
        if (!that.first) {
          that.continue()
        }
        console.log('播放失败', res)
      },
      openSoundCallBack: function (res) { // 开启声音回调
        console.log('开启声音成功', res)
      },
      closeSoundCallBack: function (res) { // 关闭声音回调
        console.log('关闭声音成功', res)
      },
      startSaveCallBack: function (res) { // 开始录像
        console.log('开始录像', res)
        that.time_status = true
        that.gettims(0)
      },
      stopSaveCallBack: function (res) { // 结束录像
        console.log('结束录像', res)
        that.time_status = false
      },
      capturePictureCallBack: function (res) { // 截图
        console.log('截图', res)
      },
      fullScreenCallBack: function (res) { // 全屏
        console.log('全屏', res)
      },
      handleTalkError: (err) => { // 讲话
        that.$toast('当前设备不支持语音对讲')
        console.log('talk test ===', err)
      }
    })
    // window.player = that.player
  },
  methods: {

    // 开启关闭讲话
    startTa (e) {
      if (e == 1) {
        this.player.startTalk()
        this.$toast('开启讲话')
      } else {
        this.player.stopTalk()
        this.$toast('关闭讲话')
      }
    },

    // 开启关闭声音
    sound (e) {
      if (e == 1) {
        this.player.openSound()
        this.$toast('开启声音')
      } else {
        this.player.closeSound()
        this.$toast('关闭声音')
      }
    },

    // 开启关闭录像
    startSave (e) {
      if (e == 1) {
        this.player.startSave(`${new Date().getTime()}`)
        this.$toast('开启录像')
      } else {
        this.player.stopSave()
        this.$toast('结束录像')
      }
    },

    // 画面截图
    capture () {
      this.player.capturePicture(`${new Date().getTime()}`)
    },

    // 关闭摄像
    stop () {
      this.player.stop()
      this.player = null
      console.log('关闭监控')
    },

    // 播放失败，重新加载
    continue () {
      if (this.num <= 0) {
        this.$toast('播放失败，请检查网络是否正常')
        return
      }
      this.num--
      this.player.stop() // 中断播放
      this.player.play() // 重新继续播放
    },

    // 录像时长
    gettims (e) {
      const that = this
      let num = e
      that.time_num = formatSeconds(num, false)
      if (!that.time_status) {
        that.time_num = 0
        return
      }
      setTimeout(function () {
        num++
        that.gettims(num)
      }, 1000)
    }

  },
  // 离开页面前注销监控
  beforeUnmount () {
    console.log('关闭监控画面---', true)
    this.stop()
  }
}
</script>

<style lang="scss" scoped>
.timer{
  color: #fafafa;
  position: absolute;
  top: 0;
  z-index: 999;
  margin-top: 170px;
  text-align: center;
  width: 100%;
  .time_red{
    background: red;
    height: 10px;
    width: 10px;
    display: inline-block;
    border-radius: 25px;
    margin-right: 4px;
  }
  .time_num{
    display: inline-block;
  }
}
</style>
