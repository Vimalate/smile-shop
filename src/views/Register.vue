<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register_panel">
      <van-field
        v-model="username"
        label="用户名"
        clearable
        placeholder="请输入用户名"
        required
      ></van-field>
       <van-field
        v-model="password"
        clearable
        label="密码"
        placeholder="请输入密码"
        required
        type="password"
      ></van-field>
      <div class="register-button">
          <van-button type="primary" size="large">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password:''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
.register_panel{
    width: 96%;
    border-radius: .3rem;
    margin: 1.5rem auto;
    padding-bottom: 3rem;
}
.register-button{
padding-top: .6rem;
}
</style>