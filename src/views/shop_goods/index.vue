<template>
  <Navbar :navShow="true" title="货架管理" :arrow="true"/>

 <div class="goods_top_btn">
    <!-- <div class="goods_fill goods_btns" v-if="supplement">一键补满</div> -->
    <div class="goods_btn">
      <div class="goods_cancellation goods_btns" v-if="supplement" @click="supplement = false">取消</div>
      <div class="goods_determine goods_btns" v-if="supplement" @click="submits">确认</div>
    </div>
    <div class="goods_add goods_btns" v-if="!supplement" @click="repairs">补货</div>
  </div>

  <van-list v-model:loading="loading" :finished="finished" offset="20" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="supplement ? '' : details(item)">
      <van-swipe-cell>

        <div class="goods_info_middle">
          <div class="goods_info_top_data">
            <div class="goods_info_top_num">编号：<span class="goods_text">{{ item.shelves_number || '--' }}</span></div>
            <div class="goods_info_top_code">条形码：<span class="goods_text">{{ item.bar_code || '--' }}</span></div>
          </div>
          <div class="goods_info_middle_data">
            <div class="goods_info_middle_img">
              <van-image width="80" height="80" :src="item.goods_pic"/>
            </div>

            <div v-if="!supplement" class="goods_replace goods_reds" @click="displace(item)">更换商品</div>
            <div v-if="supplement" class="goods_nums">剩余库存：<span class="goods_text">{{ item.wg_stock }}</span></div>

            <div class="goods_info_middle_text">
              <div class="goods_name goods_text">{{ item.goods_name }}</div>
              <div class="goods_characters">售价：<span class="goods_reds"><span style="font-size: 10px;">￥</span>{{ item.retail_price }}</span></div>
              <div class="goods_characters">保质期：<span class="goods_text">{{ item.sell_by_date || 0 }} 天</span></div>
              <div class="goods_characters">库存/预警：<span class="goods_text">{{ item.stock || 0 }}</span> 件 / <span class="goods_reds">{{ item.warning_stock || 0 }} </span> 件</div>
            </div>

            <div class="goods_repair" v-if="supplement">
              <van-stepper
                v-model="item.num"
                integer
                :min="-item.stock"
                :disable-plus="item.wg_stock <= 0 ? true : false"
                :disable-input="item.wg_stock <= 0 ? true : false"
                theme="round"
                input-width="30px"
                button-size="18px"
                @plus="increase(item.wg_id)"
                @minus="reduce(item.wg_id)"
                @focus="obtainking(item)"
                @blur="lose(item,item.wg_id)"
              />
            </div>

          </div>
          <div class="goods_info_bottom_data">
            <div class="goods_info_time">生产日期：<span class="goods_text">{{ gettimes(item.manufacture_time) }}</span></div>
            <div class="goods_info_batch">生产批号：<span class="goods_text">{{ item.batch_number }}</span></div>
          </div>
        </div>

        <template #right v-if="!supplement">
          <van-button square text="删除" color="#D7000F" class="delete-button" @click="delt(item.ss_id)" />
        </template>
      </van-swipe-cell>

    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <!-- 添加商品 -->
  <div class="addstaff" v-if="!supplement">
    <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="goodsadd"/>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import Navbar from '@/components/Navbar'

import { parseTime } from '@/util'
import { getshelvesList, delshelves, replenishment } from '@/api/shop'
import { getgoodsList } from '@/api/inventory'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      supplement: false,
      loading: true,
      finished: true,
      loading_status: true,
      ynum: 0,
      info: {},
      list: []
      // cgoodslist:[],
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
      that.obtain()
    }
  },
  methods: {

    obtain () {
      const that = this
      if (that.info.store_id == undefined) {
        const infodata = JSON.parse(localStorage.getItem('store'))
        that.info = infodata
      }
      getshelvesList({ store_id: that.info.store_id }).then(res => {
        that.loading_status = false
        if (res.state == 200) {
          that.list = res.data
          this.getgoods()
        }
      })
    },

    // 获取仓库商品信息
    getgoods () {
      const that = this
      getgoodsList({ status: 1 }).then(res => {
        if (res.state == 200) {
          for (const item of that.list) {
            for (const ime of res.data) {
              if (item.wg_id == ime.wg_id) {
                item.wg_stock = ime.stock
                item.gd_stock = ime.stock
                item.num = 0
              }
            }
          }
        }
      })
    },

    // 点击补货
    repairs () {
      for (const item of this.list) {
        item.num = 0
        item.wg_stock = item.gd_stock
      }
      this.supplement = true
    },

    // 增加库存 减少仓库库存
    increase (e) {
      for (const item of this.list) {
        if (item.wg_id == e) {
          item.wg_stock--
        }
      }
    },

    // 减少库存 增加仓库库存
    reduce (e) {
      for (const item of this.list) {
        if (item.wg_id == e) {
          item.wg_stock++
        }
      }
    },

    // 手动输入 获取焦点
    obtainking (e) {
      this.ynum = e.num
    },

    // 手动输入 失去焦点 item，id
    lose (e, k) {
      let total = 0
      for (const item of this.list) {
        if (item.wg_id == k) {
          total += item.num
        }
      }

      if (total > e.gd_stock) {
        this.$toast('剩余库存不足')
        e.num = this.ynum
      } else {
        const wgstock = e.gd_stock - total
        for (const item of this.list) {
          if (item.wg_id == k) {
            item.wg_stock = wgstock
          }
        }
      }
    },

    // 商品补货
    submits () {
      const arr = []
      for (const item of this.list) {
        if (item.num > 0) {
          arr.push({
            ss_id: item.ss_id,
            quantity: item.num
          })
        }
      }
      if (arr.length == 0) {
        this.supplement = false
        return
      }
      this.loading_status = true
      this.supplement = false
      replenishment({ rep: arr }).then(res => {
        this.loading_status = false
        if (res.state == 200) {
          // this.$toast('补货成功')
          this.obtain()
        }
      })
    },

    // 更换商品
    displace (e) {
      const data = {
        info: this.$qs.stringify(e),
        status: 1
      }
      this.$router.push({ path: '/shop_displace', query: data })
      event.stopPropagation()
    },

    // 修改商品
    details (e) {
      const data = {
        info: this.$qs.stringify(e),
        status: 2
      }
      this.$router.push({ path: '/shop_displace', query: data })
    },

    // 添加商品
    goodsadd () {
      const data = {
        info: this.$qs.stringify({ store_id: this.info.store_id, store_name: this.info.store_name }),
        status: 3
      }
      this.$router.push({ path: '/shop_displace', query: data })
    },

    // 删除商品
    delt (e) {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除货架商品信息，是否继续删除' })
        .then(() => {
          that.loading_status = true
          delshelves({ ss_id: e }).then(res => {
            if (res.state == 200) {
              that.obtain()
            }
          })
        })
        .catch(() => {
          console.log('取消删除')
          // on cancel
        })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    }

  }
}
</script>

<style lang="scss" scoped>
.goods_top_btn{
  position: relative;
  padding: 10px 10px 0 10px;
  height: 24px;
  .goods_fill{
    background: #D7000F;
    color: #fafafa;
  }
  .goods_btn{
    display: inline-block;
    position: absolute;
    right: 10px;
    .goods_cancellation{
      margin-right: 10px;
      background: #bbb;
      color: #fafafa;
    }
    .goods_determine{
      background: #D7000F;
      color: #fafafa;
    }
  }
  .goods_add{
    background: #D7000F;
    color: #fafafa;
    position: absolute;
    right: 10px;
  }
}

.goods_info_middle{
  font-size: 12px;
  color: #bbb;
  padding: 0 4px;
  .goods_info_top_data{
    position: relative;
    border-bottom: 1px solid #ccc;
    .goods_info_top_num{
      display: inline-block;
    }
    .goods_info_top_code{
      display: inline-block;
      position: absolute;
      right: 0;
    }
  }
  .goods_info_middle_data{
    margin-top: 10px;
    position: relative;
    .goods_info_middle_img{
      width: 80px;
      height: 80px;
      display: inline-block;
      margin-right: 10px;
      padding-left: 6px;
    }
    .goods_info_middle_text{
      display: inline-block;
      position: absolute;
      top: 0;
      width: 180px;
      .goods_name{
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        height: 22px;
        line-height: 22px;
      }
      .goods_characters{
        height: 20px;
        line-height: 20px;
      }
    }
    .goods_replace{
      display: inline-block;
      position: absolute;
      right: 10px;
      border-bottom: 1px solid #D7000F;
    }
    .goods_nums{
      display: inline-block;
      position: absolute;
      right: 10px;
    }
    .goods_repair{
      display: inline-block;
      position: absolute;
      right: 10px;
      margin-top: 54px;
    }
  }
  .goods_info_bottom_data{
    position: relative;
    .goods_info_time{
      display: inline-block;
    }
    .goods_info_batch{
      display: inline-block;
      position: absolute;
      right: 10px;
    }
  }

}

.addstaff{
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

.goods_btns{
  display: inline-block;
  width: 80px;
  text-align: center;
  padding: 5px 0;
  border-radius: 25px;
  font-size: 14px;
}

.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
  font-size: 12px;
}

.goods_text{
  color: #323233;
}

.goods_reds{
  color: #D7000F;;
}

</style>

<style type="text/css">
.vcell{
  margin: 0;
  background-color: @white;
}

.delete-button{
  height: 100%;
  right: -1px;
}
</style>
