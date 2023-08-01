<template>
  <div>

    <!-- 导航栏 -->
    <Navbar :navShow="true" title="添加硬件" :arrow="true"/>

    <Hardware @ware="ware" />

    <Loadin :loading_status="loading_status" />
  </div>

</template>

<script>
import Navbar from '@/components/Navbar'
import Hardware from '@/components/Hardware'

import { addhardware } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Hardware },
  data () {
    return {
      loading_status: false,
      info: {
        store_id: '',
        store_name: '',
        sh: []
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
      if (this.info.store_id == '') {
        const infodata = JSON.parse(localStorage.getItem('store'))
        this.info.store_id = infodata.store_id
        this.info.store_name = infodata.store_name
      }
    },

    ware (e) {
      this.loading_status = true
      this.info.sh = [e]
      addhardware(this.info).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.$toast('保存成功')
          this.$router.back(0)
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped></style>
