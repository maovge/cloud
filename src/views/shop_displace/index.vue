<template>
  <Navbar :navShow="true" :title="title" :arrow="true"/>

  <div class="vgoodsinfo">
    <van-cell-group inset>
      <div class="uplos">
        <van-image width="100%" height="200" :src="info.goods_pic"/>
      </div>

      <van-field
				autocomplete="off"
        class="vinput"
        label="货架编号"
        type="digit"
        v-model="shenumber"
        :required="status == 3 ? true : false"
        :readonly="status == 3 ? false : true"
        input-align="right"
        placeholder="请输入"
      />

      <van-field
				autocomplete="off"
        :required="status == 1 || status == 3 ? true : false"
        class="vinput"
        :is-link="status == 1 || status == 3 ? true : false"
        readonly
        label="选择商品"
        v-model="info.goods_name"
        input-align="right"
        @click="status == 1 || status == 3 ? showprivate = true : ''"
         placeholder="请选择"
      />

      <!-- <van-field readonly class="vinput" label="商品分类" v-model="info.goods_c_name" input-align="right" /> -->

      <van-field autocomplete="off" required class="vinput" type="number" label="商品售价" v-model="info.retail_price" placeholder="请输入" input-align="right">
        <template #right-icon>￥</template>
      </van-field>

      <van-field autocomplete="off" required class="vinput" type="number" label="商品进价" v-model="info.cost_price" placeholder="请输入" input-align="right">
        <template #right-icon>￥</template>
      </van-field>

      <van-field autocomplete="off" required readonly class="vinput" type="digit" label="商品库存" v-model="info.stock" placeholder="请输入" input-align="right">
        <template #right-icon>件</template>
      </van-field>

      <van-field autocomplete="off" required class="vinput" type="digit" label="商品预警" v-model="info.warning_stock" placeholder="请输入" input-align="right">
        <template #right-icon>件</template>
      </van-field>

      <van-field autocomplete="off" required class="vinput" type="digit" label="保质期" v-model="info.sell_by_date" placeholder="请输入" input-align="right">
        <template #right-icon>天</template>
      </van-field>

      <van-field autocomplete="off" v-if="info.goods_id" class="vinput" label="生产日期" v-model="times" readonly input-align="right"/>

      <van-field autocomplete="off" v-if="info.goods_id" class="vinput" label="生产批号" v-model="info.batch_number" readonly input-align="right"/>

      <van-field autocomplete="off" v-if="info.goods_id" class="vinput" label="商品条形码" v-model="info.bar_code" readonly input-align="right"/>

    </van-cell-group>
  </div>

  <div class="vanbtn">
    <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
  </div>

  <!-- 商品信息 -->
  <van-popup v-model:show="showprivate" round position="bottom">
    <van-picker title="商品信息" class="vpicker" :columns="goodslist" @confirm="ongoodslist" @cancel="showprivate = false" />
  </van-popup>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { getgoodsList } from '@/api/inventory'
import { changeGoods, upshelvesdate, addshelves } from '@/api/shop'
import { parseTime } from '@/util'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      showprivate: false,
      loading_status:false,
      status: '1',
      title: '更换商品',
      ids:'',
      shenumber:'',
      times:'',
      info: {},
      goodslist: []
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
      this.loading_status = true
      const data = this.$qs.parse(this.$route.query.info)
      this.shenumber = data.shelves_number || ''
      this.ids = data.ss_id || ''
      this.arrange(data)

      if (this.$route.query.status == '2') {
        this.status = '2'
        this.title = '货架详情'
        this.loading_status = false
        return
      }

      if(this.$route.query.status == '3'){
        this.status = '3'
        this.title = '添加商品'
      }

      getgoodsList().then(res=>{
        this.loading_status = false
        if(res.state == 200){
          for(let item of res.data){
            item.text = item.batch_number + ' - ' + item.wg_name
            item.value = item.wg_id
          }
          this.goodslist = res.data
        }
      })
    },

    // 选择商品
    ongoodslist (e) {
      this.showprivate = false
      this.arrange(e)
    },

    // 数据整理
    arrange(e){
      this.info = {
        goods_id: e.goods_id,
        wg_id: e.wg_id,
        goods_name: e.goods_name || e.wg_name,
        goods_c_id: e.goods_c_id || e.gc_id,
        goods_c_name: e.goods_c_name || e.gc_name,
        goods_pic: e.goods_pic || e.wg_pic,
        cost_price: e.cost_price,
        retail_price: e.retail_price,
        stock: e.stock || 0,
        warning_stock:e.warning_stock,
        bar_code:e.bar_code,
        batch_number: e.batch_number,
        manufacture_time: e.manufacture_time,
        sell_by_date: e.sell_by_date
      }

      let time = e.manufacture_time
      if(time == 0){
        time = e.create_time
      }
      if(time != undefined){
        this.times = (parseTime(( time + '000') * 1, '').split(' '))[0]
      }
    },

    // 点击保存
    submit () {

      let data = {
        goods_name:'请选择商品',
        retail_price: '请输入商品售价',
        cost_price: '请输入商品进价',
        // stock:'请输入商品库存',
        warning_stock: '请输入商品预警数量',
        sell_by_date: '请输入商品保质期',
      }

      if(this.shenumber == '' || this.shenumber == undefined){
        this.$toast('货架编号不能为空')
        return
      }

      for(let item in data){
        if(this.info[item] == '' || this.info[item] <= 0 || this.info[item] == undefined){
          this.$toast(data[item])
          return
        }
      }

      this.loading_status = true
       // 更换
      if(this.status == '1'){
        this.info.ss_id = this.ids
        changeGoods(this.info).then(res=>{
          this.loading_status = false
          if(res.state == 200){
            this.$toast('保存成功')
            this.$router.back(0)
            return
          }
          this.$toast(res.msg)
        })
        return
      }

      // 修改
      if(this.status == '2'){
        this.info.ss_id = this.ids
        upshelvesdate(this.info).then(res=>{
          this.loading_status = false
          if(res.state == 200){
            this.$toast('保存成功')
            this.$router.back(0)
            return
          }
          this.$toast(res.msg)
        })
      }

      if(this.status == '3'){
        this.info.shelves_number = this.shenumber
        let infos = this.$qs.parse(this.$route.query.info)
        let data = {
          store_id:infos.store_id,
          store_name:infos.store_name,
          ss:[this.info],
        }

        addshelves(data).then(res=>{
          this.loading_status = false
          if(res.state == 200){
            this.$toast('保存成功')
            this.$router.back(0)
            return
          }
          this.$toast(res.msg)
        })
      }


    }




  }
}
</script>

<style lang="scss" scoped>

.vgoodsinfo{
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
  .uplos{
    background: #f2f2f2;
  }
  .vinput{
    background-color: #f2f2f2;
    padding-left: 6px;
    padding-right: 6px;
  }
}

.vanbtn{
  text-align: center;
  padding-bottom: 30px;
  padding-top: 10px;
  .vbut{
    width: 70%;
  }
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

</style>
