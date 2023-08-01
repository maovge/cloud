<template>
  <!-- 导航栏 -->
  <Navbar :navShow="true" title="订单详情" :arrow="true"/>

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
    },

    // 1.查看监控、2.公众号通知、3.短信通知
    notice(e){
      let that = this

      if(e.status == 1){
        const data = {
          info: that.$qs.stringify(e.item)
        }
        // that.$router.push({ path: '#', query: data })
        return
      }

      let text = '此操作将以公众号方式进行补扣通知，是否继续'
      if(e.status == 3){
        text = '此操作将以短信方式进行补扣通知，是否继续'
      }

      that.$dialog.confirm({ title: '温馨提示', message: text })
        .then(() => {
          that.$toast('通知成功')
          // on confirm
        })
        .catch(() => {
          console.log('取消通知')
          // on cancel
        })
    }

  }
}
</script>
<style lang="scss" scoped></style>
