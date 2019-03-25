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
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// theme
import "@/style/theme.scss";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
