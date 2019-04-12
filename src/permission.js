import router from "./router";
import store from "./store";
// import Storage from "@/utils/storage"; // 验权
//nprogress
import Progress from "nprogress";
import "nprogress/nprogress.css";

const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  Progress.start();
  //需要登录的页面检查token
  if (to.meta.needLogin) {
    //token存在放行路由
    if (store.getters.shssToken) {
      // if (to.path === "/login") {
      //   next({ path: "/" });
      // } else {
      //检测用户信息
      if (!store.getters.userInfo) {
        store.dispatch("setUserInfo", store.getters.shssToken);
      }
      next();
      // }
      //token不存在登录，路由重定向
    } else {
      store.commit("SWITCH_LOGIN_FORM_FLAG", true);
      next(`${from.path}?redirect=${to.path}`);
    }
  } else {
    //无需登录页面检查token，如有token，获取用户信息
    if (store.getters.shssToken) {
      if (!store.getters.userInfo) {
        store.dispatch("setUserInfo", store.getters.shssToken);
      }
      next();
    }
    next();
  }
});
router.afterEach(() => {
  Progress.done();
});
