<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="edit(item)">
      <Order :item="item" :status="true" @notice="noticelist"/>
    </van-cell>
  </van-list>
</template>

<script>

import Order from '@/components/Order'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Order },
  data () {
    return {
      loading:false,
      finished:true,
      list:[]
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  methods: {
    obtain(){
      console.log('获取信息')
      this.list = [
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6},
      ]
    },

    onLoad(){
      console.log('123')
    },

    edit(e){
      const data = {
        info: this.$qs.stringify(e)
      }
      this.$router.push({ path: '/shop_inventory_order', query: data })

    },

    // 1.查看监控、2.公众号通知、3.短信通知
    noticelist(e){
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
<style lang="scss" scoped>
.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
}
</style>
