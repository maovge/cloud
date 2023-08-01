<template>

  <div class="library">

    <div class="lib_top">
      <div class="lib_code">条形码：<span class="lib_color">{{ info.bar_code }}</span></div>
      <div class="lib_time">批号：<span class="lib_color">{{ info.batch_number }}</span></div>
    </div>

    <div class="lib_info">
      <div class="lib_img">
        <van-image class="img" :src="info.wg_pic || info.pic"/>
        <div class="lib_id">{{ info.wg_id }}</div>
      </div>

      <div class="lib_data">
        <div class="lib_color lib_name">
          {{ info.wg_name || info.goods_name }}
        </div>

        <div class="lib_goods" v-if="!library">
          售价 / 进价：
          <span class="lib_icon">￥</span><span class="lib_money">{{ info.retail_price }}</span>
          /
          <span class="lib_icon">￥</span><span class="lib_money">{{ info.cost_price }}</span>
        </div>

        <div v-if="library" class="lib_goods_two">
          商品状态：
          <span :class="info.expire ? 'red_color' : 'succ_color'">{{ info.expire == 1 ? '已过期' : '正常' }}</span>
        </div>

        <div :class="library ? 'lib_goods_two' : 'lib_goods' ">
          {{ library ? '系统库存' : wgtype ? '入库前数量' : '出库前数量' }}：
          <span class="lib_color">{{ info.before_stock || info.stock || 0 }} 件</span>
        </div>
        <div :class="library ? 'lib_goods_two' : 'lib_goods' ">
          {{ library ? '实际库存' : wgtype ? '入库数量' : '出库数量' }}：
          <span class="lib_color">{{ info.quantity || info.actual_stock || 0 }} 件 </span>
          <span v-if="library">
            <span v-if="info.status == 1" style="color: #67C23A;">(正常)</span>
            <span v-if="info.status == 2" style="color: #F56C6C;">(缺货)</span>
            <span v-if="info.status == 3" style="color: #E6A23C;">(多货)</span>
          </span>
        </div>
      </div>

    </div>

    <div class="lib_num">
      <div class="lib_num_code">保质期：<span class="lib_color">{{ info.sell_by_date }}天</span></div>
      <div class="lib_num_time">生产日期：<span class="lib_color">{{ gettimes(info.manufacture_time) }}</span></div>
    </div>

  </div>

</template>

<script>
import { parseTime } from '@/util'
export default {
  props: {
    library: { // true盘点单 false入出库单
      type: Boolean,
      default: false
    },
    wgtype: { //  true入库单 false出库单
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {}
  },
  methods: {
    // 创建时间转换
    gettimes (e) {
      const time = (parseTime((e + '000') * 1, '')).split(' ')

      return time[0]
    }
  }
}
</script>
<style lang="scss" scoped>
.library{
  background: #fafafa;
  width: 94%;
  margin-left: 3%;
  border-radius: 4px;
  margin-top: 10px;
  color: #bbb;
  .lib_top{
    height: 30px;
    border-bottom: 1px solid #ccc;
    width: 90%;
    margin-left: 5%;
    position: relative;
    line-height: 30px;
    .lib_code{
      display:inline-block;
    }
    .lib_time{
      display:inline-block;
      position: absolute;
      right: 0;
    }
  }
  .lib_info{
    position: relative;
    width: 90%;
    margin-left: 5%;
    padding: 10px 0;
    .lib_img{
      display: inline-block;
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 4px;
      position: relative;
      margin-right: 10px;
      .img{
        width: 100%;
        height: 100%;
      }
      .lib_id{
        position: absolute;
        background: #D7000F;
        min-width: 18px;
        text-align: center;
        height: 18px;
        line-height: 18px;
        top: 0;
        color: #fafafa;
      }
    }
    .lib_data{
      display: inline-block;
      position: absolute;
      .lib_name{
        font-size: 14px;
        padding-top: 4px;
      }
      .lib_goods{
        margin-top: 7px;
        .lib_icon{
          font-size: 10px;
        }
        .lib_money{
          font-size: 14px;
          color: #D7000F;
        }
      }
    }
  }
  .lib_num{
    height: 20px;
    width: 90%;
    margin-left: 5%;
    line-height: 20px;
    position: relative;
    white-space: nowrap;
    padding-bottom: 6px;
    .lib_num_code{
      display: inline-block;
    }
    .lib_num_time{
      display: inline-block;
      position: absolute;
      right: 0;
    }
  }

}

.lib_color{
  color: #323233;
}

.red_color{
  color: #D7000F;
}

.succ_color{
  color: #67C23A;
}

.lib_goods_two{
  height: 18px;
  line-height: 18px;
}

</style>
