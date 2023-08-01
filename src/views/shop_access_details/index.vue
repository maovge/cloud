<template>
  <!-- 导航栏 -->
  <Navbar :navShow="true" title="详细信息" :arrow="true"/>

  <orliails :info="list" :status="true" @notice="notice"/>

</template>

<script>
import Navbar from '@/components/Navbar'
import orliails from '@/components/Order/details'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar,orliails },
  data () {
    return {}
  },
  setup () {
    onBeforeMount(() => {
      let Current = getCurrentInstance()
      Current.ctx.obtain()
      // console.log(Current.ctx.$qs.parse(Current.ctx.$route.query.info)) // 传参过来的数据信息
    })
    return {}
  },
  methods: {
    obtain(){
      this.list = {
        list:[
          {id:1},
          {id:2},
          {id:3},
          {id:4},
          {id:5},
        ]
      }
      console.log('获取信息')
    }
  }
}
</script>
<style lang="scss" scoped></style>
