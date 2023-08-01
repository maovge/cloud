<template>

  <van-sticky :offset-top="46">
    <div class="infos">物联信息</div>
  </van-sticky>

  <div class="vgoodsinfo">
    <van-cell-group inset>
      <van-field autocomplete="off" v-if="ordsta" class="vinput" label="收货人" v-model="info.receiver" placeholder="请选择收货人" input-align="right" is-link readonly @click="showaway = true"/>
      <van-field autocomplete="off" class="vinput" label="联系人" v-model="info.contacts" placeholder="请输入联系人名称" input-align="right"/>
      <van-field autocomplete="off" class="vinput" type="tel" label="联系电话" v-model="info.mobile" placeholder="请输入联系电话" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="省市区" v-model="area" placeholder="请选择省市区" input-align="right" is-link readonly @click="showsynous = true"/>
      <van-field autocomplete="off" class="vinput" label="详细地址" v-model="info.address" placeholder="请输入详细地址" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="物流单号" v-model="info.logistics_no" placeholder="请输入物联单号" input-align="right"/>
      <van-field autocomplete="off" class="vinput" label="备注信息" v-model="info.remark" placeholder="请填写备注信息" input-align="right"/>
    </van-cell-group>
  </div>

  <van-sticky :offset-top="46">
    <div class="infos">
      商品信息
      <span class="add_goods" @click="addgods = true"><van-icon name="plus" />添加商品</span>
    </div>
  </van-sticky>

  <div v-if="goods.length == 0">
    <van-empty description="请选择商品" />
  </div>

  <div v-else>
    <van-cell-group inset v-for="item,index of goods" class="goods_cls">
      <van-field autocomplete="off" class="ginput" readonly label="商品名称" v-model="item.text" input-align="right">
        <template #right-icon>
          <span class="gdel" @click="delet(item.goods_id)">移除</span>
        </template>
      </van-field>
      <van-field autocomplete="off" class="ginput" readonly label="商品图片" input-align="right">
        <template #right-icon>
          <van-image class="vimg" :src="item.pic || item.wg_pic"/>
        </template>
      </van-field>
      <van-field autocomplete="off" class="ginput" readonly label="条形码" v-model="item.bar_code" input-align="right"/>
      <van-field autocomplete="off" class="ginput" readonly label="商品分类" v-model="item.gc_name" input-align="right"/>

      <van-field
				 autocomplete="off"
        class="ginput"
        :readonly="item.goods_if_type == 'goods' ? false : true"
        label="生产批号"
        v-model="item.batch_number"
        input-align="right"
        placeholder="请输入生产批号"
      />

      <van-field
				 autocomplete="off"
        class="ginput"
        is-link
        readonly
        label="生产日期"
        v-model="item.man_time"
        input-align="right"
        placeholder="请选择生产日期"
        @click="showtime(item,index)"
      />

      <van-field autocomplete="off" class="ginput" readonly label="保质期" v-model="item.sell_by_date" input-align="right"/>
      <van-field autocomplete="off" class="ginput" readonly label="当前库存" v-model="item.stock" input-align="right"/>
      <van-field
				autocomplete="off"
        class="ginput"
        :label="ordsta ? '出库数量' : '入库数量'"
        v-model="item.goods_num"
        input-align="right"
        :placeholder="ordsta ? '请输入出库数量' : '请输入入库数量'"
      />

    </van-cell-group>
  </div>

  <div class="vanbtn" v-if="goods.length != 0">
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

  <!-- 商品信息 -->
  <van-popup v-model:show="addgods" round position="bottom">
    <van-picker title="商品信息" class="vpicker" :columns="goodsarrs" @confirm="ongetgoods" @cancel="addgods = false"/>
  </van-popup>

  <!-- 年月日 -->
  <van-popup v-model:show="showtimes" round position="bottom">
    <van-datetime-picker
      class="vpicker"
      type="date"
      :minDate="new Date(2022, 0, 1)"
      :maxDate=" new Date()"
      title="选择生产日期"
      @confirm="onshowtime"
      @cancel="showtimes = false"
    />
  </van-popup>

  <!-- 收货人 -->
  <van-popup v-model:show="showaway" round position="bottom">
    <van-picker title="收货人" class="vpicker" :columns="adduser" @confirm="onuser" @cancel="showaway = false"/>
  </van-popup>

</template>

<script>

import { parseTime } from '@/util'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  emits: ['godslist'], // 提前声明你要使用的自定义事件
  props: {
    ordsta: { // true出库 false入库
      type: Boolean,
      default: false
    },
    goodsarrs: { // 商品信息 goods_if_type: goods 普通商品，wh_goods 仓库商品
      type: Array,
      default: []
    }
  },
  data () {
    return {
      showaway: false, // 收货人
      addgods: false, // 添加商品
      showsynous: false, // 省市区
      showtimes: false, // 选择年月日
      private: {}, // 省市区
      area: '', // 选中的省市区
      goods: [], // 选中的商品
      adduser: [],
      keys: '',
      //   { text: '中山总代理', value: '1' },
      //   { text: '石歧代理', value: '2' },
      //   { text: '街道代理', value: '3' }
      // ],
      info: {
        receiver: '',
        total_quantity: '',
        contacts: '',
        mobile: '',
        province_id: '',
        city_id: '',
        area_id: '',
        address: '',
        logistics_no: '',
        remark: '',
        wgList: []
      }
    }
  },
  setup () {
    onBeforeMount(() => {
      const Current = getCurrentInstance()
      Current.ctx.obtain()
    })
  },
  methods: {
    // 获取省市区
    obtain () {
      const list = {}
      for (const item of this.province.iosProvinces) {
        list.[item.id] = item.value
      }
      this.private.province_list = list
    },
    // 省市区下级
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

    // 选择收货人
    onuser (e) {
      this.info.receiver = e.text
      this.showaway = false
    },

    // 选择省市区
    onprivate (e) {
      if (e.length != 0) {
        this.area = ''
        for (const item in e) {
          if (item == e.length - 1) {
            this.area += e[item] == undefined ? '' : e[item].name
          } else {
            this.area += e[item].name + '/'
          }
        }
        this.info.province_id = this.province.iosProvinces.find(item => (item.id * 1) === (e[0].code * 1)).city_id
        this.info.city_id = this.province.iosCitys.find(item => (item.id * 1) === (e[1].code * 1)).city_id
        this.info.area_id = ''
        if (e[2] != undefined) {
          this.info.area_id = this.province.iosCountys.find(item => (item.id * 1) === (e[2].code * 1)).city_id
        }
      }
      this.showsynous = false
    },

    // 选择商品
    ongetgoods (e) {
      this.addgods = false
      for (const item of this.goods) {
        if (item.goods_if_type == 'wh_goods') {
          if (item.batch_number == e.batch_number) {
            this.$toast('请勿选择重复商品')
            return
          }
        } else {
          if (item.goods_id == e.goods_id) {
            this.$toast('请勿选择重复商品')
            return
          }
        }
      }
      const time = '' || e.manufacture_time
      e.man_time = this.gettimes(time)
      if (e.goods_if_type == 'goods') {
        e.batch_number = ''
        e.stock = 0
      }
      e.goods_num = ''

      this.goods.push(e)
    },

    // 创建时间转换
    gettimes (e) {
      if (e == undefined) {
        return ''
      }
      const time = (parseTime((e + '000') * 1, '')).split(' ')
      return time[0]
    },

    // 移除商品
    delet (e) {
      const id = this.goods.findIndex(item => {
        if (item.goods_id == e) {
          return true
        }
      })
      this.goods.splice(id, 1)
    },

    // 生产日期
    showtime (e, k) {
      if (e.goods_if_type == 'wh_goods') {
        return
      }
      this.keys = k
      this.showtimes = true
    },

    onshowtime (e) {
      const year = e.getFullYear()
      let month = e.getMonth() + 1
      let date = e.getDate()
      month = month <= 9 ? '0' + month : month
      date = date <= 9 ? '0' + date : date
      this.goods[this.keys].man_time = year + '-' + month + '-' + date
      this.goods[this.keys].manufacture_time = new Date(this.goods[this.keys].man_time).getTime() / 1000
      this.showtimes = false
    },

    // 提交保存
    submit () {
      const data = {
        info: this.info,
        goods: this.goods
      }
      console.log(data)
      const toas = {
        contacts: '请输入联系人名称',
        mobile: '请输入联系电话',
        province_id: '请选择省市区',
        address: '请输入详细地址',
        logistics_no: '请输入物流单号'
      }

      // 物联信息
      for (const key in toas) {
        if (data.info[key] == '') {
          this.$toast(toas[key])
          return
        }
      }
      // 商品信息
      for (const item of data.goods) {
        if (this.ordsta) {
          if (item.goods_num * 1 > item.stock * 1) {
            this.$toast('出库商品大于现有商品库存')
            return
          }
        }
        if (item.batch_number == '') {
          this.$toast('请输入生产批号')
          return
        }
        if (item.manufacture_time == '') {
          this.$toast('请选择生产日期')
          return
        }
        if (item.goods_num == '') {
          this.$toast('请输入商品数量')
          return
        }
      }
      this.$emit('godslist', data)
    }

  }
}
</script>
<style lang="scss" scoped>

.infos{
  font-size: 14px;
  padding: 10px;
  font-weight: 550;
  position: relative;
  background: #f2f2f2;
}

.add_goods{
  font-size: 12px;
  color: #D7000F;
  font-weight: initial;
  position: absolute;
  right: 10px;
}

.vgoodsinfo{
  border-radius: 4px;
  margin-bottom: 10px;
}

.vinput{
  background-color: #f2f2f2;
  padding-left: 6px;
  padding-right: 6px;
}

.ginput{
  background-color: #fafafa;
  padding-left: 6px;
  padding-right: 6px;
}

.vimg{
  width: 40px;
  height: 40px;
}

.goods_cls{
  margin-top: 10px;
  margin-bottom: 20px;
}

.gdel{
  color: #D7000F;
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 20px;
}

.vbut{
  width: 70%;
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}
</style>
