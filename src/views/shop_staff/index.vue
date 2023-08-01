<template>
  <Navbar :navShow="true" title="店员管理" :arrow="true"/>

  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell">
      <van-swipe-cell>
        <Userlist :item="item" :numtype="2" />
        <template #right>
          <van-button square color="#D7000F" size="normal" text="删除" class="delete-button" @click="delt(item.sc_id)"/>
        </template>
      </van-swipe-cell>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <!-- 添加店员 -->
  <div class="addstaff">
    <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="staffadd"/>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import Userlist from '@/components/Userlist'

import { getclerkList, delclerk } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Userlist },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: true,
      inven: {
        store_id: '',
        page: 1,
        pageNum: 15
      },
      list: []
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
      if (that.inven.store_id == '') {
        const infodata = JSON.parse(localStorage.getItem('store'))
        that.inven.store_id = infodata.store_id
      }
      getclerkList(that.inven).then(res => {
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

    // 添加店员
    staffadd () {
      this.$router.push({ path: '/staff_add' })
    },

    // 删除店员
    delt (e) {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除店员信息，是否继续删除' })
        .then(() => {
          that.loading_status = true
          delclerk({ sc_id: e }).then(res => {
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

    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.obtain()
    }
  }
}
</script>

<style lang="scss" scoped>
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

.addstaff{
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

.staff_text{
  color: #323233;
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
