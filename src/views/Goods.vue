<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="商品详情" left-arrow left-text="返回" @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="goodsImg">
      <img v-lazy="goodsInfo.IMAGE1" width="100%" alt />
    </div>
    <div class="goodsName">{{goodsInfo.NAME}}</div>
    <div class="goodsPrice">价格：￥{{goodsInfo.PRESENT_PRICE|moeyFilter}}</div>
    <div>
      <van-tabs swipeable sticky animated>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goBuy">
      <div>
        <van-button type="primary" size="large">加入购物车</van-button>
      </div>
      <div>
        <van-button type="danger" size="large">直接购买</van-button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../serviceAPI.config";
import { Toast } from "vant";
import { toMoney } from "../utils/fitler";

export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} //商品详情
    };
  },
  filters: {
    moeyFilter(money) {
      return toMoney(money);
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("服务器出现错误，获取数据失败！");
          }
          console.log(this.goodsInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
.goodsName,
.goodsPrice {
  background-color: #fff;
}
.detail {
  font-size: 0;
}
.goBuy{
position: fixed;
bottom: 0;
left: 0;
background-color: #fff;
width: 100%;
display: flex;
flex-direction: row;
div{
    flex: 1;
    padding: .2rem;
}
}

</style>