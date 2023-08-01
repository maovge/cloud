<template>
  <Navbar :navShow="true" :title="title" :arrow="true"/>

  <!-- 商品信息 -->
  <div v-for="item of info.details">
    <Inventory :info="item" :wgtype="wgtype" />
  </div>

  <div class="vanbtn" v-if="info.status == 1">
    <div>
      <van-button class="vbut" round color="#D7000F" @click="submit('1')">确认收货</van-button>
    </div>

    <div class="vanbtnom">
      <van-button class="vbut" round color="#bbb" @click="submit('2')">拒绝收货</van-button>
    </div>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import Inventory from '@/components/Inventory'

import { getDetails, receipt, rejection } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Inventory },
  data () {
    return {
      loading_status: false,
      wgtype: true,
      title: '入库单',
      info: {},
      wo_info: {
        wo_id: ''
      }

    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  methods: {

    obtain () {
      this.loading_status = true
      this.wo_info.wo_id = this.$route.query.wo_id
      if (this.$route.query.type == 'false') {
        this.wgtype = false
        this.title = '出库单'
      }
      getDetails(this.wo_info).then(res => {
        this.loading_status = false
        this.info = res.data
      })
    },

    submit (e) {
      this.loading_status = true

      if (e == '1') {
        receipt(this.wo_info).then(res => {
          this.$toast('入库成功')
          this.$router.back(0)
        })
      } else {
        rejection(this.wo_info).then(res => {
          this.$toast('已拒绝收货')
          this.$router.back(0)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
}

.vanbtn{
  text-align: center;
  padding-top: 40px;
}

.vbut{
  width: 70%;
}

.vanbtnom{
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
