<template>
  <div>
    <!-- 导航栏 -->
    <Navbar :navShow="true" title="商品分类" :arrow="true"/>

    <van-list v-model:loading="loading" :finished="finished" offset="20" :immediate-check="false" @load="onLoad">
      <van-cell v-for="item in list" :key="item" class="vcell">
        <van-swipe-cell>
          <div class="goods" @click="godsclas(item,'1')">
            <div class="goods_class_id">{{ item.gc_id }}</div>
            <div class="goods_class">
              <div class="goods_class_info">
                <div>名称：<span class="class_text">{{ item.gc_name }}</span></div>
                <div>排序：<span class="class_text">{{ item.sort }}</span></div>
                <div>创建时间：<span class="class_text">{{ gettimes(item.create_time) }}</span></div>
              </div>
              <div class="goods_class_status">
                <van-tag v-if="item.status == 1" plain type="success">启用</van-tag>
                <van-tag v-else plain color="#D7000F">禁用</van-tag>
              </div>
            </div>
          </div>
          <template #right>
            <van-button square color="#D7000F" text="删除" class="delete-button" @click="det(item)" />
          </template>
        </van-swipe-cell>
      </van-cell>
    </van-list>

    <div style="height: 20px;"></div>

    <van-empty v-if="list.length == 0" description="查无信息" />

    <!-- 添加分类 -->
    <div class="goodscls">
      <van-button round icon="plus" color="#D7000F" class="vbtnicon" @click="godsclas('','2')"/>
    </div>

    <!-- 商品分类 -->
    <van-popup v-model:show="showclass" round class="vpopup" closeable>
      <div class="pop_class">
        <div class="add_class">{{ title }}</div>
        <van-cell-group inset class="groups">
          <van-field autocomplete="off" class="class_inp" v-model="classtype.gc_name" label="名称" placeholder="请输入分类名称" input-align="right" />
        </van-cell-group>

        <van-cell-group inset class="groups">
          <van-field autocomplete="off" class="class_inp" v-model="classtype.sort" type="digit" label="排序" placeholder="请输入分类排序" input-align="right" />
        </van-cell-group>

        <div class="vclass_btn">
          <van-button class="class_btn" round color="#D7000F" @click="submit()">保存</van-button>
        </div>

      </div>
    </van-popup>

  </div>

  <Loadin :loading_status="loading_status" />

</template>

<script>
import Navbar from '@/components/Navbar'

import { getcategory, addcategory, updatecategory, delcategory } from '@/api/goods'
import { parseTime } from '@/util'
import { onBeforeMount, getCurrentInstance } from 'vue'

export default {
  components: { Navbar },
  data () {
    return {
      loading: false, // 加载
      finished: true, // 加载完成，不在调用onload
      showclass: false,
      loading_status: false,
      title: '添加分类',
      classtype: {
        gc_name: '',
        sort: '',
        status: 1
      },
      goodsclas: {
        gc_name: '',
        page: 1,
        pageNum: 15
      },
      list: []
    }
  },
  setup () {
    onBeforeMount(() => {
      getCurrentInstance().ctx.obtain()
    })
    return { }
  },
  methods: {

    obtain () {
      const that = this
      that.loading_status = true

      getcategory(that.goodsclas).then(res => {
        if (res.state == 200) {
          that.loading_status = false
          if (that.goodsclas.page == 1) {
            that.list = res.data.data
          } else {
            that.list = [...that.list, ...res.data.data]
          }
          that.finished = false
          that.loading = false
          if (that.goodsclas.page == res.data.last_page || res.data.last_page == 0) {
            that.finished = true
            that.loading = true
          }
        }
        if (res.state == 300) {
          setTimeout(function () {
            that.obtain()
          }, 1000)
        }
      })
    },

    // 修改分类
    godsclas (e, k) {
      this.title = '修改分类'
      this.showclass = true
      if (k == 2) {
        this.title = '添加分类'

        this.classtype = {
          gc_name: '',
          sort: '',
          status: 1
        }
      } else {
        this.classtype = {
          gc_id: e.gc_id,
          gc_name: e.gc_name,
          sort: e.sort,
          status: e.status
        }
      }
    },

    // 点击保存
    submit () {
      if (this.classtype.gc_id != undefined) {
        updatecategory(this.classtype).then(res => {
          this.goodsclas.page = 1
          this.showclass = false
          this.obtain()
          this.$toast('保存成功')
        })
        return
      }
      addcategory(this.classtype).then(res => {
        this.goodsclas.page = 1
        this.showclass = false
        this.obtain()
        this.$toast('保存成功')
      })
    },

    // 创建时间转换
    gettimes (e) {
      const time = parseTime((e + '000') * 1, '')
      return time
    },

    // 删除分类
    det (e) {
      const that = this
      that.$dialog.confirm({ title: '温馨提示', message: '此操作将永久删除分类信息，是否继续删除' })
        .then(() => {
          delcategory({ gc_id: e.gc_id }).then(res => {
            this.goodsclas.page = 1
            this.showclass = false
            this.obtain()
            this.$toast('删除成功')
          })
        })
        .catch(() => {
          console.log('取消删除')
          // on cancel
        })
    },

    // 加载更多
    onLoad () {
      this.goodsclas.page++
      this.loading_status = true
      this.obtain()
    }
  }
}
</script>
<style>
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
.vpopup{
  --van-popup-round-border-radius:4px;
}
</style>
<style lang="scss" scoped>
.vcell{
  background: #fafafa;
  width: 94%;
  border-radius: 4px;
  padding: 0;
  margin-left: 3%;
  margin-top: 10px;
}
.goods{
  position: relative;
  font-size: 12px;
  .goods_class_id{
    background: #D7000F;
    position: absolute;
    top: 0;
    color: #fafafa;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .goods_class{
    padding: 20px 10px 10px 10px;
    position: relative;
    color: #bbb;
    .goods_class_info{
      display: inline-block;
    }
    .goods_class_status{
      display: inline-block;
      position: absolute;
      right: 10px;
    }
  }
}
.goodscls{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 20px;
}

.vbtnicon{
  width: 48px;
  height: 48px;
  --van-button-icon-size:20px;
}

.pop_class{
  height: 260px;
  width: 260px;
  background: #f2f2f2;
  .add_class{
    height: 50px;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    margin-bottom: 10px;
  }
}

.groups{
  margin-bottom: 20px;
  .class_inp{
    background: #fafafa;
  }
}

.vclass_btn{
  text-align: center;
  .class_btn{
    width: 180px;
    height: 34px;
  }
}

.class_text{
  color: #323233;
}

</style>
