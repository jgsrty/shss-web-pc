import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
// normalize
import "normalize.css/normalize.css";
// icon
import "@/assets/font/iconfont.css";
// permission
import "@/permission";
// element
import ElementUI from "element-ui";
Vue.use(ElementUI);
import "element-ui/lib/theme-chalk/index.css";
// theme
import "@/style/theme.scss";
// i18n
import i18n from "./i18n/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
