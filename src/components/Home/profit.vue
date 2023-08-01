<template>
  <div class="whole">

    <van-row class="whole_top">
      <van-col span="12" :class="type == 1 ? 'ranking' : ''" @click="type = 1">门店排行榜</van-col>
      <van-col span="12" :class="type == 2 ? 'ranking' : ''" @click="type = 2">商品销售排行榜</van-col>
    </van-row>

    <div class="whole_info">
      <div v-if="type == 1">
        <van-empty v-if="info.store.length == 0" description="查无信息" />
        <van-cell-group v-else class="groups">
          <van-cell v-for="(item,index) in info.store" class="cell_list" :border="false">
            <template #icon>
              <van-icon v-if="index <= 2" name="medal-o" :class="index == '0' ? 'icons_class gold_medal' : index == 1 ? 'icons_class silver_medal' : 'icons_class bronze_medal'"/>
              <div v-else class="ranking_num">{{ index +1 }}</div>
            </template>
            <template #title><div class="name">{{ item.store_name }}</div></template>
            <template #value><span class="money_color"><span class="money_icon">￥</span>{{ item.totalSale }}</span></template>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-if="type == 2">
        <van-empty v-if="info.goods.length == 0" description="查无信息" />
        <van-cell-group v-else class="groups">
          <van-cell v-for="(item,index) in info.goods" class="cell_list" :border="false">
            <template #icon>
              <van-icon v-if="index <= 2" name="medal-o" :class="index == '0' ? 'icons_class gold_medal' : index == 1 ? 'icons_class silver_medal' : 'icons_class bronze_medal'"/>
              <div v-else class="ranking_num">{{ index +1 }}</div>
            </template>
            <template #title><div class="name">{{ item.goods_name }}</div></template>
            <template #value><span class="money_color"><span class="money_icon">￥</span>{{ item.totalSale }}</span></template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    info:{
      type:Object,
      default:{
        store:[],
        goods:[]
      }
    }
  },
  data () {
    return {
      type:1
    }
  },
  methods: { }
}
</script>

<style lang="scss" scoped>
.whole{
  width: 86%;
  margin-left: 5%;
  background: #fafafa;
  padding: 8px 2%;
  border-radius: 4px;
  // min-height: 490px;
  margin-bottom: 15px;
  .whole_top{
    border: 1px solid #D7000F;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    font-size: 14px;
  }
  .whole_info{
    padding-top: 10px;
  }
}
.groups{
  --van-cell-background-color:#fafafa
}
.cell_list{
  --van-cell-value-color:#323233;
  .name{
    white-space: nowrap;
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .money_color{
    color: #D7000F;
    .money_icon{
      font-size: 12px;
    }
  }
  .ranking_num{
    width: 20px;
    text-align: center;
    color: #bbb;
  }
}

.icons_class{
  font-size: 20px;
  line-height: 24px;
}

.gold_medal{
  color:#D7000F;
}

.silver_medal{
  color: #E6A23C;
}

.ranking{
  background: #D7000F;
  color: #fafafa;
}



</style>
<style type="text/css">
[class*=van-hairline]:after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid var(--van-border-color);
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
}
</style>
