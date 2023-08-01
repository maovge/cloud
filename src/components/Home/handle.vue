<template>
  <div class="whole">
    <div class="wait">
      <van-row>
        <van-col span="8" class="vcol" @click="vcol('1')">
          缺货通知
          <div class="tipsnum">3</div>
        </van-col>
        <van-col span="8" class="vcol vbor" @click="vcol('2')">
          设备异常
          <div class="tipsnum">0</div>
        </van-col>
        <van-col span="8" class="vcol" @click="vcol('3')">
          补扣订单
          <div class="tipsnum">5</div>
        </van-col>
      </van-row>
    </div>
  </div>

</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    // 进入详情
    vcol(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.whole{
  height: 35px;
  background: #D7000F;
  margin-bottom: 50px;
}
.wait{
  background: #fffafa;
  width: 90%;
  margin-left: 5%;
  height: 70px;
  border-radius: 4px;
}
.vcol{
  font-size: 14px;
  height: 50px;
  margin-top: 10px;
  text-align: center;
}
.vbor{
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.tipsnum{
  font-size: 16px;
  margin-top: 10px;
  color: red;
  font-weight: 550;
}
</style>
