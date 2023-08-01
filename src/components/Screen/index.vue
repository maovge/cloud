<template>

  <van-collapse v-if="JSON.stringify(scrennlist) != '{}'" v-model="activeNames" class="coll" :border="false">
    <van-collapse-item title="筛选" name="sele" class="collapse">
      <van-cell v-if="scrennlist.Manager" title="店长" is-link class="vcell" :value="Manager" @click="showManager = true"/>
      <van-cell v-if="scrennlist.region" title="省市区" is-link class="vcell" :value="region" @click="showregion = true"/>
      <van-cell v-if="scrennlist.duty" title="值守人" is-link class="vcell" :value="duty" @click="showduty = true"/>
      <van-cell v-if="scrennlist.doortype" title="门店类型" is-link class="vcell" :value="doortype" @click="showdoortype = true"/>
      <van-cell v-if="scrennlist.machine" title="监控设备" is-link class="vcell" :value="machine" @click="showmachine = true"/>
      <van-cell v-if="scrennlist.datas" title="日期选择" is-link class="vcell" :value="datas" @click="showdatas = true"/>
      <van-cell v-if="scrennlist.times" title="时间选择" is-link class="vcell" :value="times" @click="showtimes = true"/>
      <van-cell v-if="scrennlist.paragraph" title="时间范围选择" is-link class="vcell" :value="paragraph" @click="showparagraph = true"/>
      <van-cell v-if="scrennlist.shopstatus" title="门店状态" is-link class="vcell" :value="staname" @click="showshopsta = true"/>
      <van-cell v-if="scrennlist.paytype" title="支付类型" is-link class="vcell" :value="paytypename" @click="showpaytype = true"/>
      <van-cell v-if="scrennlist.paystatus" title="退款状态" is-link class="vcell" :value="paystatusname" @click="showpaystatus = true"/>

    </van-collapse-item>
  </van-collapse>

  <!-- 店长选择 -->
  <van-popup v-model:show="showManager" round position="bottom">
    <van-picker title="店长选择" class="vpicker" :columns="Managerarr" @confirm="onManager" @cancel="showPicker = false" />
  </van-popup>

  <!-- 省市区 -->
  <van-popup v-model:show="showregion" round position="bottom">
    <van-area title="省市区" class="vpicker" :area-list="regionarr" @change="ondataon" @confirm="onregion" @cancel="showregion = false" />
  </van-popup>

  <!-- 值守人 -->
  <van-popup v-model:show="showduty" round position="bottom">
    <van-picker title="值守人选择" class="vpicker" :columns="dutyarr" @confirm="onduty" @cancel="showduty = false" />
  </van-popup>

  <!-- 门店类型 -->
  <van-popup v-model:show="showdoortype" round position="bottom">
    <van-picker title="门店类型" class="vpicker" :columns="doortypearr" @confirm="ondoortype" @cancel="showdoortype = false" />
  </van-popup>

  <!-- 监控设备 -->
  <van-popup v-model:show="showmachine" round position="bottom">
    <van-picker title="监控设备" class="vpicker" :columns="machinearr" @confirm="onmachine" @cancel="showmachine = false" />
  </van-popup>

  <!-- 日期选择 -->
  <van-popup v-model:show="showdatas" round position="bottom">
    <van-datetime-picker
      class="vpicker"
      type="date"
      title="日期选择"
      :min-date="new Date(2023, 0, 1)"
      :max-date="new Date()"
      @confirm="ondatas"
      @cancel="showdatas = false"
    />
  </van-popup>

  <!-- 时间选择 -->
  <van-popup v-model:show="showtimes" round position="bottom">
    <van-datetime-picker
      class="vpicker"
      type="time"
      title="时间选择"
      min-minute="01"
      @confirm="ontimes"
      @cancel="showtimes = false"
    />
  </van-popup>

  <!-- 时间范围选择 开始时间 -->
  <van-popup v-model:show="showparagraph" round position="bottom">
    <van-datetime-picker
      class="vpicker"
      type="time"
      title="开始时间"
      min-minute="01"
      @confirm="onstatime"
      @cancel="showparagraph = false"
    />
  </van-popup>

  <!-- 时间范围选择 结束时间 -->
  <van-popup v-model:show="showendgraph" round position="bottom">
    <van-datetime-picker
      class="vpicker"
      type="time"
      title="结束时间"
      :min-hour="minhour"
      :min-minute="minminute"
      @confirm="onendtime"
      @cancel="showendgraph = false"
    />
  </van-popup>

  <!-- 门店状态 -->
  <van-popup v-model:show="showshopsta" round position="bottom">
    <van-picker title="门店状态" class="vpicker" :columns="shopsta" @confirm="onshopsta" @cancel="showshopsta = false" />
  </van-popup>

  <!-- 支付类型 -->
  <van-popup v-model:show="showpaytype" round position="bottom">
    <van-picker title="支付类型" class="vpicker" :columns="paytypearr" @confirm="onpaytype" @cancel="showpaytype = false" />
  </van-popup>

  <!-- 退款状态 -->
  <van-popup v-model:show="showpaystatus" round position="bottom">
    <van-picker title="退款状态" class="vpicker" :columns="paystatusarr" @confirm="onpaystatus" @cancel="showpaystatus = false" />
  </van-popup>

</template>

<script>
/*
*
* @scrennlist 选择自行需要的类型
* Manager 店长
* region 省市区
* duty 值守人
* doortype 门店类型
* machine 监控设备
* datas 日期选择
* times 时间选择
* paragraph 时间范围选择
*
*/
// import { CollapseInstance } from 'vant'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  emits: ['tegtion'], // 提前声明你要使用的自定义事件
  props: {
    status: {
      type: Boolean,
      default: false
    },
    scrennlist: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      activeNames: [],

      // 店长
      showManager: false, // 店长状态
      Manager: '', // 店长选中
      Managerarr: [], // 店长数组
      // Managerarr: [{ text: '石歧代理', value: 1 }, { text: '东凤代理', value: 2 }, { text: '南区代理', value: 3 }], // 店长数组

      // 省市区
      showregion: false, // 省市区
      region: '', // 省市区
      regionarr: {
        province_list: {},
        city_list: {},
        county_list: {}
      },

      // 值守人
      showduty: false, // 值守人
      duty: '', // 值守人
      dutyarr: [],

      // 门店类型
      showdoortype: false, // 门店类型
      doortype: '', // 门店类型
      doortypearr: [{ text: '云值守', value: 1 }, { text: '云仓', value: 2 }],

      // 监控设备
      showmachine: false,
      machine: '',
      machinearr: [],

      // 日期选择
      showdatas: false, // 日期选择
      datas: '', // 日期选择

      // 时间选择
      showtimes: false, // 时间选择
      times: '', // 时间选择

      // 时间范围选择
      minhour: '0', // 最小时间
      minminute: '01', // 最小分钟
      showparagraph: false, // 时间范围选择 开始时间
      showendgraph: false, // 时间范围选择 结束时间
      paragraph: '', // 时间范围选择

      // 门店状态
      showshopsta: false,
      staname: '',
      shopsta: [{ text: '启用', value: 1 }, { text: '禁用', value: 2 }],

      // 支付类型
      showpaytype: false,
      paytypename: '',
      paytypearr: [
        { text: '微信支付', value: 1 },
        { text: '支付宝支付', value: 2 },
        { text: '通联支付', value: 3 },
        { text: '京东收银', value: 4 },
        { text: '提货码', value: 5 }
      ],

      // 退款状态
      showpaystatus: false,
      paystatusname: '',
      paystatusarr: [{ text: '未退款', value: 1 }, { text: '已退款', value: 2 }, { text: '退款失败', value: 3 }],

      info: {} // 返回的数据

    }
  },
  setup () {
    onBeforeMount(() => {
      const Current = getCurrentInstance()
      Current.ctx.getaddres()
    })
  },
  methods: {

    getaddres () {
      const inventory = JSON.parse(localStorage.getItem('store'))
      const list = {}
      for (const item of this.province.iosProvinces) {
        list.[item.id] = item.value
      }
      if (inventory != null) {
        this.machinearr = []
        for (const item of inventory) {
          this.machinearr.push({
            text: item.hardware_name,
            value: item.hardware_number
          })
        }
      }
      this.regionarr.province_list = list
    },

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
      let provinceid = ''
      let cityid = ''
      let areaid = ''
      if (e.length != 0) {
        this.region = ''
        for (const item in e) {
          if (item == e.length - 1) {
            this.region += e[item] == undefined ? '' : e[item].name
          } else {
            this.region += e[item].name + '/'
          }
        }
        provinceid = this.province.iosProvinces.find(item => (item.id * 1) === (e[0].code * 1)).city_id
        cityid = this.province.iosCitys.find(item => (item.id * 1) === (e[1].code * 1)).city_id
        areaid = ''
        if (e[2] != undefined) {
          areaid = this.province.iosCountys.find(item => (item.id * 1) === (e[2].code * 1)).city_id
        }
        this.info.region = [provinceid, cityid, areaid]
      }
      this.showregion = false
      this.integration()
    },

    // 选中店长
    onManager (e) {
      this.showManager = false
      this.Manager = e.text
      this.info.Manager = e.value
      this.integration()
    },

    // 值守人
    onduty (e) {
      this.showduty = false
      this.duty = e.text
      this.info.duty = e.value
      this.integration()
    },

    // 门店类型
    ondoortype (e) {
      this.showdoortype = false
      this.type = e.text
      this.info.type = e.value
      this.integration()
    },

    // 监控设备
    onmachine (e) {
      this.showmachine = false
      this.machine = e.text
      this.info.machine = e.value
      this.integration()
    },

    // 日期选择
    ondatas (e) {
      this.showdatas = false
      const FullYear = e.getFullYear()
      let Month = e.getMonth() + 1
      let Dates = e.getDate()
      Month = Month <= 9 ? '0' + Month : Month
      Dates = Dates <= 9 ? '0' + Dates : Dates
      this.datas = FullYear + '/' + Month + '/' + Dates
      this.info.datas = this.datas
      this.integration()
    },

    // 时间选择
    ontimes (e) {
      this.showtimes = false
      this.times = e
      this.info.times = this.times
      this.integration()
    },

    // 开始时间
    onstatime (e) {
      this.showparagraph = false
      this.info.paragraph = [e]
      this.showendgraph = true
      const time = e.split(':')
      this.minhour = time[0]
      this.minminute = time[1]
    },

    // 结束时间
    onendtime (e) {
      this.showendgraph = false
      this.info.paragraph.push(e)
      this.paragraph = this.info.paragraph[0] + '~' + this.info.paragraph[1]
      this.integration()
    },

    // 门店状态
    onshopsta (e) {
      this.showshopsta = false
      this.staname = e.text
      this.info.status = e.value
      this.integration()
    },

    // 支付类型
    onpaytype (e) {
      this.showpaytype = false
      this.paytypename = e.text
      this.info.payment_type = e.value
      this.integration()
    },

    // 退款状态
    onpaystatus (e) {
      this.showpaystatus = false
      this.paystatusname = e.text
      this.info.refund_status = e.value
      this.integration()
    },

    integration () {
      if (this.status) {
        this.activeNames = []
      }
      this.$emit('tegtion', this.info)
    }

  }
}
</script>
<style lang="scss" scoped>

.coll{
  --van-collapse-item-content-background-color: #fafafa;
  --van-collapse-item-title-disabled-color:#fafafa;
  // width: 94%;
  // margin-left: 3%;
}

.collapse{
  --van-collapse-item-content-padding:6px 10px;
  --van-collapse-item-content-font-size:12px;
}

.vcell{
  --van-cell-horizontal-padding: 10px;

  // --van-cell-vertical-padding:8px;

  --van-cell-label-line-height:20px;

  --van-cell-line-height:20px;

  white-space: nowrap;
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

</style>
<style type="text/css">
.coll .van-collapse-item .van-cell{
  background: #fafafa;
  /* font-size: 12px; */
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
}
.van-cell:after{
  border-bottom: 0;
}
</style>
