<template>
  <Navbar :navShow="true" title="监控回放" :arrow="true"/>

  <div v-if="info.url == ''">

  </div>

  <div v-else>
    <Playback :info="info" />
  </div>

  <Loadin :loading_status="loading_status" />
</template>

<script>
import Navbar from '@/components/Navbar'
import Playback from '@/components/Playback'

import { onBeforeMount, getCurrentInstance } from 'vue'
// import { recVideoSave } from '@/api/live'

export default {
  components: { Navbar, Playback },
  data () {
    return {
      loading_status: false,
      name: '',
      listinfo: {},
      info: {
        token: '',
        url: ''
      }
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
  },
  methods: {
    obtain () {
      const that = this
      if (that.listinfo.id == undefined) {
        that.name = that.$route.query.name
        that.listinfo = that.$qs.parse(that.$route.query.info)
      }
      // that.loading_status = true
      // recVideoSave().then(res => {
      //   that.loading_status = false
      // })
    }
  }
}
</script>

<style lang="scss" scoped></style>
