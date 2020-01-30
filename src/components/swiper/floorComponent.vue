<template>
  <div class="floor">
    <div class="floor_title">
      {{floorTitle}}
    </div>
    <div class="floor_anomaly">
      <div class="floor_one">
        <img v-lazy="floorData0.image" width="100%" alt />
      </div>
      <div class="floor_two">
        <div>
          <img v-lazy="floorData1.image" width="100%" alt />
        </div>
        <div>
          <img v-lazy="floorData2.image" width="100%" alt />
        </div>
      </div>
    </div>
    <div class="floor_rule">
      <div v-for="(item, index) in floorData.slice(3)" :key="index">
        <img v-lazy="item.image" width="100%" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData",'floorTitle'],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    };
  },
  mounted() {},
  watch: {
    floorData:function (val) {
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
};
</script>
<style lang='scss' scoped>
.floor {
  .floor_title{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
    color: #e5017d;
  }
  .floor_anomaly {
    display: flex;
    background-color: #fff;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
    div {
      width: 10rem;
      box-sizing: border-box;
    }
    .floor_one {
      border-right: 1px solid #ddd;
    }
    .floor_two {
      border-bottom: 1px solid #ddd;
    }
  }
  .floor_rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
    div {
      width: 10rem;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
    }
    div:nth-child(odd) {
      border-right: 1px solid #ddd;
    }
  }
}
</style>