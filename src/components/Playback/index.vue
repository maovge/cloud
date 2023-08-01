<template>
  <div id="playback"></div>
  123
</template>

<script>
/**
 * 离开页面前需要调用 stop() 注销监控画面，否则占用资源导致卡顿
 */

import EZUIKit from '@/util/ezuikit.js'

export default {
  props: {
    info: {
      type: Object,
      default: {
        token: '',
        url: ''
      }
    }
  },
  data () {
    return { }
  },
  mounted: function () {
    const that = this
    const data = {
      header: [],
      footer: []
    }
    that.player = new EZUIKit.EZUIKitPlayer({
      id: 'playback', // 视频容器ID
      accessToken: that.info.token,
      url: that.info.url,
      // template: 'security',
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
      audio: 1,
      width: window.innerWidth,
      height: 200
    })
  },
  methods: {}

}
</script>

<style lang="scss" scoped></style>
