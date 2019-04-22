<template>
  <div class="head-contain">
    <div class="header flex-justify-between">
      <div class="logo">{{$t('header.logo')}}</div>
      <div class="navs">
        <span @click="$router.push('/')">{{$t('header.router.index')}}</span>
        <span @click="$router.push('/about')">{{$t('header.router.about')}}</span>
      </div>
      <div class="menu">
        <div
          class="user menu-item"
          @click="userLogin"
          v-if="!$store.getters.userState"
        >{{$t('user.login')}}</div>
        <div class="user menu-item flex-align-center" v-else>
          <el-dropdown trigger="click" @command="clickUserHead">
            <div class="flex-align-center">
              <div class="user-icon">
                <img
                  v-if="$store.getters.userInfo.portrait"
                  :src="$store.getters.userInfo.portrait"
                  alt
                >
                <img
                  v-else
                  src="http://api.laoyaojing.net/public/uploads/2019-03-07/5c810602a8e03.jpg"
                  alt
                >
              </div>
              <div class="user-name">{{$store.getters.userInfo.username}}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">{{$t('user.logOut')}}</el-dropdown-item>
              <!-- <el-dropdown-item>我是谁</el-dropdown-item>
              <el-dropdown-item>我在哪里</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="lang menu-item" @click="switchLang">
          <i class="el-icon-sort"></i>
          {{this.$i18n.locale=='cn'?'Switch English':'切换中文'}}
        </div>
      </div>
    </div>
    <!-- login form -->
    <el-dialog
      :title="loginOrRegister?`${this.$t('user.login')}`:`${this.$t('user.register')}`"
      :visible.sync="loginFormFlag"
      :close-on-click-modal="false"
      width="320px"
    >
      <!-- 登录 -->
      <el-form :model="loginForm" ref="loginForm" class="login-form" v-show="loginOrRegister">
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: `${this.$t('user.place.userName')}`, trigger: 'blur' }]"
        >
          <el-input
            @keyup.enter.native="submitLoginForm('loginForm')"
            v-model="loginForm.username"
            :placeholder="$t('user.place.userName')"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: `${this.$t('user.place.passWord')}`, trigger: 'blur' }]"
        >
          <el-input
            type="password"
            v-model="loginForm.password"
            @keyup.enter.native="submitLoginForm('loginForm')"
            :placeholder="$t('user.place.passWord')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loginLoading"
            class="full-button"
            type="primary"
            @click="submitLoginForm('loginForm')"
          >{{$t('user.login')}}</el-button>
          <span>
            {{$t('user.noCount')}}
            <el-button type="text" @click="loginOrRegister=false">{{$t('user.register')}}</el-button>
          </span>
        </el-form-item>
      </el-form>
      <!-- 注册 -->
      <el-form
        :model="registerForm"
        :rules="registerRule"
        ref="registerForm"
        class="login-form"
        v-show="!loginOrRegister"
      >
        <el-form-item prop="username">
          <el-input
            @keyup.enter.native="submitRegisterForm('registerForm')"
            v-model="registerForm.username"
            :placeholder="$t('user.place.userName')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="submitRegisterForm('registerForm')"
            type="password"
            v-model="registerForm.password"
            :placeholder="$t('user.place.passWord')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="chekpass">
          <el-input
            @keyup.enter.native="submitRegisterForm('registerForm')"
            type="password"
            v-model="registerForm.chekpass"
            :placeholder="$t('user.place.passWordAgain')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="full-button"
            type="primary"
            @click="submitRegisterForm('registerForm')"
            :loading="registLoading"
          >{{$t('user.register')}}</el-button>
          <span>
            {{$t('user.hasCount')}}
            <el-button type="text" @click="loginOrRegister=true">{{$t('user.login')}}</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import userApi from "@/api/userApi";
import { mapGetters } from "vuex";
export default {
  components: {
    // loginForm
  },
  computed: {
    ...mapGetters(["shssToken", "userState"]),
    loginFormFlag: {
      get() {
        return this.$store.getters.loginFormFlag;
      },
      set(val) {
        this.$store.commit("SWITCH_LOGIN_FORM_FLAG", val);
      }
    }
  },
  data() {
    let validateName = (rule, val, cb) => {
      if (val === "") {
        return cb(new Error(`${this.$t("user.place.userName")}`));
      }
      cb();
    };
    let validatePass = (rule, val, cb) => {
      if (val === "") {
        return cb(new Error(`${this.$t("user.place.passWord")}`));
      } else {
        if (this.registerForm.chekpass !== "") {
          this.$refs.registerForm.validateField("chekpass");
        }
        cb();
      }
    };
    let checkPass = (rule, val, cb) => {
      if (val === "") {
        return cb(new Error(`${this.$t("user.place.passWordAgain")}`));
      } else if (val !== this.registerForm.password) {
        cb(new Error(`${this.$t("user.place.passNotMatch")}`));
      } else {
        cb();
      }
    };
    return {
      showDialog: false,
      loginOrRegister: true,
      //登录
      loginForm: {
        //tyl
        username: "",
        //tyl123
        password: ""
      },
      //注册
      registerForm: {
        username: "",
        password: "",
        chekpass: ""
      },
      registerRule: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        chekpass: [{ validator: checkPass, trigger: "blur" }]
      },
      //登录状态
      loginState: false,
      //用户信息
      userInfo: {},
      //按钮loading
      loginLoading: false,
      registLoading: false
    };
  },
  mounted() {},
  methods: {
    // 登录
    async submitLoginForm(ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          this.loginFunction(this.loginForm);
        }
      });
    },
    // 注册
    async submitRegisterForm(ref) {
      this.$refs[ref].validate(async res => {
        if (res) {
          this.registLoading = true;
          let res = await userApi.register(this.registerForm);
          this.registLoading = false;
          if (res) {
            this.$store.commit("SWITCH_LOGIN_FORM_FLAG", false);
            this.loginFunction(this.registerForm);
          }
        }
      });
    },
    //  登录function
    async loginFunction(form) {
      this.loginLoading = true;
      let uToken = await userApi.login(form);
      this.loginLoading = false;
      if (uToken) {
        this.loginLoading = false;
        this.$store.commit("SWITCH_LOGIN_FORM_FLAG", false);
        this.$message({
          showClose: true,
          message: `${this.$t("user.logSucc")}`,
          type: "success"
        });
        //保存token
        this.$store.dispatch("setToken", uToken.data.shssToken);
        //登录重定向
        if (this.$route.query.redirect) {
          this.$router.push({ path: this.$route.query.redirect });
        }
        //拉取用户信息
        // let getUserInfo = await userApi.getInfo({
        //   shssToken: uToken.data.shssToken
        // });
        //更新vuex用户信息
        // if (getUserInfo) {
        this.$store.dispatch("setUserInfo");
        // this.loginState = true;
        // this.userInfo = this.$store.getters.userInfo;
        // }
      }
    },
    userLogin() {
      this.$store.commit("SWITCH_LOGIN_FORM_FLAG", true);
      // this.$refs[loginForm].resetFields();
      // this.$refs[registerForm].resetFields();
    },
    //切换语言
    switchLang() {
      this.$i18n.locale == "cn"
        ? (this.$i18n.locale = "en")
        : (this.$i18n.locale = "cn");
    },
    async clickUserHead(e) {
      // 登出
      if (e == "logout") {
        let res = await userApi.logOut(this.shssToken);
        if (res) {
          this.$store.dispatch("logOut").then(() => {
            window.location.reload();
          });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.head-contain {
  .header {
    height: 50px;
    z-index: 10;
    align-items: center;
    padding: 0 12px 0 20px;
    position: fixed;
    left: 0;
    right: 8px;
    background: #fff;
    .logo {
      width: 300px;
    }
    .navs {
      span {
        margin: 0 10px;
      }
    }
    .menu {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      width: 300px;
      &-item {
        margin-left: 20px;
      }
      .user {
        cursor: pointer;
        &-icon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        &-name {
        }
      }
    }
  }
  .login-form {
    .full-button {
      width: 100%;
    }
  }
  .el-dialog__body {
    padding-bottom: 5px;
  }
}
</style>