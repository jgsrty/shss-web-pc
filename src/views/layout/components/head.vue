<template>
  <div class="head-contain">
    <div class="header flex-justify-between">
      <div class="logo">logo</div>
      <div class="navs">
        <span @click="$router.push('/')">首页</span>
        <span @click="$router.push('/about')">page2</span>
        <span>page3</span>
        <span>page4</span>
      </div>
      <div class="user" @click="userLogin">登录</div>
    </div>
    <!-- login form -->
    <el-dialog :title="loginOrRegister?'登录':'注册'" :visible.sync="showDialog" width="320px">
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
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="full-button" type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
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
          <el-input v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="chekpass">
          <el-input v-model="registerForm.chekpass" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="full-button"
            type="primary"
            @click="submitRegisterForm('registerForm')"
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
// import loginForm from "@/components/dialog";
export default {
  components: {
    // loginForm
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
        username: "",
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
      }
    };
  },
  methods: {
    // 登录
    submitLoginForm(ref) {
      this.$refs[ref].validate(res => {
        if (res) {
          this.showDialog = false;
          this.$message({
            showClose: true,
            message: "快写接口~~",
            type: "success"
          });
        }
      });
    },
    // 注册
    submitRegisterForm(ref) {
      this.$refs[ref].validate(res => {
        if (res) {
          this.showDialog = false;
          this.$message({
            showClose: true,
            message: "快写接口~~",
            type: "success"
          });
        }
      });
    },
    userLogin() {
      this.showDialog = true;
      // this.$refs[loginForm].resetFields();
      // this.$refs[registerForm].resetFields();
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