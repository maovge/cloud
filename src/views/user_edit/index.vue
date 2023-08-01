<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="修改账户信息" :arrow="true" :headscul="false"/>

  <div class="vgoodsinfo">
    <van-cell-group inset>
      <van-field autocomplete="off" class="vinput" label="账户名称" v-model="userinfo.name" placeholder="请输入账户名称" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="联系电话" v-model="userinfo.phone" placeholder="请输入联系电话" input-align="right"/>
      <van-field autocomplete="off" class="vinput" is-link readonly label="省市区" v-model="userinfo.area" placeholder="请选择省市区" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="详细地址" v-model="userinfo.address" placeholder="请输入详细地址" input-align="right"/>
    </van-cell-group>
  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

</template>

<script>

import Navbar from '@/components/Navbar'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      userinfo: {
        name: '',
        phone: '',
        area: '',
        address: ''
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
      console.log('获取信息')
    },

    submit () {
      this.$toast('保存成功')
      this.$router.back(0)
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
