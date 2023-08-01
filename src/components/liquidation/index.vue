<template>

  <div class="vgoodsinfo">
    <van-cell-group inset >
      <van-cell class="vinput vtext" title="ID" :value="item.wg_id" />
      <van-cell class="vinput vtext" title="商品名称" :value="item.wg_name || item.goods_name" />
      <van-cell class="vinput vtext imgs" title="商品图片">
        <template #right-icon>
          <van-image width="70" :src="item.wg_pic || item.goods_pic"/>
        </template>
      </van-cell>
      <van-cell class="vinput vtext" title="条形码" :value="item.bar_code" />
      <van-cell class="vinput vtext" title="生产批号" :value="item.batch_number" />
      <van-cell class="vinput vtext" title="系统库存" :value="item.stock" />
      <van-field autocomplete="off" class="vinput" :readonly="status" type="number" label="实际库存" v-model="item.actual_stock" placeholder="请输入实际库存" input-align="right"/>
      <van-field autocomplete="off" class="vinput" is-link readonly label="商品状态" v-model="item.expire_name" placeholder="请选择商品状态" input-align="right" @click="status ? '' : showgstatus(item)" />
      <van-cell v-if="item.expire == '1'" is-link readonly class="vinput" title="过期日期" :value="item.overdue_time" input-align="right" @click="ovtiem(item)" />
      <van-field autocomplete="off" class="vinput vtext" is-link readonly label="库存状态" v-model="item.status_name" placeholder="请选择库存状态" input-align="right" @click="status ? '' : showgtype(item)" />
      <van-field autocomplete="off" v-if="item.status != 1" :readonly="status" class="vinput" type="number" :label="item.status == 2 ? '少货数量' : '多货数量'" v-model="item.num" placeholder="请输入货数量" input-align="right"/>
    </van-cell-group>
  </div>

  <!-- 商品状态 -->
  <van-popup v-model:show="showstatus" round position="bottom">
    <van-picker title="商品状态" class="vpicker" :columns="goodstatus" @confirm="ongoodstatus" @cancel="showstatus = false" />
  </van-popup>

  <!-- 商品过期 -->
  <van-popup v-model:show="showtime" round position="bottom">
    <van-datetime-picker type="date" class="vpicker" title="选择过期日期" :min-date="new Date(2022, 0, 1)" :max-date="new Date()" @confirm="onsettime" @cancel="showtime = false"/>
  </van-popup>

  <!-- 库存状态 -->
  <van-popup v-model:show="showtype" round position="bottom">
    <van-picker title="库存状态" class="vpicker" :columns="goodstype" @confirm="ongoodstype" @cancel="showtype = false" />
  </van-popup>

</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showstatus: false, // 商品状态
      showtype: false, // 库存状态
      showtime: false, // 商品过期
      goodstatus: [
        { text: '未过期', value: '0' },
        { text: '已过期', value: '1' }
      ],
      goodstype: [ // 库存状态
        { text: '正常', value: 1 },
        { text: '少货', value: 2 },
        { text: '多货', value: 3 }
      ],
      items: {}
    }
  },
  methods: {

    // 商品状态
    showgstatus (e) {
      this.items = e
      this.showstatus = true
    },

    // 商品状态
    ongoodstatus (e) {
      this.items.expire_name = e.text
      this.items.expire = e.value
      this.showstatus = false
    },

    // 商品过期
    ovtiem (e) {
      this.items = e
      this.showtime = true
    },

    onsettime (e) {
      const year = e.getFullYear()
      let month = e.getMonth() + 1
      let date = e.getDate()
      month = month <= 9 ? '0' + month : month
      date = date <= 9 ? '0' + date : date
      this.items.overdue_time = year + '-' + month + '-' + date
      this.items.overdue = new Date(this.items.overdue_time).getTime() / 1000
      this.showtime = false
    },

    // 库存状态
    showgtype (e) {
      this.items = e
      this.showtype = true
    },

    // 库存状态
    ongoodstype (e) {
      this.items.status_name = e.text
      this.items.status = e.value
      this.showtype = false
    }

  }
}
</script>
<style lang="scss" scoped>
.vgoodsinfo{
  margin-bottom: 10px;
}

.vinput{
  background-color: #fafafa;
}

.vtext{
  --van-cell-value-color:#323233;
}

.imgs{
  height: 80px;
  line-height: 60px;
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

</style>
