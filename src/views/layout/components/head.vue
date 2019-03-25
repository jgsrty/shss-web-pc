<template>
  <div class="header flex-justify-between">
    <div class="logo">logo</div>
    <div class="navs">
      <span @click="$router.push('/')">首页</span>
      <span @click="$router.push('/about')">page2</span>
      <span>page3</span>
      <span>page4</span>
    </div>
    <div class="user" @click="userLogin">登录</div>
    <!-- login form -->
    <login-form :visible.sync="showDialog" :header="'用户登录'">
      <div class="lgoin-form">
        <div class="item">
          <span>用户名：</span>
          <input type="text">
        </div>
        <div class="item">
          <span>密码：</span>
          <input type="text">
        </div>
      </div>
      <div class="login-footer"></div>
    </login-form>
  </div>
</template>

<script>
import loginForm from "@/components/dialog";
export default {
  components: {
    loginForm
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    userLogin() {
      this.showDialog = true;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  z-index: 10;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  left: 0;
  right: 0;
  .navs {
    span {
      margin-right: 20px;
    }
  }
}
.lgoin-form {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 60px;
    }
    input {
      flex: 1;
    }
  }
}
</style>