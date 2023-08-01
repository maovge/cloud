<template>
  <div v-if="navShow" style="z-index: 20;">
    <van-nav-bar :title="title" :left-arrow="arrow" @click-left="onClickLeft" class="navbars" :placeholder="true" :fixed="true">
      <template #right v-if="headscul">
        <van-image :src="collection.userinfo.pic || require('@/assets/images/avatar.png')" round width="30" height="30" @click="user" />
      </template>
    </van-nav-bar>
  </div>

</template>

<script>
// import { getCurrentInstance } from 'vue'

export default {
  props: {
    // 是否显示
    navShow: {
      type: Boolean,
      default: false
    },
    // 标题名称
    title: {
      type: String,
      default: '未知'
    },
    // 返回键
    arrow: {
      type: Boolean,
      default: false
    },
    // 返回是否刷新
    refresh: {
      type: Boolean,
      default: false
    },
    headscul: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {

    onClickLeft () {
      // 是否进行刷新操作
      if (this.refresh) {
        this.$router.back(0)
      } else {
        this.$router.back()
      }
    },

    // 前往用户信息
    user () {
      this.$router.push({ path: '/user_info' })
    }

  }
}
</script>

<style lang="scss" scoped>
.navbars{
  --van-nav-bar-background-color:#D7000F;
  --van-nav-bar-title-text-color:#fafafa;
  --van-nav-bar-icon-color:#fafafa;
  --van-nav-bar-title-font-size:16px;
}
</style>
<style>
.van-hairline--bottom:after {
  border-bottom-width: 0px;

}
.van-nav-bar{
  z-index: 990;
}
</style>
