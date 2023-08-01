<template>

  <div class="hardwareinfo">
    <van-cell-group inset>
      <van-field autocomplete="off" class="vinput" label="设备名称" v-model="hardware.hardware_name" placeholder="请输入设备名称" input-align="right"/>

      <van-field autocomplete="off" class="vinput" is-link readonly label="硬件类型" v-model="info.type" placeholder="请输入硬件类型" input-align="right" @click="showtype = true"/>

      <van-field autocomplete="off" class="vinput" label="硬件编号" v-model="hardware.hardware_number" placeholder="请输入硬件编号" input-align="right"/>

      <van-field autocomplete="off" class="vinput" is-link readonly label="设备状态" v-model="info.status" placeholder="请输入设备状态" input-align="right" @click="showstatus = true"/>
    </van-cell-group>

    <div class="vanbtn">
      <van-button class="vbut" type="primary" round color="#D7000F" @click="submit">保存</van-button>
    </div>

  </div>

  <!-- 硬件类型 -->
  <van-popup v-model:show="showtype" round position="bottom">
    <van-picker title="硬件类型" class="vpicker" :columns="hardwaretype" @confirm="onhardwaretype" @cancel="showtype = false" />
  </van-popup>

  <!-- 设备状态 -->
  <van-popup v-model:show="showstatus" round position="bottom">
    <van-picker title="设备状态" class="vpicker" :columns="hardwarestatus" @confirm="onhardwarestatus" @cancel="showstatus = false" />
  </van-popup>

</template>

<script>
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  emits: ['ware'], // 提前声明你要使用的自定义事件
  props: {
    infos: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      showtype: false,
      showstatus: false,
      hardwaretype: [
        { text: '电子锁', value: '1' },
        { text: '密码锁', value: '2' },
        { text: 'UPS', value: '3' },
        { text: '拾音器', value: '4' },
        { text: '扬声器', value: '5' },
        { text: '反扫器', value: '6' },
        { text: '小票机', value: '7' },
        { text: '摄像头', value: '8' }
      ],
      hardwarestatus: [
        { text: '启用', value: '1' },
        { text: '禁用', value: '2' }
      ],
      info: {
        type: '电子锁',
        status: '启用'
      },
      hardware: {
        hardware_name: '',
        hardware_type: '1',
        hardware_number: '',
        status: '1'
      }
    }
  },
  setup (props) {
    onBeforeMount(() => {
      const Current = getCurrentInstance()
      // 有数据传入 = 修改
      if (props.infos.sh_id) {
        Current.data.hardware = props.infos
        Current.data.info.type = props.infos.typecolor.value
        Current.data.info.status = props.infos.status == 1 ? '启用' : '禁用'
      }
    })
    return {}
  },
  methods: {
    // 硬件类型
    onhardwaretype (e) {
      this.hardware.hardware_type = e.value
      this.info.type = e.text
      this.showtype = false
    },

    // 设备状态
    onhardwarestatus (e) {
      this.hardware.status = e.value
      this.info.status = e.text
      this.showstatus = false
    },

    // 保存
    submit () {
      if (this.hardware.hardware_name == '') {
        this.$toast('请输入设备名称')
        return
      }
      if (this.hardware.hardware_number == '') {
        this.$toast('请输入硬件编号')
        return
      }

      this.$emit('ware', this.hardware)
    }

  }
}
</script>
<style lang="scss" scoped>
.hardwareinfo{
  border-radius: 4px;
  margin-bottom: 10px;
  .vinput{
    background-color: #f2f2f2;
    padding-left: 6px;
    padding-right: 6px;
  }
}

.vanbtn{
  background-color: #f2f2f2;
  text-align: center;
  padding-bottom: 30px;
  padding-top: 60px;
  .vbut{
    width: 70%;
  }
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

</style>
