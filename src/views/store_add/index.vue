<template>
  <Navbar :navShow="true" :title="title" :arrow="true"/>

    <div class="addwareh">
      <van-cell-group inset>
        <van-field autocomplete="off" v-if="storeinfo.wh_id" label="ID" class="class_inp" readonly v-model="storeinfo.wh_id" input-align="right" />

        <van-field autocomplete="off" label="名称" class="class_inp" v-model="storeinfo.wh_name" placeholder="请输入仓库名称" input-align="right" />

        <van-field autocomplete="off" label="状态" class="class_inp" v-model="storeinfo.sta" placeholder="请选择状态" is-link readonly input-align="right" @click="showstatus = true" />

        <van-field autocomplete="off" label="库存预警" class="class_inp" v-model="storeinfo.stock_warning" placeholder="请输入库存预警" input-align="right" />

        <van-field
					 autocomplete="off"
          label="省市区"
          class="class_inp"
          v-model="storeinfo.cityname"
          placeholder="请选择省市区"
          is-link
          readonly
          input-align="right"
          @click="showsynous = true"
        />

        <van-field autocomplete="off" label="详细地址" class="class_inp" v-model="storeinfo.address" placeholder="请输入详细地址" input-align="right" />
      </van-cell-group>
    </div>

    <div class="vanbtn">
      <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
    </div>

  <!-- 省市区 -->
  <van-popup v-model:show="showsynous" round position="bottom">
    <van-area
      title="省市区"
      class="vpicker"
      :area-list="private"
      :columns-placeholder="['请选择', '请选择', '请选择']"
      @confirm="onprivate"
      @cancel="showsynous = false"
      @change="ondataon"
    />
  </van-popup>

  <!-- 归属 -->
  <van-popup v-model:show="showstatus" round position="bottom">
    <van-picker title="仓库归属" class="vpicker" :columns="warehouse" @confirm="onwarehouse" @cancel="showstatus = false" />
  </van-popup>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'

import { update, addwarehouse } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      title: '添加仓库',
      showsynous: false, // 省市区
      showstatus: false, // 状态
      loading_status: false,
      private: {
        province_list: {},
        city_list: {},
        county_list: {}
      }, // 省市区
      warehouse: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 2 }
      ], // 库存状态
      storeinfo: {
        wh_name: '',
        province_id: '',
        province: '',
        city_id: '',
        city: '',
        area_id: '',
        area: '',
        address: '',
        stock_warning: '',
        cityname: '',
        sta: '启用',
        status: 1
      }
    }
  },
  setup () {
    onBeforeMount(() => {
      const Current = getCurrentInstance()
      Current.ctx.getaddres()
      if (Current.ctx.$route.query.wh_id) {
        const info = Current.ctx.$route.query
        const sta = info.status == 1 ? '启用' : '禁用'
        const storeinfo = {
          wh_id: info.wh_id,
          wh_name: info.wh_name || '',
          province_id: info.province_id || '',
          province: info.province || '',
          city_id: info.city_id || '',
          city: info.city || '',
          area_id: info.area_id || '',
          area: info.area || '',
          cityname: '',
          address: info.address || '',
          stock_warning: info.stock_warning || '',
          sta: sta || '',
          status: info.status || ''
        }
        storeinfo.cityname = storeinfo.province + '/' + storeinfo.city + '/' + storeinfo.area
        Current.data.storeinfo = storeinfo
        Current.data.title = '修改仓库'
      }
    })
    return {}
  },
  methods: {
    // 获取省市区
    getaddres () {
      const list = {}
      for (const item of this.province.iosProvinces) {
        list.[item.id] = item.value
      }
      this.private.province_list = list
    },

    // 选择省市区
    onprivate (e) {
      if (e.length != 0) {
        this.storeinfo.cityname = ''
        for (const item in e) {
          if (item == e.length - 1) {
            this.storeinfo.cityname += e[item] == undefined ? '' : e[item].name
          } else {
            this.storeinfo.cityname += e[item].name + '/'
          }
        }

        this.storeinfo.area = e[2].name
        this.storeinfo.city = e[1].name
        this.storeinfo.province = e[0].name

        this.storeinfo.province_id = this.province.iosProvinces.find(item => (item.id * 1) === (e[0].code * 1)).city_id
        this.storeinfo.city_id = this.province.iosCitys.find(item => (item.id * 1) === (e[1].code * 1)).city_id
        this.storeinfo.area_id = ''
        if (e[2] != undefined) {
          this.storeinfo.area_id = this.province.iosCountys.find(item => (item.id * 1) === (e[2].code * 1)).city_id
        }
      }

      this.showsynous = false
    },

    ondataon (e) {
      const list = {}
      if (e[1] == undefined || e[1].code == '') {
        for (const item of this.province.iosCitys) {
          if (item.parentId == e[0].code) {
            list.[item.id] = item.value
          }
        }
        this.private.city_list = list
        return
      }
      if (e[2] == undefined || e[2].code == '') {
        for (const item of this.province.iosCountys) {
          if (item.parentId == e[1].code) {
            list.[item.id] = item.value
          }
        }
        this.private.county_list = list
      }
    },

    // 状态
    onwarehouse (e) {
      this.storeinfo.sta = e.text
      this.storeinfo.status = e.value
      this.showstatus = false
    },

    // 提交数据
    submit () {
      this.loading_status = true
      const data = {
        wh_name: this.storeinfo.wh_name,
        province_id: this.storeinfo.province_id,
        province: this.storeinfo.province,
        city_id: this.storeinfo.city_id,
        city: this.storeinfo.city,
        area_id: this.storeinfo.area_id,
        area: this.storeinfo.area,
        address: this.storeinfo.address,
        stock_warning: this.storeinfo.stock_warning,
        status: this.storeinfo.status
      }

      if (this.storeinfo.wh_id) {
        data.wh_id = this.storeinfo.wh_id
        update(data).then(res => {
          this.loading_status = false
          if (res.state == 200) {
            this.$toast('修改成功')
            this.$router.back(0)
          }
        })
        return
      }
      addwarehouse(data).then(res => {
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

<style>
.vpopup {
  --van-popup-round-border-radius: 4px;
}
</style>

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
  .vbut{
    width: 70%;
  }
}

</style>
