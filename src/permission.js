import router from "./router";
import store from "./store";
import Storage from "@/utils/storage"; // 验权
//nprogress
import Progress from "nprogress";
import "nprogress/nprogress.css";

const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  Progress.start();
  //仅在需要登录的页面检查token
  if (to.meta.needLogin) {
    //token存在放行路由
    if (Storage.get("token")) {
      // if (to.path === "/login") {
      //   next({ path: "/" });
      // } else {
      //   //检测用户信息
      //   if (!store.getters.userInfo) {
      //     store.dispatch("getUserInfo");
      //   }
      next();
      // }
      //token不存在登录，路由重定向
    } else {
      store.commit("SWITCH_LOGIN_FORM_FLAG", true);
      next(`${from.path}?redirect=${to.path}`);
      // next();
      // } else {
      //   next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      // }
    }
  } else {
    next();
  }
});
router.afterEach(() => {
  Progress.done();
});
