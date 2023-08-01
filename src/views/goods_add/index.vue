<template>
  <div>

    <!-- 导航栏 -->
    <Navbar :navShow="true" title="添加商品" :arrow="true"/>

    <!-- 商品信息 -->
    <Goodsinfo @goods="addgood" />

    <Loadin :loading_status="loading_status" />

  </div>

</template>

<script>
import { addgoods } from '@/api/goods'

import Navbar from '@/components/Navbar'
import Goodsinfo from '@/components/Goodsinfo'

export default {
  components: { Navbar, Goodsinfo },
  data () {
    return {
      loading_status: false, // 加载弹窗
      status: true
    }
  },
  methods: {
    addgood (e) {
      if (!this.status) {
        this.$toast('提交中...请勿重复提交')
        return
      }
      this.loading_status = true
      this.status = false

      const data = {
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
      addgoods(data).then(res => {
        this.loading_status = false
        if (res.state == 200) {
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
