<template>
  <van-dropdown-menu class="vmenu">
    <van-dropdown-item v-for="(item,index) in list" :key="index" v-model="item.value" :options="item.list" @change="drop(item)" />
  </van-dropdown-menu>

</template>

<script>
/*
 *
 * 数据格式为Object对象
 * 字段名称:{
    字段名称:{
      name:'', // 要回调的名称
      value:0, // 选中的参数
      list:[{text:'全部分类',value:0}] // 下拉框数据
    }
  }
 */
export default {
  emits: ['drop'], // 提前声明你要使用的自定义事件
  props: {
    list:{ // 列表信息
      type:Object,
      default:{}
    }
  },
  data() {
    return {}
  },
  methods: {
    drop(e){
      let data = {
        name:e.name,
        value:e.value
      }
      this.$emit('drop', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.vmenu{
  --van-dropdown-menu-background-color:#fafafa;
  --van-dropdown-menu-box-shadow:0;
  --van-dropdown-menu-title-font-size:14px;
}
</style>
