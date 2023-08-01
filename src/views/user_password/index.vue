<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="修改密码" :arrow="true" :headscul="false"/>

  <div class="vgoodsinfo">
    <van-cell-group inset>
      <van-field autocomplete="off" class="vinput" label="用户名称" readonly v-model="password" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="用户账号" readonly v-model="password" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="新账号密码" v-model="password" placeholder="请输入账号密码" input-align="right"/>
    </van-cell-group>
  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  components: { Navbar },
  data () {
    return {
      password: ''
    }
  },
  methods: {
    submit () {
      console.log('123')
    }
  }
}
</script>
<style lang="scss" scoped>
.vgoodsinfo{
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.vinput{
  background-color: #f2f2f2;
  padding-left: 6px;
  padding-right: 6px;
  // width: 337px;
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 40px;
  .vbut{
    width: 70%;
  }
}
</style>
