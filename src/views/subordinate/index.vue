<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="角色管理" :arrow="true"/>

  <!-- 搜索栏 -->
  <div class="vback">
    <Lookup placeholder="请输入角色名称" @look="look"/>
  </div>

  <div style="height: 60px;"></div>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="details(item)">
      <van-swipe-cell>
        <Userlist :item="item" :numtype="3" :password="true" @resettings="resettings" />
        <template #right>
          <van-button square color="#D7000F" size="normal" text="删除" class="delete-button" @click="dele(item.manager_id)"/>
        </template>
      </van-swipe-cell>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <!-- 添加员工 -->
  <div class="addgoods">
    <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="manageradd"/>
  </div>

  <Loadin :loading_status="loading_status" />

  <!-- 重置密码 -->
  <van-popup v-model:show="showPop" round style="border-radius: 4px;">
    <div class="popup_info">
      <div class="popup_title">重置密码</div>
      <van-field label="登录密码:" autocomplete="off" v-model="paws" label-width="66px" placeholder="请输入登录密码" />
    </div>
    <van-row class="rowbtn">
      <van-col span="12" @click="showPop = false">取消</van-col>
      <van-col span="12" class="colbtn" @click="submit">确认</van-col>
    </van-row>
  </van-popup>

</template>

<script>

import Navbar from '@/components/Navbar'
import Userlist from '@/components/Userlist'
import Lookup from '@/components/Lookup'

import { getauthmanagerList, updatePassword, delmanager } from '@/api/manager'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Userlist, Lookup },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: true,
      showPop: false,
      paws: '',
      info: {},
      list: [],
      inven: {
        nickname: '',
        page: 1,
        pageNum: 15
      }
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.loading_status = true
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  activated () {
    const that = this
    if (!that.loading_status) {
      that.inven.page = 1
      that.obtain()
    }
  },
  methods: {

    obtain () {
      const that = this
      getauthmanagerList(that.inven).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          if (that.inven.page == 1) {
            that.list = res.data.data
          } else {
            that.list = [...that.list, ...res.data.data]
          }
          that.finished = false
          that.loading = false
          if (that.inven.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
      })
    },

    // 添加角色
    manageradd () {
      this.$router.push({ path: '/subordinate_add' })
    },

    // 角色详情
    details (e) {
      const data = {
        info: this.$qs.stringify(e)
      }
      this.$router.push({ path: '/subordinate_details', query: data })
    },

    // 查询
    look (e) {
      this.inven.nickname = e
      this.inven.page = 1
      this.loading_status = true
      this.obtain()
    },

    // 重置密码
    resettings (e) {
      this.info = e
      this.paws = ''
      this.showPop = true
    },

    // 提交新密码
    submit () {
      const that = this
      if (that.paws == '') {
        that.$toast('请输入新的密码')
        return
      }
      if (/[\u4E00-\u9FA5]/g.test(that.paws)) {
        that.$toast('密码不能包含中文字符')
        return
      }
      const data = {
        manager_id: that.info.manager_id,
        password: that.paws
      }
      if (that.loading_status) {
        that.$toast('请勿重复点击')
        return
      }
      that.loading_status = true
      updatePassword(data).then(res => {
        that.loading_status = false
        that.showPop = false
        if (res.state == 200) {
          that.$toast('重置成功')
        }
      })
    },
    
    // 删除角色
    dele(e){
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除角色信息，是否继续删除' })
        .then(() => {
          that.loading_status = true
          delmanager({manager_id:e}).then(res=>{
            that.loading_status = false
            if (res.state == 200) {
              that.inven.page = 1
              that.obtain()
            }
            that.$toast(res.msg)
          })
          // on confirm
        })
        .catch(() => {
          console.log('取消删除')
          // on cancel
        })
    },
    
    // 下一页
    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.obtain()
    }

  }
}
</script>
<style lang="scss" scoped>
.vback{
  position: fixed;
  width: 100%;
  z-index: 1;
  background: #f2f2f2;
  padding-bottom: 10px;
}

.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
  font-size: 12px;
}

.addgoods{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 20px;
  .vbtnicon{
    width: 48px;
    height: 48px;
    --van-button-icon-size:20px;
  }
}

.popup_info{
  width: 260px;
  height: 80px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  .popup_title{
    font-size: 16px;
    text-align: center;
    color: #D7000F;
    padding-bottom: 10px;
  }
}
.rowbtn{
  height: 51px;
  line-height: 51px;
  text-align: center;
  font-size: 14px;
  .colbtn{
    color: #D7000F;
  }
}

</style>
<style>
.staff_content {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
  right:-1px;
}
</style>
