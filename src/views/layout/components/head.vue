<template>
  <div class="head-contain">
    <div class="header flex-justify-between">
      <div class="logo">test</div>
      <div class="navs">
        <span @click="$router.push('/')">无需登录</span>
        <span @click="$router.push('/about')">需要登录</span>
      </div>
      <div class="user" @click="userLogin" v-if="!$store.getters.userState">登录</div>
      <div class="user flex-align-center" v-else>
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
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item>我是谁</el-dropdown-item>
            <el-dropdown-item>我在哪里</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- login form -->
    <el-dialog :title="loginOrRegister?'登录':'注册'" :visible.sync="loginFormFlag" width="320px">
      <!-- 登录 -->
      <el-form :model="loginForm" ref="loginForm" class="login-form" v-show="loginOrRegister">
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
        >
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loginLoading"
            class="full-button"
            type="primary"
            @click="submitLoginForm('loginForm')"
          >登录</el-button>
          <span>
            没有账号?
            <el-button type="text" @click="loginOrRegister=false">注册</el-button>
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
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="chekpass">
          <el-input type="password" v-model="registerForm.chekpass" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="full-button"
            type="primary"
            @click="submitRegisterForm('registerForm')"
            :loading="registLoading"
          >注册</el-button>
          <span>
            已有账号?
            <el-button type="text" @click="loginOrRegister=true">登录</el-button>
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
    loginFormFlag: {
      ...mapGetters(["shssToken", "userInfo", "userState"]),
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
        return cb(new Error("请输入用户名"));
      }
      cb();
    };
    let validatePass = (rule, val, cb) => {
      if (val === "") {
        return cb(new Error("请输入密码"));
      } else {
        if (this.registerForm.chekpass !== "") {
          this.$refs.registerForm.validateField("chekpass");
        }
        cb();
      }
    };
    let checkPass = (rule, val, cb) => {
      if (val === "") {
        return cb(new Error("请再次输入密码"));
      } else if (val !== this.registerForm.password) {
        cb(new Error("两次输入密码不一致"));
      } else {
        cb();
      }
    };
    return {
      showDialog: false,
      loginOrRegister: true,
      //登录
      loginForm: {
        username: "tyl",
        password: "tyl123"
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
  methods: {
    // 登录
    async submitLoginForm(ref) {
      this.loginLoading = true;
      this.$refs[ref].validate(async res => {
        if (res) {
          let uToken = await userApi.login(this.loginForm);
          this.loginLoading = false;
          if (uToken) {
            this.loginLoading = false;
            this.$store.commit("SWITCH_LOGIN_FORM_FLAG", false);
            this.$message({
              showClose: true,
              message: "登录成功",
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
            this.$store.dispatch("setUserInfo", uToken.data.shssToken);
            // this.loginState = true;
            // this.userInfo = this.$store.getters.userInfo;
            // }
          }
        }
      });
    },
    // 注册
    submitRegisterForm(ref) {
      this.$refs[ref].validate(res => {
        if (res) {
          this.$store.commit("SWITCH_LOGIN_FORM_FLAG", false);
          this.$message({
            showClose: true,
            message: "快写接口~~",
            type: "success"
          });
        }
      });
    },
    userLogin() {
      this.$store.commit("SWITCH_LOGIN_FORM_FLAG", true);
      // this.$refs[loginForm].resetFields();
      // this.$refs[registerForm].resetFields();
    },
    clickUserHead(e) {
      if (e == "logout") {
        this.$store.dispatch("logOut").then(() => {
          window.location.reload();
        });
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
    .navs {
      span {
        margin-right: 20px;
      }
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