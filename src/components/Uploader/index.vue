<template>
  <van-uploader
    :upload-icon="icons"
    v-model="url"
    :max-count="num"
    :upload-text="text"
    :max-size="size * 1024"
    :disabled="upstatus"
    :preview-full-image="fullimg"
    result-type="file"
    @oversize="onOversize"
    :after-read="afterRead"
    :before-read="beforeRead"
    :deletable="deletable"
    :preview-size="shopimg ? '' : '80px'"
  >
    <div v-if="shopimg" style="width: 100%;height: auto">
      <van-image :width=" inerwidth.width" :height="inerwidth.height" :src="imgurl"/>
    </div>
    <div v-else>
      <van-image width="80" height="80" :src="imgurl"/>
    </div>
  </van-uploader>
</template>

<script>
import { uploadFile } from '@/api/common'
/*
 * files 图片
 * text 提示文字
 * num 上传数量
 * icons 图标
 * size 上传限制大小 限制500KB 例：500
 * types 上传类型 1：图片， 2：视频
 * upstatus 是否禁止上传
 * fullimg 是否预览图片
 * deletable 是否显示删除按钮
 * folder 文件夹名称 商品文件名称：goods_img
 * shopimg 开启大图模式
 * inerwidth 大图宽高
 * imgurl 大图地址
 *
 */
export default {
  emits: ['uploading', 'upurl'], // 提前声明你要使用的自定义事件
  props: {
    files: {
      type: Array,
      default: []
    },
    text: {
      type: String,
      default: '文件上传'
    },
    num: {
      type: Number,
      default: 1
    },
    icons: {
      type: String,
      default: 'plus'
    },
    size: {
      type: Number,
      default: 50000
    },
    types: {
      type: Number,
      default: 1
    },
    upstatus: {
      type: Boolean,
      default: false
    },
    fullimg: {
      type: Boolean,
      default: true
    },
    deletable: {
      type: Boolean,
      default: true
    },
    folder: {
      type: String,
      default: 'upload' // 默认文件夹名称
    },
    shopimg: { // 开启大图模式
      type: Boolean,
      default: false
    },
    inerwidth: { // 大图宽高
      type: Object,
      default: {
        width: '100px',
        height: '100px'
      }
    },
    imgurl: { // 大图地址
      type: String,
      default: '#'
    }
  },
  data () {
    return {
      url: this.files
    }
  },
  methods: {
    // 图片上传
    afterRead (e) {
      const that = this
      that.$emit('uploading', true)
      const data = new FormData()
      data.append('folder', that.folder)
      data.append('file', e.file)
      uploadFile(data).then(res => {
        that.$emit('uploading', false)
        if (res.state == 200) {
          that.url = [{ url: res.data, isImage: true }]
          that.$emit('upurl', that.url)
        } else {
          that.$toast('文件上传失败，请重新上传')
        }
      })
    },

    // 限制大小
    onOversize (e) {
      this.$toast('上传文件超出规定' + this.size + 'KB')
    },

    // 上传素材格式
    beforeRead (e) {
      if (this.types == '1') {
        const imgformat = /image\/(png|jpg|jpeg)$/
        if (!imgformat.test(e.type)) {
          this.$toast('请上传png、jpeg、jpg格式的图片')
          return false
        }
      } else {
        if (e.type != 'video/mp4') {
          this.$toast('请上传mp4格式的视频')
          return false
        }
      }
      return true
    }

  }
}
</script>
<style lang="scss" scoped></style>
