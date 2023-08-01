<template>

  <!-- 导航栏 -->
  <Navbar :navShow="true" :title="title" :arrow="true"/>

  <!-- 商品信息 -->
  <Goodsinfo :infos="info" :types="true" :source="source" @goods="modifygoods" />

  <Loadin :loading_status="loading_status" />

</template>

<script>
import { update } from '@/api/goods'

import Navbar from '@/components/Navbar'
import Goodsinfo from '@/components/Goodsinfo'

import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar, Goodsinfo },
  data () {
    return {
      loading_status: false, // 加载弹窗
      source: 'goods', // 默认出处商品管理
      title: '添加商品',
      info: {
        files: [],
        goods_name: '',
        bar_code: '',
        gc_id: '',
        status: '启用',
        is_public: '公用商品',
        synchronous: '',
        cost_price: '',
        retail_price: ''
      },
      status: true
    }
  },
  setup () {
    onBeforeMount(() => {
      const Current = getCurrentInstance()
      Current.data.source = Current.ctx.$route.query.source || 'goods'
      if (Current.data.source == 'goods') {
        Current.data.title = '修改商品'
      } else {
        Current.data.title = '商品信息'
      }
      Current.ctx.obtain()
    })
    return {}
  },
  methods: {
    // 获取信息
    obtain () {
      const goods_info = this.$qs.parse(this.$route.query.info)
      this.info = goods_info
      this.info.status_name = this.info.status == 1 ? '启用' : '禁用'
      this.info.public_name = this.info.is_public == 1 ? '公用商品' : '私人商品'
      this.info.files = [{ url: goods_info.pic || goods_info.wg_pic, isImage: true }]
    },

    modifygoods (e) {
      if (!this.status) {
        this.$toast('提交中...请勿重复提交')
        return
      }
      this.loading_status = true
      this.status = false
      const data = {
        goods_id: e.goods_id,
        goods_name: e.goods_name,
        pic: e.files[0].url,
        bar_code: e.bar_code,
        cost_price: e.cost_price,
        retail_price: e.retail_price,
        sell_by_date: e.sell_by_date,
        status: e.status,
        is_public: e.is_public,
        gc_id: e.gc_id,
        gc_name: e.gc_name
      }
      update(data).then(res => {
        if (res.state == 200) {
          this.loading_status = false
          this.status = true
          this.$toast('保存成功')
          this.$router.back(0)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
