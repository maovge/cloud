<template>
  <div class="body">

    <div class="logo_img">
      <van-image class="logo" :src="require('@/assets/images/cloud.png')" />
    </div>

    <div class="userinfo">

      <van-cell-group class="userinp">
        <van-field autocomplete="off" :border="false" class="users" v-model="user.account" label="账号" placeholder="请输入登录账号"/>
      </van-cell-group>

      <van-cell-group class="userinp">
        <van-field autocomplete="off" :border="false" class="users" type="password" v-model="user.password" label="密码" placeholder="请输入登录密码"/>
      </van-cell-group>

      <van-cell-group class="userinp">
        <div class="position: relative;">
          <van-field autocomplete="off" :border="false" :maxlength="6" class="users" v-model="user.code" placeholder="请输入验证码" />
          <img @click="obtain" class="Code" :src="login_img" />
        </div>
      </van-cell-group>

    </div>

    <div class="userinfo">
      <van-button round type="danger" class="btn" @click="submit()">登录</van-button>
    </div>

  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import { getCaptcha, login } from '@/api/login'
import { getMineInfo } from '@/api/user'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  data () {
    return {
      loading_status: false,
      login_img: '',
      user: {
        account: '',
        password: '',
        code: ''
      }
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    // const token = localStorage.getItem('authToken');
    // if(token) {
    //   let Current = getCurrentInstance()
    //   Current.ctx.$toast('登录成功');
    //   Current.ctx.$router.push({ path: '/home'})
    // }
    return { }
  },
  methods: {
    // 获取验证码
    obtain () {
      getCaptcha().then(res => {
        if (res.state == 200) {
          this.login_img = res.data + '?/time=' + new Date().getTime()
        }
      })
    },

    // 提交
    submit () {
      if (this.user.account == '') {
        this.$toast('请输入登录账号')
        return
      }

      if (this.user.password == '') {
        this.$toast('请输入登录密码')
        return
      }

      if (this.user.code == '') {
        this.$toast('请输入验证码')
        return
      }
      this.loading_status = true
      login(this.user).then((res) => {
        if (res.state == 200) {
          sessionStorage.setItem('authToken', res.data)
          this.userinfo()
        } else {
          this.loading_status = false
          this.$toast(res.msg)
          this.user.code = ''
          this.obtain()
        }
      })
    },

    // 获取账户信息
    userinfo () {
      getMineInfo().then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.$toast('登录成功')
          sessionStorage.setItem('userinfo', JSON.stringify(res.data))
          this.$router.push({ path: '/home' })
        } else {
          sessionStorage.removeItem('authToken')
          this.user.code = ''
          this.obtain()
          this.$toast('账号异常，请联系管理人员')
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.body{
  position: fixed;
  height: 100vh;
  width: 100%;
  background: #FAFAFA;
  .logo_img{
    text-align: center;
    width: 100%;
  }
}
.userinfo{
  text-align: center;
  .userinp{
    width: 240px;
    display: inline-block;
    margin-bottom:20px;
    background-color: #fafafa;
    .users{
      width: 100%;
      height: 46px;
      background: #fafafa;
      border: 1px solid red;
      border-radius: 25px;
      background-color: #fafafa;
      padding-left: 30px;
      --van-field-label-width:40px;
    }
    .Code{
      position: absolute;
      top: 3px;
      right: 16px;
      width: 100px;
      height: 40px;
    }
  }
}
.btn{
  width: 200px;
}

</style>
