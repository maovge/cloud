<template>
  <div class="whole">
  <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :loop="false">
    <van-swipe-item>
      <van-grid class="vgrid" :column-num="4" :border="false" gutter="4px" icon-size="46px" :square="true" >
        <van-grid-item :icon="require('@/assets/images/menu-machine.png')" text="门店管理" @click="goo('/shop')" />
        <van-grid-item :icon="require('@/assets/images/menu-business.png')" text="值守管理" @click="goo('/guard')" />
        <van-grid-item :icon="require('@/assets/images/machine-goods.png')" text="商品管理" @click="goo('/goods')" />
        <van-grid-item :icon="require('@/assets/images/menu-class.png')" text="商品分类" @click="goo('/goods_class')" />
        <van-grid-item :icon="require('@/assets/images/menu-stock.png')" text="库存管理" @click="goo('/inventory')" />
        <van-grid-item :icon="require('@/assets/images/menu-check.png')" text="订单管理" @click="goo('/order_list')" />
        <van-grid-item :icon="require('@/assets/images/machine-clone.png')" text="策略管理" @click="goo('/strategy')" />
        <van-grid-item :icon="require('@/assets/images/menu-role.png')" text="角色管理" @click="goo('/subordinate')" />
      </van-grid>
    </van-swipe-item>
    <van-swipe-item>
      <van-grid class="vgrid" :column-num="4" :border="false" gutter="4px" icon-size="46px" :square="true" >
        <van-grid-item :icon="require('@/assets/images/menu-advert.png')" text="广告管理" url="#" />
        <van-grid-item :icon="require('@/assets/images/menu-withdraw.png')" text="财务管理" url="#" />
        <van-grid-item :icon="require('@/assets/images/machine-goods.png')" text="美团管理" url="#" />
        <van-grid-item :icon="require('@/assets/images/menu-repair.png')" text="基础管理" url="#" />
        <van-grid-item :icon="require('@/assets/images/menu-business.png')" text="数据分析" url="#" />
      </van-grid>
    </van-swipe-item>
  </van-swipe>

  </div>

</template>

<script>
export default {
  props: { },
  data () {
    return { }
  },
  methods: {
    goo (e) {
      this.$router.push({ path: e })
    }
  }
}
</script>

<style lang="scss" scoped>
.whole{
  width: 86%;
  margin-left: 5%;
  background: #fafafa;
  padding: 8px 2%;
  border-radius: 4px;
  height: 170px;
  margin-bottom: 15px;
  .vgrid{
    padding-top: 4px;
    border-radius: 4px;
    height: 166px;
    background: #fafafa;
    --van-grid-item-content-background-color:#fafafa;
  }
}
</style>
