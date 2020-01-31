<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register_panel">
      <van-field v-model="username" label="用户名" clearable placeholder="请输入用户名" required :error-message="userNameErrorMsg"></van-field>
      <van-field
        v-model="password"
        clearable
        label="密码"
        placeholder="请输入密码"
        required
        type="password"
        :error-message="passwordErrorMsg"
      ></van-field>
      <div class="register-button" @click="registerAction">
        <van-button type="primary" size="large" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import url from "../serviceAPI.config";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false,
      userNameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction(){
        this.checkForm()&&this.axiosRegisterUser()
    },
    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            Toast.success("注册成功！");
            this.$router.push("/");
          } else {
            Toast.fail("注册失败！");
            this.openLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.openLoading = false;
        });
    },
    // 表单验证
    checkForm(){
        let isOk=true
        if(this.username.length<5){
            this.userNameErrorMsg='用户名不能少于5位！'
            isOk=false
        }else{
            this.userNameErrorMsg=''
        }
        if(this.password.length<6){
            this.passwordErrorMsg='密码不能少于6位'
            isOk=false
        }else{
            this.passwordErrorMsg=''
        }
        return isOk
    }
  }
};
</script>
<style lang='scss' scoped>
.register_panel {
  width: 96%;
  border-radius: 0.3rem;
  margin: 1.5rem auto;
  padding-bottom: 3rem;
}
.register-button {
  padding-top: 0.6rem;
}
</style>