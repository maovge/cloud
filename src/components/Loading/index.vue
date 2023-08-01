<template>
  <div class="loading_bag" v-if="loading_status">
    <div class="loading_back" :style="'margin-top:' + height/2 + 'px;'">
      <div class="loading_icon">
        <van-loading type="spinner" color="#fafafa" vertical>
          <span class="loading_text">加载中...</span>
        </van-loading>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    loading_status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      height: window.outerHeight
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.loading_bag{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 100;
}
.loading_back{
  margin-top: 301.5px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  text-align: center;
  .loading_icon{
    background: rgba(0, 0, 0, 0.5);
    display: inline-block;
    padding: 10px;
    border-radius: 4px;
  }
  .loading_text{
    color: #fafafa;
    font-size: 14px;
  }
}
</style>
