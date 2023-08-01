<template>

  <Navbar :navShow="true" title="门店配置" :arrow="true"/>

  <uploaders :shopimg="true" :inerwidth="inerwidth" :imgurl="info.pic" folder="store" :types="1" @uploading="uploading" @upurl="upurl"/>

  <div class="vgoodsinfo">
    <van-field autocomplete="off" class="vinput" label="门店名称" v-model="info.store_name" placeholder="请输入门店名称" input-align="right"/>
    <van-field autocomplete="off" class="vinput" label="终端编号" v-model="info.terminal_no" placeholder="请输入终端编号" input-align="right"/>
    <van-field autocomplete="off" class="vinput vcell" is-link readonly label="门店状态" v-model="info.staname" placeholder="请选择门店状态" input-align="right" @click="showshopsta = true"/>
    <van-field autocomplete="off" class="vinput" readonly label="门店类型" v-model="info.name" input-align="right">
      <template #right-icon>
        <van-checkbox-group v-model="info.type" checked-color="#D7000F" direction="horizontal" icon-size="14px">
          <van-checkbox name="1">云值守</van-checkbox>
          <van-checkbox name="2">云仓</van-checkbox>
        </van-checkbox-group>
      </template>
    </van-field>

    <van-field autocomplete="off" class="vinput" is-link readonly label="店长名称" v-model="info.store_manager_name" input-align="right" @click="showmanager = true"/>

    <van-field autocomplete="off" class="vinput" label="联系人" v-model="info.contacts" placeholder="请输入联系人" input-align="right"/>
    <van-field autocomplete="off" class="vinput" label="联系电话" v-model="info.mobile" placeholder="请输入联系电话" input-align="right"/>
    <van-field autocomplete="off" class="vinput" is-link readonly label="省市区" v-model="info.position" placeholder="请选择省市区" input-align="right"  @click="showregion = true"/>
    <van-field autocomplete="off" class="vinput" label="门店地址" v-model="info.address" placeholder="请输入门店地址" input-align="right"/>

  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <Loadin :loading_status="loading_status" />

  <!-- 门店状态 -->
  <van-popup v-model:show="showshopsta" round position="bottom">
    <van-picker title="门店状态" class="vpicker" :columns="shopsta" @confirm="onshopsta" @cancel="showshopsta = false" />
  </van-popup>

  <!-- 店长选择 -->
  <van-popup v-model:show="showmanager" round position="bottom">
    <van-picker title="店长选择" class="vpicker" :columns="shopmanager" @confirm="onshopmanager" @cancel="showmanager = false" />
  </van-popup>

  <!-- 省市区 -->
  <van-popup v-model:show="showregion" round position="bottom">
    <van-area title="省市区" class="vpicker" :area-list="regionarr" @change="ondataon" @confirm="onregion" @cancel="showregion = false" />
  </van-popup>

</template>

<script>
import Navbar from '@/components/Navbar'
import uploaders from '@/components/Uploader'

import { getmanagerList } from '@/api/common'
import { upshopdate } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, uploaders },
  data () {
    return {
      loading_status: false,
      showshopsta: false,
      showregion: false,
      showmanager: false,
      shopsta: [{ text: '启用', value: 1 }, { text: '禁用', value: 2 }],
      shopmanager: [],
      regionarr: {
        province_list: {},
        city_list: {},
        county_list: {}
      },

      inerwidth: {
        width: '100px',
        height: '180px'
      },
      info: {}
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
      const list = {}
      const infodata = JSON.parse(localStorage.getItem('store'))
      infodata.staname = '启用'
      infodata.type = infodata.store_type.split(',')
      infodata.position = ''
      if (infodata.province_id != 0) {
        infodata.position = infodata.province
      }
      if (infodata.city_id != 0) {
        infodata.position += '/' + infodata.city
      }
      if (infodata.area_id != 0) {
        infodata.position += '/' + infodata.area
      }

      if (infodata.status == '2') {
        infodata.staname = '禁用'
      }

      for (const item of this.province.iosProvinces) {
        list.[item.id] = item.value
      }

      this.info = infodata
      this.inerwidth.width = window.innerWidth
      this.regionarr.province_list = list
      this.getuser()
    },

    // 获取账户信息
    getuser () {
      this.shopmanager = []
      getmanagerList({ status: 1 }).then(res => {
        if (res.state == 200) {
          for (const item of res.data) {
            this.shopmanager.push({
              text: item.nickname,
              value: item.manager_id
            })
          }
        }
      })
    },

    // 上传状态回调
    uploading (e) {
      this.loading_status = e
    },

    // 上传地址回调
    upurl (e) {
      this.info.pic = e[0].url
    },

    // 门店状态
    onshopsta (e) {
      this.info.staname = e.text
      this.info.status = e.value
      this.showshopsta = false
    },

    // 店长名称
    onshopmanager (e) {
      this.info.store_manager_name = e.text
      this.info.store_manager = e.value
      this.showmanager = false
    },

    // 省市区
    ondataon (e) {
      const list = {}
      if (e[1] == undefined || e[1].code == '') {
        for (const item of this.province.iosCitys) {
          if (item.parentId == e[0].code) {
            list.[item.id] = item.value
          }
        }
        this.regionarr.city_list = list
        return
      }
      if (e[2] == undefined || e[2].code == '') {
        for (const item of this.province.iosCountys) {
          if (item.parentId == e[1].code) {
            list.[item.id] = item.value
          }
        }
        this.regionarr.county_list = list
      }
    },

    // 选择省市区
    onregion (e) {
      if (e.length != 0) {
        this.info.position = ''
        for (const item in e) {
          if (item == e.length - 1) {
            this.info.position += e[item] == undefined ? '' : e[item].name
          } else {
            this.info.position += e[item].name + '/'
          }
        }
        this.info.province_id = this.province.iosProvinces.find(item => (item.id * 1) === (e[0].code * 1)).city_id
        this.info.city_id = this.province.iosCitys.find(item => (item.id * 1) === (e[1].code * 1)).city_id
        this.info.area_id = ''
        if (e[2] != undefined) {
          this.info.area_id = this.province.iosCountys.find(item => (item.id * 1) === (e[2].code * 1)).city_id
        }
      }
      this.showregion = false
    },

    submit () {
      if (this.info.type.length == 0) {
        this.$toast('请选择门店类型')
        return
      }
      const data = {
        store_id: this.info.store_id,
        store_name: this.info.store_name,
        pic: this.info.pic,
        store_manager: this.info.store_manager,
        province_id: this.info.province_id,
        city_id: this.info.city_id,
        area_id: this.info.area_id,
        address: this.info.address,
        contacts: this.info.contacts,
        mobile: this.info.mobile,
        store_type: this.info.type.join(),
        terminal_no: this.info.terminal_no,
        status: this.info.status
      }
      this.loading_status = true
      upshopdate(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.$toast('保存成功')
          this.$router.back(0)
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.vgoodsinfo{
  width: 96%;
  margin-left: 2%;
  border-radius: 4px;
  background: #fafafa;
  margin-bottom: 10px;
}

.vinput{
  background-color: #f2f2f2;
  padding-left: 6px;
  padding-right: 6px;
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 20px;
  .vbut{
    width: 70%;
  }
}

.vcell{
  --van-cell-horizontal-padding: 10px;
  // --van-cell-vertical-padding:8px;
  --van-cell-label-line-height:15px;
  --van-cell-line-height:15px;
  white-space: nowrap;
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}
</style>
<style type="text/css">

.van-uploader__preview{
  width: 100%;
  height: 180px;
  margin: 0;
}

.van-image{
  width: 100%;
  height: 180px;
}

</style>
