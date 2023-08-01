<template>
  <Navbar :navShow="true" title="仓库盘点" :arrow="true"/>

  <div style="height: 20px;"></div>

  <div v-for="item of list">
    <liquidation :item="item" />
  </div>

  <div class="vanbtn" v-if="list.length != 0">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'
import liquidation from '@/components/liquidation'

import { getgoodsList, setInventory } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, liquidation },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
  },
  data () {
    return {
      loading_status: false,
      whdata: {
        wh_id: '',
        status: 1
      },
      list: [] // 列表信息
    }
  },
  methods: {
    // 获取数据
    obtain () {
      const that = this
      if (that.$route.query.wh_id == undefined) {
        that.$toast('非法请求')
        that.$router.back(0)
        return
      }

      that.whdata.wh_id = that.$route.query.wh_id
      that.loading_status = true
      let statusname = '正常'
      getgoodsList(that.whdata).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        if (res.state == 200) {
          that.loading_status = false

          for (const item of res.data) {
            if (item.status == 2) {
              statusname = '缺货'
            }
            if (item.status == 3) {
              statusname = '多货'
            }

            item.actual_stock = item.stock
            item.status_name = statusname
            item.expire_name = item.expire == 1 ? '已过期' : '未过期'
            item.overdue_time = ''
            item.expire = '0'
            item.overdue = ''
          }
          that.list = res.data
          that.finished = true
          that.loading = true
        }
      })
    },

    // 提交保存
    submit () {
      const that = this
      const data = {
        user_id: that.collection.userinfo.manager_id, // 盘点人ID
        wh_id: that.whdata.wh_id, // 仓库ID
        wh_name: that.$route.query.wh_name, // 仓库名称
        store_id: '', // 门店ID
        store_name: '', // 门店名称
        type: 2, // 盘点类型
        status: '', // 盘点状态
        details: []
      }
      data.details = []
      let sysstock = 0 // 系统库存
      let reastock = 0 // 实际库存
      let stats = '1'
      for (const item of that.list) {
        sysstock += item.stock * 1
        reastock += item.actual_stock * 1
        if (item.status == 2) {
          stats = '2'
        }
        if (item.status == 3 && stats != '2') {
          stats = '3'
        }
        if (item.expire == '1') {
          if (item.overdue == '') {
            this.$toast(item.wg_name + ' - 请输入过期日期')
            return
          }
        } else {
          item.overdue = ''
        }

        data.details.push({
          wg_id: item.wg_id,
          goods_id: item.goods_id,
          goods_name: item.wg_name,
          pic: item.wg_pic,
          gc_id: item.gc_id,
          gc_name: item.gc_name,
          bar_code: item.bar_code,
          batch_number: item.batch_number,
          manufacture_time: item.manufacture_time,
          sell_by_date: item.sell_by_date,
          ss_id: '',
          shelves_number: '',
          stock: item.stock,
          actual_stock: item.actual_stock,
          expire: item.expire,
          overdue: item.overdue || 0,
          status: item.status
        })
      }

      if (stats == '1' && sysstock != reastock) {
        if (reastock > sysstock) {
          stats = '3'
        } else {
          stats = '2'
        }
      }

      data.status = stats
      that.loading_status = true

      // const datas = JSON.stringify(data)
      // console.log(datas)
      // return

      setInventory(data).then(res => {
        that.loading_status = false
        if (res.state == 200) {
          that.$toast('保存成功')
          that.$router.back(0)
          return
        }
        that.$toast(res.msg)
      })
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
