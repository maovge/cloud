<template>
 <van-swipe-cell>
    <van-card class="vgoods">

      <template #thumb>
        <van-image width="100%" height="100%" :src="item.pic || item.wg_pic">
          <template v-slot:error>加载失败</template>
        </van-image>
      </template>

      <template #title>
        <div class="goods_title goods_height">{{ item.goods_name || item.wg_name || '--' }}</div>
        <div class="goods_num goods_height" v-if="!useto">
          库存：<span class="goods_text"><span style="color:#D7000F;">{{ item.stock }}</span> 件</span>
        </div>
      </template>

      <template #desc>
        <div class="goods_code goods_height">条形码: <span class="goods_text">{{ item.bar_code || '--' }}</span></div>
        <div class="num goods_height" v-if="!useto">
          生产批号：<span class="goods_text">{{ item.batch_number }}</span>
        </div>
      </template>

      <template #tag>
        <div class="goods_id">{{ useto ? item.goods_id : item.wg_id }}</div>
      </template>

      <template #tags v-if="useto">
        <van-tag plain type="danger" style="margin-right: 6px;">{{ item.is_public == 1 ? '公用' : '私人' }}商品</van-tag>
        <van-tag plain type="danger" v-if="item.gc_name">{{ item.gc_name }}</van-tag>
      </template>

      <template #price>
        <div class="goods_money goods_height"><span class="money_icon">￥</span>{{ item.retail_price }}</div>
      </template>

      <template #footer v-if="checks">
        <van-switch
          v-model="item.status"          :active-value="1"
         :inactive-value="2"
         size="18px"
         class="vswitch"
         active-color="#00C029"
         inactive-color="#D7000F"
         @change="gstatus(item)"
        />
      </template>

      <template #footer v-if="tagicon">
        <div class="vswitch">
          <van-tag v-if="item.status == 1" plain type="success" size="medium">启用</van-tag>
          <van-tag v-else plain color="#D7000F" size="medium">禁用</van-tag>
        </div>

      </template>

    </van-card>
    <template #right v-if="del">
      <van-button square text="删除" color="#D7000F" class="delete-button" @click="delt" />
    </template>
  </van-swipe-cell>
</template>

<script>

export default {
  emits: ['checksta', 'delgood'], // 提前声明你要使用的自定义事件
  props: {
    item: { // 商品信息
      type: Object,
      default: {}
    },
    checks: { // 商品上架下架
      type: Boolean,
      default: false
    },
    del: { // 是否允许删除
      type: Boolean,
      default: false
    },
    useto: { // 用途默认为true，true商品列表，false仓库商品
      type: Boolean,
      default: true
    },
    tagicon: { // 启用禁用tag
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    // 上架下架商品
    gstatus (e) {
      this.$emit('checksta', e)
      event.stopPropagation()
    },

    // 删除商品
    delt () {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除商品信息，是否继续删除' })
        .then(() => {
          this.$emit('delgood', that.item.goods_id)
        })
        .catch(() => {
          console.log('取消删除')
          // on cancel
        })
    }

  }
}
</script>
<style lang="scss" scoped>
.goods_height{
  height: 20px;
  line-height: 20px;
}
.vcsr{
  position: absolute;
  bottom: 0;
  background: #D7000F;
  width: 100%;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: #fafafa;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.goods_title{
  width: 60%;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.goods_num{
  display: inline-block;
  position: absolute;
  right: 10px;
  color: #bbb;
}
.goods_code{
  width: 66%;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #969799;
}
.goods_id{
  font-size: 12px;
  background: #D7000F;
  line-height: 22px;
  min-width: 20px;
  height: 20px;
  text-align: center;
  color: #fafafa;
  position: absolute;
  top: -2px;
  border-top-left-radius: 8px;
}

.vgoods{
  --van-card-padding:6px;
  --van-card-background-color:#fafafa;
}

.vswitch{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.goods_money{
    font-size: 14px;
    color: #D7000F;
  .money_icon{
    font-size: 12px;
  }
}

.goods_text{
  color: #323233;
}

</style>
<style>
.vgoods{
  margin: 0;
  background-color: @white;
}

.delete-button{
  height: 100%;
  right:-1px;
}

.num{
  padding-bottom: 4px;
  color: #969799;
}
</style>
