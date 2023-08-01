<template>
  <div>

    <!-- 导航栏 -->
    <Navbar :navShow="true" title="硬件配置" :arrow="true"/>

    <!-- 商品信息 -->
    <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
      <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="edit(item)">
        <van-swipe-cell>
          <div class="hard_info">
            <div class="hard_id">{{ item.sh_id }}</div>
            <div class="hard_name_open">
              <div class="hard_name">设备名称：<span class="hard_text">{{ item.hardware_name }}</span></div>
              <div class="hard_open">
                <van-switch
                  v-model="item.status"
                  size="18px"
                  class="vswitch"
                  :active-value="1"
                  :inactive-value="2"
                  active-color="#00C029"
                  inactive-color="#D7000F"
                  @click="edcechk(item,$event)"
                />
              </div>
            </div>
            <div>硬件类型：<van-tag plain :color="item.typecolor.color">{{ item.typecolor.value }}</van-tag></div>
            <div>硬件编号：<span class="hard_text">{{ item.hardware_number }}</span></div>
            <div class="hard_bot">
              <div class="hard_time">创建时间：<span class="hard_text">{{ gettimes(item.create_time) }}</span></div>
              <div class="hard_details hard_text">详情 》</div>
            </div>
          </div>
          <template #right>
            <van-button square color="#D7000F" size="normal" text="删除" class="delete-button" @click="delt(item.sh_id)"/>
          </template>
        </van-swipe-cell>
      </van-cell>
    </van-list>

    <van-empty v-if="list.length == 0" description="查无信息" />

    <div style="height: 20px;"></div>
    <!-- 添加硬件 -->
    <div class="addgoods">
      <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="hardadd"/>
    </div>

  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { gethardwareList, uphardwaredate, delhardware } from '@/api/shop'
import { parseTime } from '@/util'
import { typeoption } from '@/util/type'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: true,
      inven: {
        store_id: '',
        page: 1,
        pageNum: 15
      },
      list: []
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.loading_status = true
      getCurrentInstance().ctx.obtain()
    })
    return {}
  },
  activated () {
    const that = this
    if (!that.loading_status) {
      that.inven.page = 1
      that.obtain()
    }
  },
  methods: {
    // 获取数据
    obtain () {
      const that = this
      // that.loading_status = true
      if (that.inven.store_id == '') {
        const infodata = JSON.parse(localStorage.getItem('store'))
        that.inven.store_id = infodata.store_id
      }
      gethardwareList(that.inven).then(res => {
        that.loading_status = false

        if (res.state == 200) {
          for (const item of res.data.data) {
            item.typecolor = typeoption('hardware_type', [item.hardware_type], true)
          }
          if (that.inven.page == 1) {
            that.list = res.data.data
          } else {
            that.list = [...that.list, ...res.data.data]
          }
          that.finished = false
          that.loading = false
          if (that.inven.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
      })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    // 修改状态
    edcechk (e, event) {
      const that = this
      const data = {
        sh_id: e.sh_id,
        status: e.status
      }
      that.loading_status = true
      uphardwaredate(data).then(res => {
        if (res.state == 300) {
          setTimeout(function () {
            that.edcechk(data, event)
          }, 1000)
          return
        }
        that.loading_status = false
        that.$toast(res.msg)
      })
      event.stopPropagation()
    },

    // 修改信息
    edit (e) {
      const data = {
        info: this.$qs.stringify(e)
      }
      this.$router.push({ path: '/hardware_edit', query: data })
    },

    // 添加硬件
    hardadd () {
      this.$router.push({ path: '/hardware_add' })
    },

    // 删除设备
    delt (e) {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除设备信息，是否继续删除' })
        .then(() => {
          that.loading_status = true
          delhardware({ sh_id: e }).then(res => {
            that.$toast('删除成功')
            this.inven.page = 1
            this.obtain()
          })

          // on confirm
        })
        .catch(() => {
          console.log('取消删除')
          // on cancel
        })
    },

    onLoad () {
      this.inven.page++
      this.loading_status = true
      this.obtain()
    }
  }
}
</script>
<style lang="scss" scoped>
.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 0;
  .hard_info{
    color: #bbb;
    font-size: 12px;
    position: relative;
    padding: 0 16px;
    .hard_id{
      position: absolute;
      left: 0;
      top: 0;
      background: #D7000F;
      min-width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      padding: 0 4px;
      color: #fafafa;
    }
    .hard_name_open{
      padding-top: 16px;
      position: relative;
      .hard_name{
        display: inline-block;
      }
      .hard_open{
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
    .hard_bot{
      position: relative;
      padding-bottom: 10px;
      .hard_time{
        display: inline-block;
      }
      .hard_details{
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

  }
}

.hard_text{
  color: #323233;
}

.addgoods{
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
</style>

<style>
.hard_info {
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
