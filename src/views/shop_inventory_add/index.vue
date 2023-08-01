<template>
  <!-- 导航栏 -->
  <Navbar :navShow="true" title="商品盘点" :arrow="true"/>

  <van-sticky :offset-top="46">
    <div class="infos">盘点信息</div>
  </van-sticky>

  <van-cell-group inset >
    <van-cell class="vinput vtext" title="盘点人名称" :value="info.nickname" />
    <van-cell class="vinput vtext" title="盘点账号" :value="info.account" />
    <van-cell class="vinput vtext" title="门店名称" :value="info.store_name" />
    <van-cell class="vinput vtext" title="盘点类型" value="门店商品" />
    <van-cell class="vinput vtext" title="盘点日期" :value="gettimes(new Date)" />
  </van-cell-group>

  <van-sticky :offset-top="46">
    <div class="infos">商品信息</div>
  </van-sticky>

  <div v-for="item of list">
    <liquidation :item="item" />
  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'
import liquidation from '@/components/liquidation'

import { parseTime } from '@/util'
import { getshelvesList } from '@/api/shop'
import { setInventory } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, liquidation },
  data () {
    return {
      loading_status: false,
      info: {},
      list: []
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
      const user = that.collection.userinfo
      that.info = JSON.parse(localStorage.getItem('store'))
      that.info.account = user.account
      that.info.nickname = user.nickname
      that.info.manager_id = user.manager_id
      that.loading_status = true
      getshelvesList({ store_id: that.info.store_id }).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          for (const item of res.data) {
            item.actual_stock = ''
            item.overdue_time = ''
            item.expire_name = '未过期'
            item.expire = '0'
            item.status_name = '正常'
            item.status = 1
          }
          that.list = res.data
        }
      })
      console.log(that.info)
    },

    // 提交保存
    submit () {
      const that = this
      const data = {
        user_id: that.info.manager_id, // 盘点人ID
        wh_id: '', // 仓库ID
        wh_name: '', // 仓库名称
        store_id: that.info.store_id, // 门店ID
        store_name: that.info.store_name, // 门店名称
        type: 1, // 盘点类型
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
            this.$toast(item.goods_name + ' - 请输入过期日期')
            return
          }
        } else {
          item.overdue = ''
        }

        data.details.push({
          wg_id: item.wg_id,
          goods_id: item.goods_id,
          goods_name: item.goods_name,
          pic: item.goods_pic,
          gc_id: item.goods_c_id,
          gc_name: item.goods_c_name,
          bar_code: item.bar_code,
          batch_number: item.batch_number,
          manufacture_time: item.manufacture_time,
          sell_by_date: item.sell_by_date,
          ss_id: item.ss_id,
          shelves_number: item.shelves_number,
          stock: item.stock,
          actual_stock: item.actual_stock || item.stock,
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
      setInventory(data).then(res => {
        that.loading_status = false
        if (res.state == 200) {
          that.$toast('保存成功')
          that.$router.back(0)
          return
        }
        that.$toast(res.msg)
      })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime(e * 1, '').split(' ')
      return time[0]
    }

  }
}
</script>
<style lang="scss" scoped>
.vinput{
  background-color: #fafafa;
}

.vtext{
  --van-cell-value-color:#323233;
}

.infos{
  font-size: 14px;
  padding: 10px;
  font-weight: 550;
  position: relative;
  background: #f2f2f2;
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 20px;
  .vbut{
    width: 70%;
  }
}
</style>
