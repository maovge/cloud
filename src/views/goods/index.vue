<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" title="商品管理" :arrow="true"/>

  <div class="vback">
    <div class="vtabs">
      <!-- 搜索栏 -->
      <Lookup placeholder="请输入商品名称" @look="look"/>
      <!-- 类别选项 -->
      <Category :list="typelist" @drop="drops" />
    </div>
  </div>

  <div style="height: 100px;"></div>

  <!-- 商品信息 -->
  <van-list v-model:loading="loading" :finished="finished" offset="20" @load="onLoad" :immediate-check="false">
    <van-cell v-for="(item,key) in list" :key="key" class="vcell" @click="edit(item)">
      <Goodslist :item="item" :useto="true" :checks="true" :del="true" @checksta="checksta" @delgood="delgood"/>
    </van-cell>
  </van-list>

  <van-empty v-if="list.length == 0" description="查无信息" />

  <div style="height: 20px;"></div>

  <!-- 添加商品 -->
  <div class="addgoods">
    <van-button round type="success" icon="plus" color="#D7000F" class="vbtnicon" @click="goodsadd"/>
  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>

import { getList, update, delgoods, getcategory } from '@/api/goods'

import Navbar from '@/components/Navbar'
import Lookup from '@/components/Lookup'
import Category from '@/components/Category'
import Goodslist from '@/components/Goodslist'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Lookup, Category, Goodslist },
  data () {
    return {
      loading: false,
      finished: true,
      loading_status: true,
      goods: { // 查询字段
        goods_id: '',
        goods_name: '',
        status: '',
        gc_id: '',
        page: 1,
        pageNum: 15
      },
      typelist: { // 类别
        goodstype: {
          name: 'gc_id',
          value: 0,
          list: [{ text: '全部分类', value: 0 }]
        },
        goodsstatus: {
          name: 'status',
          value: 0,
          list: [{ text: '默认状态', value: 0 }, { text: '启用', value: 1 }, { text: '禁用', value: 2 }]
        }
      },
      list: [] // 商品信息
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.loading_status = true
      getCurrentInstance().ctx.obtain()
      getCurrentInstance().ctx.getclass()
    })
    return {}
  },
  activated () {
    const that = this
    if (!that.loading_status) {
      that.goods.page = 1
      that.obtain()
    }
  },
  methods: {

    obtain () {
      const that = this
      getList(that.goods).then((res) => {
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
          return
        }
        that.loading_status = false
        if (res.state == 200) {
          if (that.goods.page == 1) {
            that.list = res.data.data
          } else {
            that.list = [...that.list, ...res.data.data]
          }
          that.finished = false
          that.loading = false
          if (that.goods.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
      }).catch(err => {
        that.$toast('网络连接失败')
      })
    },

    // 获取商品分类
    getclass () {
      getcategory().then(res => {
        this.typelist.goodstype.list = [{ text: '全部分类', value: 0 }]
        for (const item of res.data) {
          this.typelist.goodstype.list.push({
            text: item.gc_name,
            value: item.gc_id
          })
        }
      })
    },

    // 搜索
    look (e) {
      this.goods.goods_name = e
      this.goods.page = 1
      this.obtain()
    },

    // 选择分类
    drops (e) {
      const value = e.value == 0 ? '' : e.value
      this.goods[e.name] = value
      this.goods.page = 1
      this.obtain()
    },

    // 点击修改
    edit (e) {
      const data = {
        info: this.$qs.stringify(e),
        source: 'goods'
      }
      this.$router.push({ path: '/goods_details', query: data })
    },

    // 添加商品
    goodsadd () {
      this.$router.push({ path: '/goods_add' })
    },

    // 删除商品
    delgood (e) {
      delgoods({ goods_id: e }).then(res => {
        if (res.state == 200) this.obtain()
      })
    },

    // 上架下架商品
    checksta (e) {
      const that = this
      that.loading_status = true
      update(e).then(res => {
        if (res.state == 200) {
          that.loading_status = false
          that.$toast('修改成功')
        }
        if (res.state == 300) {
          setTimeout(function () {
            that.checksta(e)
          }, 1000)
        }
      })
    },

    // 底部加载
    onLoad () {
      this.goods.page++
      this.loading_status = true
      this.obtain()
    }

  },

  // 离开页面前注销监控
  beforeUnmount () {
    console.log(this)
  }
}
</script>
<style lang="scss" scoped>
.vback{
  position: fixed;
  width: 100%;
  height: 110px;
  z-index: 1;
  background: #f2f2f2;
  padding-bottom: 10px;
  .vtabs{
    border-radius: 4px;
    overflow: hidden;
  }
}

.vcell{
  background-color: rgb(250, 250, 250);
  margin-bottom: 10px;
  width: 94%;
  margin-left: 3%;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px;
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
