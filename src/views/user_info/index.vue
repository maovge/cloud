<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="账户信息" :arrow="true" :headscul="false"/>

  <div class="headerWrap">
    <div class="imgWrap">
      <van-image round width="70px" height="70px" :src="collection.userinfo.pic || require('@/assets/images/avatar.png')"/>
    </div>
    <div class="textWrap">
      <div>{{ collection.userinfo.account }}</div>
      <div>{{ collection.userinfo.nickname }}</div>
    </div>
  </div>

  <div class="shop_arrange">
    <van-cell title="修改账号信息" class="shop_vcell" is-link  @click="goo('/user_edit')"/>
  </div>

  <div class="shop_arrange">
    <van-cell title="修改密码" class="shop_vcell" is-link  @click="goo('/user_password')"/>
  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">退出登录</van-button>
  </div>

</template>

<script>
import { logout } from '@/api/login'

import Navbar from '@/components/Navbar'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {}
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  methods: {
    obtain () {
      console.log('获取信息')
    },

    goo (e) {
      this.$router.push({ path: e })
    },

    submit () {
      logout().then(res => {
        sessionStorage.removeItem('authToken')
        sessionStorage.removeItem('userinfo')
        this.$router.push({ path: '/login' })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.headerWrap{
  padding: 30px 35px 45px;
  background-image: linear-gradient(0deg, #790008 0%, #d7000f 100%), linear-gradient(#fafafa, #fafafa);
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #f5f5f5;
  .imgWrap{
    margin-right: 10px;
  }
  .bindName{
    font-size: 12px;
    color: #fab6b6;
    line-height: 20px;
  }
}

.shop_arrange{
  margin: 16px 6px 0px 6px;
  --van-cell-background-color:#fafafa;
  border-radius: 4px;
  overflow: hidden;
  .shop_vcell{
    font-size: 12px;
  }
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 160px;
  .vbut{
    width: 70%;
  }
}

</style>
