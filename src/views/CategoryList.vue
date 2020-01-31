<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="商品类别"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="left_nav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
            <div class="subCategory">
                <van-tabs v-model="acitve">
                    <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                    </van-tab>
                </van-tabs>
            </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../serviceAPI.config";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      acitve:0
    };
  },
  mounted() {
    this.getCategory();
    let winHeight = document.documentElement.clientHeight;
    console.log(document.getElementsByClassName("left_nav"));
    document.getElementById("left_nav").style.height = winHeight - 46 + "px";
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
        // data: { goodsId: this.goodsId }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;
            // 初始进入赋值为第一个分类
            this.getCategorySubByCategoeyId(this.category[0].ID)
          } else {
            Toast("服务器出现错误，获取数据失败！");
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index,categoryId) {
      this.categoryIndex = index;
      this.getCategorySubByCategoeyId(categoryId);
    },
    getCategorySubByCategoeyId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId}
      })
        .then(res => {
             console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.acitve=0
          } else {
            Toast("服务器出现错误，获取数据失败！");
          }
         
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
#left_nav {
  background-color: aliceblue;
  ul li {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 0.2rem;
    font-size: 0.9rem;
  }
}
.categoryActive {
  background-color: #fff;
}
</style>