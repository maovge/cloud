<template>

  <van-cell-group inset>

    <van-field class="vinput" readonly label="用户头像">
      <template #right-icon>
          <uploaders
            :shopimg="false"
            :fullimg="false"
            :deletable="true"
            :imgurl="item.pic"
            text="上传图片"
            :size="2048"
            folder="manager_pic"
            :types="1"
            @uploading="uploading"
            @upurl="upurl"
          />
      </template>
    </van-field>
    <van-field class="vinput" label="用户昵称：" autocomplete="off" v-model="item.nickname" placeholder="请输入用户昵称" input-align="right"/>
    <van-field class="vinput" is-link readonly label="用户性别：" v-model="item.sexname" placeholder="请输入用户性别" input-align="right" @click="showsexname = true"/>
    <van-field class="vinput" :readonly="typeman == 1 ? false : true" label="登录账号：" autocomplete="off" v-model="item.account" placeholder="请输入登录账号" input-align="right"/>
    <van-field class="vinput" v-if="typeman == 1" label="登录密码：" autocomplete="off" v-model="item.password" placeholder="请输入登录密码" input-align="right"/>
    <van-field class="vinput" is-link readonly label="用户状态：" v-model="item.statusname" placeholder="请输入用户状态" input-align="right" @click="showstatusname = true"/>
    <van-field class="vinput" label="京东收银：" autocomplete="off" v-model="item.bill_account" placeholder="请输入京东收银账号" input-align="right"/>
  </van-cell-group>

  <!-- 用户性别 -->
  <van-popup v-model:show="showsexname" round position="bottom">
    <van-picker title="用户性别" class="vpicker" :columns="sextype" @confirm="onsextype" @cancel="showsexname = false" />
  </van-popup>

  <!-- 用户状态 -->
  <van-popup v-model:show="showstatusname" round position="bottom">
    <van-picker title="用户状态" class="vpicker" :columns="statustype" @confirm="onstatustype" @cancel="showstatusname = false" />
  </van-popup>

</template>

<script>
import uploaders from '@/components/Uploader'

export default {
  emits: ['status'], // 提前声明你要使用的自定义事件
  components: { uploaders },
  props: {
    item: {
      type: Object,
      default: {}
    },
    typeman: { // 1 添加角色 2 修改角色
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      showsexname: false,
      sextype: [
        { text: '保密', value: 1 },
        { text: '男', value: 2 },
        { text: '女', value: 3 }
      ],

      showstatusname: false,
      statustype: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 2 }
      ]
    }
  },
  methods: {
    // 图片上传状态
    uploading (e) {
      this.$emit('status', e)
    },

    // 上传成功
    upurl (e) {
      this.item.pic = e[0].url
    },

    onsextype (e) {
      this.item.sex = e.value
      this.item.sexname = e.text
      this.showsexname = false
    },

    onstatustype (e) {
      this.item.status = e.value
      this.item.statusname = e.text
      this.showstatusname = false
    }

  }
}
</script>
<style lang="scss" scoped>
.vinput{
  background-color: #f2f2f2;
  padding-left: 6px;
  padding-right: 6px;
}
.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}
</style>
