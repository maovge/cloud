<template>

  <Navbar :navShow="true" :title="title" :arrow="true"/>

  <van-list v-model:loading="loading" :finished="finished" offset="20" :immediate-check="false">
    <van-cell v-for="(item,index) in list" :key="index" class="vcell">

      <Shop v-if="type != 3" :item="item" :strategy="true" @binure="binure" />

      <Userlist v-if="type == 3" :item="item" :numtype="1" @binure="binure" />

    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'
import Shop from '@/components/Shop'
import Userlist from '@/components/Userlist'

import { getstoreList, bindstore, unbindstore, getmanagerList, bindmanager, unbindmanager } from '@/api/strategy'
import { getauthmanagerList } from '@/api/manager'
import { getshopList } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Shop, Userlist },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: true,
      title: '策略',
      type: '',
      inven: {
        s_id: '',
        s_type: ''
      },
      list: [], // 列表信息
      ylist: '', // 原信息
      ulist: ''
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
  },
  activated () {
    const that = this
    if (!that.loading_status) {
      that.obtain()
    }
  },
  methods: {
    // 获取策略数据
    obtain () {
      const that = this
      that.loading_status = true
      that.inven.s_id = that.$route.query.s_id
      that.inven.s_type = that.$route.query.s_type
      that.type = that.$route.query.type
      switch (that.type) {
        case '1':
          that.title = '门店收款策略'
          break
        case '2':
          that.title = '门店收费策略'
          break
        case '3':
          that.title = '角色分润策略'
          break
      }
      if (that.type == 3) {
        getmanagerList(that.inven).then(res => {
          if (res.state == 300) {
            setTimeout(function () {
              that.obtain()
            }, 1000)
            return
          }
          if (res.state == 200) {
            if (that.ulist == '') {
              that.getuser(res.data)
            } else {
              const yls = JSON.parse(that.ulist)
              that.getread(yls, res.data)
            }
            return
          }
          that.getuser([])
        })
        return
      }
      getstoreList(that.inven).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        if (res.state == 200) {
          if (that.ylist == '') {
            that.getstore(res.data)
          } else {
            const yls = JSON.parse(that.ylist)
            that.getread(yls, res.data)
          }
          return
        }
        that.getstore([])
      })
    },

    // 获取门店数据
    getstore (e) {
      const that = this
      getshopList({ pageNum: 9999 }).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getstore(e)
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.ylist = JSON.stringify(res.data.data)
          that.getread(res.data.data, e)
        }
      })
    },

    // 获取名下用户信息
    getuser (e) {
      const that = this

      getauthmanagerList({ pageNum: 9999 }).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.getuser(e)
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          that.ulist = JSON.stringify(res.data.data)
          that.getread(res.data.data, e)
        }
      })
    },

    // 数据整理
    getread (e, k) {
      const that = this
      that.loading_status = false
      if (k.length == 0 && that.type != 3) {
        for (const ime of e) {
          const types = ime.store_type.split(',')
          ime.typeone = types[0] || '0'
          ime.typetwo = types[1] || '0'
        }
      } else {
        if (that.type == 3) {
          for (const item of k) {
            for (const ime of e) {
              if (item.manager_id == ime.manager_id) {
                ime.info = item
              }
            }
          }
        } else {
          for (const item of k) {
            for (const ime of e) {
              const types = ime.store_type.split(',')
              ime.typeone = types[0] || '0'
              ime.typetwo = types[1] || '0'
              if (item.store_id == ime.store_id) {
                ime.info = item
              }
            }
          }
        }
      }
      that.list = e
    },

    // 解除/绑定策略
    binure (e) {
      const that = this
      const data = {}
      switch (that.type) {
        case '1':
          if (e.info == undefined) {
            data.s_id = that.inven.s_id
            data.store_id = e.store_id
            data.s_type = 1
            that.bindstore(data)
          } else {
            data.ss_id = e.info.ss_id
            that.unbindstore(data)
          }
          break
        case '2':
          if (e.info == undefined) {
            data.s_id = that.inven.s_id
            data.store_id = e.store_id
            data.s_type = 2
            that.bindstore(data)
          } else {
            data.ss_id = e.info.ss_id
            that.unbindstore(data)
          }
          break
        case '3':
          if (e.info == undefined) {
            data.s_id = that.inven.s_id
            data.manager_id = e.manager_id
            data.s_type = 1
            data.sort = 1
            that.bindmanagers(data)
          } else {
            data.sm_id = e.info.sm_id
            that.unbindmanagers(data)
          }
          break
      }
    },

    // 绑定门店收款策略
    bindstore (e) {
      const that = this
      that.loading_status = true
      bindstore(e).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.bindstore(e)
          }, 1000)
          return
        }
        if (res.state == 200) {
          that.obtain()
        } else {
          that.loading_status = false
          that.$toast(res.msg)
        }
      })
    },

    // 解除门店收款策略
    unbindstore (e) {
      const that = this
      that.loading_status = true
      unbindstore(e).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.unbindstore(e)
          }, 1000)
          return
        }
        if (res.state == 200) {
          that.obtain()
        } else {
          that.loading_status = false
          that.$toast(res.msg)
        }
      })
    },

    // 绑定角色账户
    bindmanagers (e) {
      const that = this
      that.loading_status = true
      bindmanager(e).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.bindmanagers(e)
          }, 1000)
          return
        }
        if (res.state == 200) {
          that.obtain()
        } else {
          that.loading_status = false
          that.$toast(res.msg)
        }
      })
    },

    // 解除绑定角色账户
    unbindmanagers (e) {
      const that = this
      that.loading_status = true
      unbindmanager(e).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.bindmanagers(e)
          }, 1000)
          return
        }
        if (res.state == 200) {
          that.obtain()
        } else {
          that.loading_status = false
          that.$toast(res.msg)
        }
      })
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
}
</style>
