<template>
  <div>

    <div class="vgoodsinfo">
      <!-- 商品管理 -->
      <div v-if="source == 'goods'">
        <van-cell-group inset>

          <div class="uplos">
            <uploaders
              :shopimg="false"
              :fullimg="false"
              :deletable="false"
              :imgurl="goods.files[0] == undefined ? '' : goods.files[0].url"
              text="上传图片"
              :size="2048"
              folder="goods_img"
              :types="1"
              @uploading="uploading"
              @upurl="upurl"
            />
            <div class="uplod_tips">
              <div class="tips_one">建议上传图片1:1比例</div>
              <div>图片大小不能超过2M</div>
            </div>
          </div>

          <van-field autocomplete="off" class="vinput" label="商品名称" v-model="goods.goods_name" placeholder="请输入商品名称" input-align="right"/>
          <van-field autocomplete="off" class="vinput" label="商品条形码" v-model="goods.bar_code" placeholder="请输入商品条形码" input-align="right"/>
          <van-field autocomplete="off" class="vinput" is-link readonly label="商品分类" v-model="goods.gc_name" placeholder="请选择商品分类" input-align="right" @click="showPicker = true" />
          <van-field autocomplete="off" class="vinput" is-link readonly label="商品状态" v-model="goods.status_name" placeholder="请选择商品状态" input-align="right" @click="showstatus = true" />
          <van-field autocomplete="off" class="vinput" is-link readonly label="商品类别" v-model="goods.public_name" placeholder="请选择商品类别" input-align="right" @click="showprivate = true" />
          <van-field autocomplete="off" class="vinput" label="保质期" type="number" v-model="goods.sell_by_date" placeholder="请输入保质期天数" input-align="right"/>
          <van-field autocomplete="off" class="vinput" label="商品进价" type="number" v-model="goods.cost_price" placeholder="请输入商品进价" input-align="right"/>
          <van-field autocomplete="off" class="vinput" label="商品售价" type="number" v-model="goods.retail_price" placeholder="请输入商品售价" input-align="right"/>
        </van-cell-group>
      </div>

      <!-- 仓库商品 -->
      <div v-else>
        <van-cell-group inset>
          <van-cell class="vinput vtext" title="ID" :value="goods.wg_id" />
          <van-cell class="vinput vtext" title="商品名称" :value="goods.wg_name" />
          <van-cell class="vinput vtext" title="商品图片">
            <template #right-icon>
              <van-image class="vimg" :src="goods.wg_pic"/>
            </template>
          </van-cell>
          <van-cell class="vinput vtext" title="商品条形码" :value="goods.bar_code" />
          <van-cell class="vinput vtext" title="状态" :value="goods.status_name" />
          <van-cell class="vinput vtext" title="商品库存" :value="goods.stock" />
          <van-cell class="vinput vtext" title="商品进价" :value="goods.cost_price" />
          <van-cell class="vinput vtext" title="商品售价" :value="goods.retail_price" />
          <van-cell class="vinput vtext" title="保质期" :value="goods.sell_by_date" />
          <van-cell class="vinput vtext" title="库存预警" :value="goods.warning_stock" />
          <van-cell class="vinput vtext" title="生产批号" :value="goods.batch_number" />
          <van-cell class="vinput vtext" title="生产日期" :value="goods.manufacture_time" />
        </van-cell-group>
      </div>

    </div>

    <div class="vanbtn" v-if="source == 'goods'">
      <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
    </div>

    <!-- 商品分类 -->
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker title="商品分类" class="vpicker" :columns="goodstype" @confirm="ongoodstype" @cancel="showPicker = false" />
    </van-popup>

    <!-- 商品状态 -->
    <van-popup v-model:show="showstatus" round position="bottom">
      <van-picker title="商品状态" class="vpicker" :columns="goodstatus" @confirm="ongoodstatus" @cancel="showstatus = false" />
    </van-popup>

    <!-- 商品类别 -->
    <van-popup v-model:show="showprivate" round position="bottom">
      <van-picker title="商品类别" class="vpicker" :columns="goodsprivate" @confirm="ongoodsprivate" @cancel="showprivate = false" />
    </van-popup>

    <!-- 商品同步 -->
    <van-popup v-model:show="showsynous" round position="bottom">
      <van-picker title="商品类别" class="vpicker" :columns="goodssynous" @confirm="ongoodssynous" @cancel="showsynous = false" />
    </van-popup>

    <Loadin :loading_status="loading_status" />
  </div>
</template>

<script>

import uploaders from '@/components/Uploader'

import { getcategory } from '@/api/goods'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { uploaders },
  emits: ['goods'], // 提前声明你要使用的自定义事件
  props: {
    types: { // 是否有参数传过来
      type: Boolean,
      default: false
    },
    infos: { // 传过来的数据
      type: Object,
      default: {}
    },
    source: {
      type: String,
      default: 'goods'
    }
  },
  data () {
    return {
      loading_status: false,

      showPicker: false, // 商品分类状态
      showstatus: false, // 商品状态状态
      showprivate: false, // 商品类别状态
      showsynous: false, // 商品同步状态

      goodstype: [], // 商品分类数据
      goodstatus: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 2 }
      ], // 商品状态数据
      goodsprivate: [
        { text: '公用商品', value: 1 },
        { text: '私人商品', value: 2 }
      ], // 商品类别数据

      goodssynous: [ // 商品同步数据
        { text: '修改商品', value: 0 },
        { text: '应用到所有仓库', value: 1 },
        { text: '应用到所有设备', value: 2 }
      ],

      goods: { // 商品信息
        files: [],
        goods_name: '',
        bar_code: '',
        gc_id: '',
        gc_name: '',
        status: '1',
        is_public: '2',
        status_name: '启用',
        public_name: '私人商品',
        synchronous: '修改商品',
        cost_price: '',
        retail_price: '',
        sell_by_date: ''
      }
    }
  },
  setup (props) {
    onBeforeMount(() => {
      const Current = getCurrentInstance()
      Current.ctx.getclass()
      // 有数据传入 = 修改
      if (props.types) {
        Current.data.goods = props.infos
        Current.data.goods.id = 1
        Current.data.goods.synchronous = '修改商品'
      }
    })
    return {}
  },
  methods: {

    getclass () {
      const that = this
      that.goodstype = []
      getcategory().then(res => {
        if (res.state == 200) {
          for (const item of res.data) {
            that.goodstype.push({
              text: item.gc_name,
              value: item.gc_id
            })
          }
        }
        if (res.state == 300) {
          setTimeout(function () {
            that.getclass()
          }, 1000)
        }
      })
    },

    // 商品分类
    ongoodstype (e) {
      this.goods.gc_id = e.value
      this.goods.gc_name = e.text
      this.showPicker = false
    },

    // 商品状态
    ongoodstatus (e) {
      this.goods.status_name = e.text
      this.goods.status = e.value
      this.showstatus = false
    },

    // 商品类别
    ongoodsprivate (e) {
      this.goods.public_name = e.text
      this.goods.is_public = e.value
      this.showprivate = false
    },

    // 商品同步
    ongoodssynous (e) {
      // this.goods.synchronous = e.text
      this.showsynous = false
    },

    // 图片上传状态
    uploading (e) {
      this.loading_status = e
    },

    // 上传成功
    upurl (e) {
      this.goods.files = e
    },

    // 点击提交
    submit () {
      if (this.source == 'goods') {
        if (this.goods.files.length == 0) {
          this.$toast('请上传商品图片')
          return
        }
        if (this.goods.goods_name == '') {
          this.$toast('请输入商品名称')
          return
        }
        if (this.goods.cost_price == 0) {
          this.$toast('请输入商品进价')
          return
        }
        if (this.goods.retail_price == 0) {
          this.$toast('请输入商品售价')
          return
        }
      }
      this.$emit('goods', this.goods)
    }

  }
}
</script>
<style lang="scss" scoped>
.vuploder{
  height: 100px;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}

.vimg{
  width: 80px;
  height: 80px;
}

.vuplodr{
  --van-uploader-size:60px;
  // --van-uploader-delete-icon-size:16px;
  --van-uploader-text-font-size:12px;
}

.vgoodsinfo{
  border-radius: 4px;
  margin-bottom: 10px;
  .uplos{
    background: #f2f2f2;
    padding: 20px 0;
    height: 80px;
    .uplod_tips{
        display: inline-block;
        position: absolute;
        margin-top: 20px;
        color: #D7000F;
        margin-left: 6px;
      .tips_one{
        padding-bottom: 6px;
      }
    }
  }
}

.vinput{
  background-color: #f2f2f2;
  padding-left: 6px;
  padding-right: 6px;
  // width: 337px;
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

.vtext{
  --van-cell-value-color:#323233;
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
