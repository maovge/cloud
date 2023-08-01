<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="角色详情" :arrow="true"/>

  <Userinfo :item="info" :typeman="2" @status="status" />

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'
import Userinfo from '@/components/Userinfo'

import { updatemanager } from '@/api/manager'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Userinfo },
  data () {
    return {
      loading_status: false,
      statusiinfo: true,
      info: {
        nickname: '',
        account: '',
        bill_account: '',
        sex: 1,
        pic: '',
        status: 1,
        sexname: '保密',
        statusname: '启用'
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
      const info = this.$qs.parse(this.$route.query.info)
      let sexname = '保密'
      if (info.sex == 2 || info.sex == 3) {
        sexname = info.sex == 2 ? '男' : '女'
      }
      this.info.manager_id = info.manager_id
      this.info.nickname = info.nickname
      this.info.account = info.account
      this.info.bill_account = info.bill_account
      this.info.sex = info.sex
      this.info.pic = info.pic
      this.info.status = info.status
      this.info.sexname = sexname
      this.info.statusname = info.status == 1 ? '启用' : '禁用'
    },

    submit () {
      if (this.info.nickname == '') {
        this.$toast('请输入用户昵称')
        return
      }

      if (!this.statusiinfo) {
        this.$toast('提交中...请勿重复提交')
      }
      this.loading_status = true
      this.statusiinfo = false

      const data = {
        manager_id: this.info.manager_id,
        nickname: this.info.nickname,
        bill_account: this.info.bill_account,
        sex: this.info.sex,
        pic: this.info.pic,
        status: this.info.status
      }
      updatemanager(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.statusiinfo = true
          this.$toast('保存成功')
          this.$router.back(0)
        }
      })
    },

    status (e) {
      this.loading_status = e
    }

  }
}
</script>
<style lang="scss" scoped>
.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 20px;
  .vbut{
    width: 70%;
  }
}
</style>
