<template>
  <div>

    <!-- 导航栏 -->
    <Navbar :navShow="true" title="硬件信息" :arrow="true"/>

    <Hardware :infos="info" @ware="ware" />

    <Loadin :loading_status="loading_status" />

  </div>

</template>

<script>

import Navbar from '@/components/Navbar'
import Hardware from '@/components/Hardware'

import { uphardwaredate } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Hardware },
  props: ['query'],
  data () {
    return {
      loading_status: false,
      info: {}
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
      this.info = this.$qs.parse(this.$route.query.info)
    },

    ware (e) {
      const data = {
        sh_id: e.sh_id,
        hardware_name: e.hardware_name,
        hardware_number: e.hardware_number,
        hardware_type: e.hardware_type,
        status: e.status
      }
      this.loading_status = true

      uphardwaredate(data).then(res => {
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
