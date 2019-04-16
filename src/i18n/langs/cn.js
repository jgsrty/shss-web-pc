import enLocale from "element-ui/lib/locale/lang/zh-CN";
const cn = {
  header: {
    logo: "标志",
    router: {
      index: "首页",
      about: "关于"
    }
  },
  user: {
    login: "登录",
    register: "注册",
    hasCount: "已有账号?",
    noCount: "没有账号?",
    logOut: "退出登录",
    logSucc: "登录成功",
    place: {
      userName: "请输入用户名",
      passWord: "请输入密码",
      passWordAgain: "请再次输入密码",
      passNotMatch: "两次输入密码不一致"
    }
  },
  ...enLocale
};
export default cn;
