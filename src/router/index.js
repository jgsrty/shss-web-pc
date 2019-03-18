import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/views/layout/layout";

export default new Router({
  routes: [
    {
      path: "/404",
      name: "404",
      component: r =>
        require.ensure([], () => r(require("@/views/404.vue"), "404"))
    },
    { path: "*", redirect: "/404" },
    //home
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      name: "Home",
      // hidden: true,
      children: [
        {
          path: "home",
          component: r =>
            require.ensure([], () => r(require("@/views/home.vue"), "Home")),
          meta: { title: "首页", url: "/home" }
        }
      ]
    }
  ]
});
