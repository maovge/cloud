<template>
  <Navbar :navShow="true" title="添加店员" :arrow="true"/>

  <div class="addwareh">
    <van-cell-group inset>
      <van-field autocomplete="off" label="账号信息" class="class_inp" v-model="username" placeholder="请选择账号信息" is-link readonly input-align="right" @click="showcsr = true" />

      <van-field autocomplete="off" label="店员名称" class="class_inp" v-model="userinfo.nickname" placeholder="请输入店员名称" input-align="right" />

      <van-field autocomplete="off" label="联系电话" class="class_inp" v-model="userinfo.mobile" placeholder="请输入联系电话" input-align="right" />

      <van-field autocomplete="off" label="店员类型" class="class_inp" v-model="typename" placeholder="请选择店员类型" is-link readonly input-align="right" @click="showtype = true" />
    </van-cell-group>
  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <!-- 账号信息 -->
  <van-popup v-model:show="showcsr" round position="bottom">
    <van-picker title="账号信息" class="vpicker" :columns="staffuser" @confirm="onstaffuser" @cancel="showcsr = false" />
  </van-popup>

  <!-- 账号信息 -->
  <van-popup v-model:show="showtype" round position="bottom">
    <van-picker title="店员类型" class="vpicker" :columns="stafftype" @confirm="onstafftype" @cancel="showtype = false" />
  </van-popup>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'

import { getmanagerList } from '@/api/common'
import { addclerk } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      showcsr: false,
      showtype: false,
      loading_status: false,
      username: '',
      typename: '店员',
      staffuser: [],
      stafftype: [
        { id: '1', text: '店员' },
        { id: '2', text: '值守人' }
      ],
      staffinfo: {
        store_id: '',
        store_name: '',
        terminal_no: '',
        sc: []
      },
      userinfo: {
        manager_id: '',
        nickname: '',
        mobile: '',
        clerk_type: '1'
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
      const that = this
      that.loading_status = true
      if (that.staffinfo.store_id == '') {
        const infodata = JSON.parse(localStorage.getItem('store'))
        that.staffinfo.store_id = infodata.store_id
        that.staffinfo.store_name = infodata.store_name
        that.staffinfo.terminal_no = infodata.terminal_no
      }
      that.staffuser = []
      getmanagerList({ status: 1 }).then(res => {
        that.loading_status = false
        if (res.state == 200) {
          for (const item of res.data) {
            that.staffuser.push({
              text: item.nickname,
              value: item.manager_id
            })
          }
        }
      })
    },

    // 选择账户信息
    onstaffuser (e) {
      this.showcsr = false
      this.userinfo.manager_id = e.value
      this.username = e.text
      this.userinfo.nickname = e.text
    },

    // 店员类型
    onstafftype (e) {
      this.typename = e.text
      this.userinfo.clerk_type = e.value
      this.showtype = false
    },

    // 提交数据
    submit () {
      const usertips = {
        manager_id: '请选择店员账户',
        nickname: '请输入店员名称',
        mobile: '请输入店员联系电话'
      }

      for (const key in usertips) {
        if (this.userinfo[key] == '') {
          this.$toast(usertips[key])
          return
        }
      }
      this.staffinfo.sc.push(this.userinfo)
      this.loading_status = true
      addclerk(this.staffinfo).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.$toast('添加成功')
          this.$router.back(0)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.addwareh{
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 20px;
  .class_inp{
    background-color: #f2f2f2;
  }
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 20px;
}

.vbut{
  width: 70%;
}
</style>
