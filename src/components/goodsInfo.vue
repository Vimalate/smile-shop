<template>
  <div class="goods-info" @click="goGoods">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "../utils/fitler";
export default {
    props:['goodsPrice','goodsName','goodsImage','goodsId'],
  data() {
    return {};
  },
  filters:{
       moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    goGoods() {
      this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
    }
  },
};
</script>
<style lang='scss' scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>