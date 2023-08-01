<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="添加角色" :arrow="true"/>

  <Userinfo :item="info" @status="status" />

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'
import Userinfo from '@/components/Userinfo'

import { addmanager } from '@/api/manager'

export default {
  components: { Navbar, Userinfo },
  data () {
    return {
      loading_status: false,
      statusiinfo: true,
      info: {
        nickname: '',
        account: '',
        password: '',
        bill_account: '',
        sex: 1,
        pic: '',
        status: 1,
        sexname: '保密',
        statusname: '启用'
      }
    }
  },
  methods: {

    submit () {
      if (this.info.nickname == '') {
        this.$toast('请输入用户昵称')
        return
      }
      if (this.info.account == '') {
        this.$toast('请输入登录账户')
        return
      }
      if (this.info.password == '') {
        this.$toast('请输入登录密码')
        return
      }

      if (!this.statusiinfo) {
        this.$toast('提交中...请勿重复提交')
        return
      }
      this.loading_status = true
      this.statusiinfo = false

      const data = {
        nickname: this.info.nickname,
        account: this.info.account,
        password: this.info.password,
        bill_account: this.info.bill_account,
        sex: this.info.sex,
        pic: this.info.pic,
        status: this.info.status
      }
      addmanager(data).then(res => {
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
