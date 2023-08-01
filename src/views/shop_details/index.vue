<template>
  <div>

    <!-- 导航栏 -->
    <Navbar :navShow="true" title="门店详情" :arrow="true"/>

    <div class="shop_top">
      <van-image width="100%" height="100%" :src="info.pic"/>
    </div>

    <div class="shop_machine_info">
      <div class="shop_top_name">
        <div class="shop_name shop_text">{{ info.store_name }}</div>
        <div class="shop_status">
          <van-tag v-if="info.online == '1'" type="success">营业中</van-tag>
          <van-tag v-else color="#909399" >休息中</van-tag>
        </div>
        <div class="shop_code">
          <van-tag v-for="(item,index) in types" :key="index" class="shop_tag" plain :color="item.color">{{ item.value }}</van-tag>
        </div>
      </div>
      <van-row class="shop_mac_user">
        <van-col span="8" class="shop_mac_info">
          <div class="shop_mac_name">{{ info.store_manager_name }}</div>
          <div>店长</div>
        </van-col>
        <van-col span="8" class="shop_mac_info shop_mac_boder">
          <div class="shop_mac_name">{{ info.terminal_no }}</div>
          <div>主机编号</div>
        </van-col>
        <van-col span="8" class="shop_mac_info">
          <div class="shop_mac_name">{{ info.sc.nickname || '--' }}</div>
          <div>值守人</div>
        </van-col>
      </van-row>
      <van-row class="shop_user">
        <van-col span="20" class="shop_col">
          <div class="shop_name">联系人：<span class="shop_text">{{ info.contacts }}</span></div>
          <div class="shop_address">门店地址：<span class="shop_text">{{ info.province }}{{ info.city }}{{ info.area }}{{ info.address }}</span></div>
        </van-col>
        <van-col span="4" class="shop_icon shop_text" @click="showphone(info.mobile)">
          <van-icon name="phone-o" />
        </van-col>
      </van-row>
    </div>

    <div class="shop_arrange">
      <van-cell title="货架管理" class="shop_vcell" is-link  @click="storage('/shop_goods', info)"/>
      <van-cell title="店员管理" class="shop_vcell" is-link  @click="storage('/shop_staff', info)"/>
      <van-cell title="监控管理" class="shop_vcell" is-link  @click="storage('/shop_monitor', live)"/>
      <van-cell title="门店盘点" class="shop_vcell" is-link  @click="storage('/shop_inventory', info)"/>
      <van-cell title="营业时间" class="shop_vcell" is-link  @click="goo('/shop_time', { store_id: info.store_id })"/>
      <van-cell title="到访记录" class="shop_vcell" is-link  @click="goo('/shop_access', { terminal: info.terminal_no })"/>
      <van-cell title="硬件配置" class="shop_vcell" is-link  @click="storage('/shop_hardware', info)"/>
      <van-cell title="门店配置" class="shop_vcell" is-link  @click="storage('/shop_setup', info )"/>
    </div>

  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { typeoption } from '@/util/type'
import { onBeforeMount, getCurrentInstance } from 'vue'
import { getinfoFind, gethardwareList } from '@/api/shop'

export default {
  components: { Navbar },
  data () {
    return {
      loading_status: true,
      live: [],
      info: {
        sc: {}
      },
      types: []
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
      that.obtain()
    }
  },
  methods: {
    obtain () {
      // 清除门店盘点记录
      localStorage.setItem('inventory', null)
      localStorage.setItem('store', null)
      const data = {
        store_id: this.$route.query.store_id
      }
      this.getlive(data.store_id)
      getinfoFind(data).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            this.obtain()
          }, 1000)
          return
        }
        this.loading_status = false
        if (res.state == 200) {
          const storetype = typeoption('shop_type', res.data.store_type.split(','))
          const paytype = typeoption('pay_type', res.data.sp.pay_type.split(','))
          this.types = [...storetype, ...paytype]
          this.info = res.data
        }
      })
    },

    // 获取硬件信息
    getlive (e) {
      const data = {
        store_id: e,
        pageNum: 9999
      }
      gethardwareList(data).then(res => {
        if (res.state == 200) {
          this.live = []
          for (const item of res.data.data) {
            if (item.hardware_type == 8) {
              this.live.push(item)
            }
          }
        }
      })
    },

    // 拨打电话
    showphone (e) {
      const that = this
      that.$dialog.confirm({ title: '联系电话', message: '确认拨打' + this.info.contacts + '负责人' + e + '热线吗？' })
        .then(() => {
          const a = document.createElement('a')
          a.href = 'tel:' + e
          a.click()
        })
        .catch(() => {
          console.log('取消拨打')
          // on cancel
        })
    },

    storage (e, k) {
      localStorage.setItem('store', JSON.stringify(k))
      this.goo(e, '')
    },

    goo (e, k) {
      this.$router.push({ path: e, query: k })
    }

  }
}
</script>
<style lang="scss" scoped>
.shop_top{
  width: 100%;
  height: 180px;
}

.shop_machine_info{
  color: #bbb;
  margin: 10px 6px;
  .shop_top_name{
    position: relative;
    background: #fafafa;
    padding: 0 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
    .shop_name{
      display: inline-block;
      font-size: 16px;
      font-weight: 550;
      margin-top: 10px;
      max-width: 280px;
      padding-bottom: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .shop_status{
      display: inline-block;
      position: absolute;
      margin-top: 10px;
      right: 10px;
    }
    .shop_code{
      font-size: 14px;
      .shop_tag{
        margin-left: 6px;
        margin-bottom:6px;
      }
    }
  }
  .shop_mac_user{
    background: #fafafa;
    height: 50px;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    .shop_mac_info{
      height: 40px;
      margin-top: 5px;
      padding-top: 6px;
      .shop_mac_name{
        padding-bottom: 4px;
        color: #323233;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .shop_mac_boder{
      border-left: 1px solid #f2f2f2;
      border-right: 1px solid #f2f2f2;
    }
  }

  .shop_user{
    background: #fafafa;
    height: 50px;
    border-bottom: 1px solid #f2f2f2;
    .shop_col{
      padding-top: 8px;
      padding-left: 10px;
      .shop_name{
        padding-bottom: 6px;
      }
      .shop_address{
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .shop_icon{
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      border-left: 1px solid #f2f2f2;
    }
  }
}

.shop_arrange{
  margin: 0 6px 20px 6px;
  --van-cell-background-color:#fafafa;
  border-radius: 4px;
  overflow: hidden;
  .shop_vcell{
    font-size: 12px;
  }
}

.shop_text{
  color:#323233;
}

</style>
