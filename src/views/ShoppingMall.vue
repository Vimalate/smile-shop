<template>
  <div>
    <div class="searchBar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" alt width="80%" class="location_icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search_input" />
        </van-col>
        <van-col span="5">
          <van-button round type="warning" size="mini" class="search_button">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 首页轮播 -->
    <div class="swiper_area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(item, index) in bannerPicArray" :key="index">
          <img v-lazy="item.image" alt width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 商品类别 -->
    <div class="type-bar">
      <div v-for="(item, index) in category" :key="index" class="category">
        <img v-lazy="item.image" alt width="90%" />
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner -->
    <div class="adBanner_image">
      <img v-lazy="adBanner" alt width="100%" />
    </div>
    <!-- 商品推荐 -->
    <div class="recommend">
      <div class="recommend_title">商品推荐</div>
      <div class="recommend_body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend_item">
              <img v-lazy="item.image" width="80%" alt />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price|moneyFilter}} (￥{{item.mallPrice|moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!--  -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
             <goods-info :goodsImage='item.image' :goodsName='item.name' :goodsPrice='item.price' :goodsId='item.goodsId'></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import floorComponent from "../components/swiper/floorComponent";
import goodsInfo from "../components/goodsInfo";
import { toMoney } from "../utils/fitler";
import {getShopingMall} from '../serviceAPI.config'
export default {
  data() {
    return {
      locationIcon: require("../assets/images/location.png"),
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods:[],
      category: [],
      adBanner: "",
      bannerPicArray: [],
      recommendGoods: [],
      floorName: {},
      swiperOption: {
        slidesPerView: 3
      }
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  mounted() {
    axios({
      url:getShopingMall,
      method: "get"
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = res.data.data.slides;
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    floorComponent,
    goodsInfo
  }
};
</script>

<style lang='scss' scoped>
.searchBar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search_input {
  width: 100%;
  height: 1.3rem;
  border: none;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
}
.location_icon {
  padding: 0.2rem 0 0 0.3rem;
}
.search_button {
  margin-left: 0.5rem;
}
.swiper_area {
  clear: both;
  max-height: 9rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .category {
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
  }
}
.recommend {
  background-color: #fff;
  margin-top: 0.3rem;
  .recommend_title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #e5017d;
  }
  .recommend_body {
    border-bottom: 1px solid #eee;
  }
  .recommend_item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
}
.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
      .hot-title{
         color: #e5017d;
      }
  }
</style>