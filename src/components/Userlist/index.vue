<template>
<div class="staff_content">
  <div class="staff_top">
    <div class="staff_id">ID: <span class="staff_text">{{ item.sc_id || item.manager_id }}</span></div>
    <div class="staff_type">
      <van-tag v-if="item.clerk_type == 1 || item.status == 1" plain type="success">{{ numtype == 1 || numtype == 3 ? '启用' : '店员' }}</van-tag>
      <van-tag v-if="item.clerk_type == 2 || item.status == 2" plain type="warning">{{ numtype == 1 || numtype == 3 ? '禁用' : '值守人' }}</van-tag>
    </div>
  </div>
  <div class="staff_info">
    <div class="staff_img">
      <van-image width="100%" height="100%" :src="item.pic || require('@/assets/images/staff_user.png')"/>
    </div>

    <div v-if="numtype == 1 || numtype == 3" class="staff_userinfo">
      <div class="staff_hidden">角色名称：<span class="staff_text">{{ item.nickname }}</span></div>
      <div class="staff_hidden">角色账号：<span class="staff_text">{{ item.account }}</span></div>
      <div class="staff_hidden">角色性别：<span class="staff_text">{{ item.sex == 1 ? '保密' : item.sex == 2 ? '男' : '女' }}</span></div>
    </div>

    <div  v-if="numtype == 2" class="staff_userinfo">
      <div class="staff_hidden">门店名称：<span class="staff_text">{{ item.store_name }}</span></div>
      <div class="staff_hidden">店员名称：<span class="staff_text">{{ item.nickname }}</span></div>
      <div class="staff_hidden">联系电话：<span class="staff_text">{{ item.mobile }}</span></div>
    </div>

    <div v-if="password" class="passwords" @click="resetting(item)">重置密码</div>

  </div>
  <div class="staff_bot_info">
    <div class="staff_tiem">创建时间：<span class="staff_text">{{ gettimes(item.create_time) }}</span></div>

    <div v-if="numtype == 1" class="shop_strategy" @click="binure(item)">
      <span class="shop_binding" v-if="item.info == undefined">立即绑定</span>
      <span class="shop_secure" v-else >解除绑定</span>
    </div>

    <div v-if="numtype == 3" class="shop_strategy">
      <span class="staff_text" >详情》</span>
    </div>

  </div>
</div>

</template>

<script>
import { parseTime } from '@/util'
export default {
  emits: ['binure', 'resettings'], // 提前声明你要使用的自定义事件
  props: {
    item: {
      type: Object,
      default: {}
    },
    numtype: { // 1 用户列表 2 店员列表
      type: Number,
      default: 1
    },
    password: { // true 重置密码 false 隐藏重置密码
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    // 绑定/解除绑定
    binure (e) {
      this.$emit('binure', e)
    },

    // 重置密码
    resetting (e) {
      this.$emit('resettings', e)
      event.stopPropagation()
    }

  }
}
</script>
<style lang="scss" scoped>
.staff_content{
  font-size: 12px;
  margin: 0 10px;
  color: #bbb;
  .staff_top{
    border-bottom: 1px solid #bbb;
    position: relative;
    margin-bottom: 10px;
    .staff_id{
      display: inline-block;
    }
    .staff_type{
      display: inline-block;
      position: absolute;
      right: 0;
    }
  }
  .staff_info{
    position: relative;
    .staff_img{
      width: 80px;
      height: 80px;
      display: inline-block;
    }
    .staff_userinfo{
      display: inline-block;
      position: absolute;
      margin: 6px 0 0 10px;
      .staff_hidden{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 180px;
      }
    }
    .passwords{
      position: absolute;
      top: 6px;
      right: 0;
      color: #D7000F;
      border-bottom: 1px solid #D7000F;
      height: 20px;
      line-height: 20px;
    }
  }
  .staff_bot_info{
    position: relative;
    .staff_tiem{
      display: inline-block;
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
  }
}

.staff_text{
  color: #323233;
}
</style>
