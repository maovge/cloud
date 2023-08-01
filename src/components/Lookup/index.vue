<template>

  <van-search 
    v-model="name" 
    :class="looktype ? 'wsrat' : 'sear'" 
    shape="round" 
    :placeholder="placeholder" 
    input-align="left" 
    show-action 
    @search="lookup" 
    :background="looktype ? '#f2f2f2' : '#fafafa'"
  >
    <template #action>
      <div @click="lookup">搜索</div>
    </template>
  </van-search>

</template>

<script>

export default {
  emits: ['look'], // 提前声明你要使用的自定义事件
  props: {
    placeholder:{
      type:String,
      default:'请输入内容'
    },
    looktype:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      name:''
    }
  },
  methods: {
    lookup(){
      this.$emit('look', this.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.sear{
  --van-search-label-font-size:12px;
  // --van-search-action-font-size:12px;
}
.wsrat{
  --van-search-label-font-size:12px;
  width: 94%;
  margin-left: 3%;
}
</style>
