<template>

  <div class="shop_list">

    <div class="shop_top">
      <div class="shop_name shop_text">
      {{ item.store_name }}
      </div>
      <div class="shop_code">编号：<span class="shop_text">{{ item.terminal_no }}</span></div>
    </div>

    <div class="shop_info">
      <div class="shop_img">
        <van-image width="100%" height="100%" :src="item.pic || require('@/assets/images/machine.png')"/>
      </div>
      <div class="shop_content">
        <div class="shop_characters">
          <div class="shop_Store">店长：<span class="shop_text">{{ item.store_manager_name || '--' }}</span></div>
          <div :class="item.online == '1' ? 'shop_succ shop_status' : 'shop_red shop_status'">({{ item.online == '1' ? '营业中' : '休息中' }})</div>
        </div>

        <div class="shop_characters">联系人：<span class="shop_text">{{ item.contacts || '--' }}</span></div>
        <div class="shop_characters">联系电话：<span class="shop_text">{{ item.create_time || '--' }}</span></div>
        <div class="shop_characters">门店类型：
          <span class="shop_cloud">
            {{ item.typeone == '1' ? '云值守' : item.typeone == '2' ? '云仓' : '' }}
            {{ item.typetwo == '1' ? '云值守' : item.typetwo == '2' ? '云仓' : '' }}
          </span>
        </div>
      </div>

      <div class="shop_details">
        <div class="shop_address">
          地址：<span class="shop_text">{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address }}</span>
        </div>

        <div v-if="strategy" class="shop_strategy" @click="binure(item)">
          <span class="shop_binding" v-if="item.info == undefined">立即绑定</span>
          <span class="shop_secure" v-else >解除绑定</span>
        </div>

        <div v-else class="shop_goto shop_text">详情 》</div>
      </div>

    </div>

  </div>

</template>

<script>

export default {
  emits: ['binure'], // 提前声明你要使用的自定义事件
  props: {
    item: {
      type: Object,
      default: {}
    },
    strategy: { // true 策略模式、false 门店模式
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    binure (e) {
      this.$emit('binure', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.shop_list{
  font-size: 12px;
  color: #bbb;
  margin: 0 10px;
  .shop_top{
    position: relative;
    height: 26px;
    border-bottom: 1px solid #ccc;
    .shop_name{
      display: inline-block;
    }
    .shop_code{
      display: inline-block;
      position: absolute;
      right: 0;
    }
  }
  .shop_info{
    .shop_img{
      width: 80px;
      height: 80px;
      margin: 10px 10px 10px 0;
      display: inline-block;
    }
    .shop_content{
      display: inline-block;
      position: absolute;
      margin-top: 10px;
      .shop_characters{
        height: 20px;
        line-height: 20px;
        width: 210px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .shop_Store{
          max-width: 160px;
          display: inline-block;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .shop_status{
          display: inline-block;
          position: absolute;
          margin-left: 10px;
        }
      }
    }
    .shop_details{
      height: 26px;
      line-height: 26px;
      position: relative;
      .shop_address{
        display: inline-block;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .shop_strategy{
        display: inline-block;
        position: absolute;
        right: 0;
        .shop_binding{
          color: #323233;
          border-bottom: 1px solid #323233;
        }
        .shop_secure{
          color: #D7000F;
          border-bottom: 1px solid #D7000F;
        }
      }

      .shop_goto{
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
  }
}

.shop_text{
  color: #323233;
}

.shop_cloud{
  color: #409EFF;
}

.shop_succ{
  color: #67C23A;
}

.shop_red{
  color: #909399;
}

</style>
