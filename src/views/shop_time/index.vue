<template>
  <Navbar :navShow="true" title="营业时间" :arrow="true"/>

  <div v-for="(item,key) in list" class="shop_time">
    <van-swipe-cell>
      <van-cell :title="key+1 + '.营业时间'" :value="item.statime + ' ~ ' + item.endtime" class="shop_cell" @click="settime(item,key)" />
      <template #right>
        <van-button square  color="#D7000F" text="删除" @click="del(item)" />
      </template>
    </van-swipe-cell>
  </div>

  <!-- 添加时间 -->
  <div class="addtime">
    <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="addtimes"/>
  </div>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <!-- 开始时间 -->
  <van-popup v-model:show="showsta" round position="bottom">
    <van-datetime-picker v-model="pick.statime" class="vpicker" type="time" title="开始时间" :min-hour="0" :max-hour="23" @confirm="statime" @cancel="showsta = false"/>
  </van-popup>

  <!-- 结束时间 -->
  <van-popup v-model:show="showend" round position="bottom">
    <van-datetime-picker v-model="pick.endtime" class="vpicker" type="time" title="结束时间" :min-hour="times.minendhour" :min-minute="times.mindate" :max-hour="23" @confirm="endtime" @cancel="showend = false"/>
  </van-popup>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { setalltime } from '@/util'
import { getopentimeList, addopentime, upopentimedate, delopentime } from '@/api/shop'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      showsta: false,
      showend: false,
      loading_status: false,
      statesTime: '',
      key: '',
      times: {
        minendhour: 0,
        mindate: 0
      },
      pick: {
        sot_id: '',
        store_id: '',
        start_time: '',
        end_time: '',
        statime: '',
        endtime: ''
      },
      list: []
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  methods: {
    obtain () {
      const that = this
      const id = that.$route.query.store_id
      that.loading_status = true
      getopentimeList({ store_id: id, pageNum: 999 }).then(res => {
        that.loading_status = false
        if (res.state == 200) {
          that.list = []
          for (const item of res.data.data) {
            that.list.push({
              sot_id: item.sot_id,
              store_id: item.store_id,
              start_time: item.start_time,
              end_time: item.end_time,
              statime: setalltime(item.start_time, 2, true),
              endtime: setalltime(item.end_time, 2, true)
            })
          }
        }
      })
    },

    // 添加营业时间
    addtimes () {
      if (this.list[this.list.length - 1].id == '') {
        this.$toast('请设置营业时间')
        return
      }
      this.list.push({
        sot_id: '',
        store_id: this.$route.query.store_id,
        start_time: '',
        end_time: '',
        statime: '',
        endtime: ''
      })
    },

    // 点击时间
    settime (e, k) {
      this.key = k
      if (e.sot_id == '') {
        this.pick = {
          sot_id: '',
          store_id: this.$route.query.store_id,
          start_time: '',
          end_time: '',
          statime: '',
          endtime: ''
        }
      } else {
        this.pick = {
          sot_id: e.sot_id,
          store_id: e.store_id,
          start_time: e.start_time,
          end_time: e.end_time,
          statime: e.statime,
          endtime: e.endtime
        }
      }
      this.showsta = true
    },

    // 开始时间 - 确认
    statime (e) {
      this.showsta = false
      this.showend = true
      const time = e.split(':')
      this.times.minendhour = time[0] == '00' ? 0 : time[0]
      this.times.mindate = time[1] == '00' ? 1 : (time[1] * 1) + 1
      this.statesTime = e
    },

    // 结束时间 - 确认
    endtime (e) {
      this.showend = false
      this.loading_status = true
      let data = {}
      const starttime = setalltime(this.statesTime, '', false)
      const endtime = setalltime(e, '', false)
      if (starttime > endtime) {
        this.$toast('请选择正确的营业时间')
        return
      }
      if (this.pick.sot_id == '') {
        data = {
          store_id: this.pick.store_id,
          sot: [{
            start_time: starttime,
            end_time: endtime
          }]
        }
        this.addtime(data)
      } else {
        data = {
          sot_id: this.pick.sot_id,
          store_id: this.pick.store_id,
          start_time: starttime,
          end_time: endtime
        }
        this.uptime(data)
      }
      this.list[this.key].statime = this.statesTime
      this.list[this.key].endtime = e
      this.times.minendhour = 0
      this.times.mindate = 0
      //
    },

    // 添加营业时间
    addtime (data) {
      addopentime(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.obtain()
        }
      })
    },

    // 修改营业时间
    uptime (data) {
      upopentimedate(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          this.obtain()
        }
      })
    },

    // 删除时间
    del (e) {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除营业时间，是否继续删除' })
        .then(() => {
          if (e.id == '') {
            const id = that.list.findIndex(item => {
              if (item.id == '') {
                return true
              }
            })
            that.list.splice(id, 1)
          } else {
            delopentime({ sot_id: e.sot_id }).then(res => {
              if (res.state == 200) {
                that.obtain()
                return
              }
              that.$toast(res.msg)
            })
          }
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
.shop_time{
  width: 94%;
  margin-left: 3%;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;

  --van-cell-background-color:#fafafa;
}
.shop_cell{
  font-size: 12px;
}
.addtime{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 20px;
  .vbtnicon{
    width: 48px;
    height: 48px;
    --van-button-icon-size:20px;
  }
}

.vpicker{
  --van-picker-confirm-action-color:#D7000F;
}

</style>
