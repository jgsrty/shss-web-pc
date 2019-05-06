import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/views/layout/layout";

export default new Router({
  mode:'history',
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
            require.ensure([], () =>
              r(require("@/views/Home/index.vue"), "Home")
            ),
          meta: { title: "首页", url: "/home" }
        }
      ]
    },
    //about
    {
      path: "/chat",
      component: Layout,
      name: "Chat",
      redirect: "/chat/index",
      // hidden: true,
      children: [
        {
          path: "index",
          component: r =>
            require.ensure([], () =>
              r(require("@/views/Chat/index.vue"), "Chat")
            ),
          meta: { title: "关于", url: "/chat", needLogin: true }
        }
      ]
    },
    //demos
    {
      path: "/demos",
      component: Layout,
      name: "Demos",
      // redirect: "/demos",
      children: [
        {
          path: "/demos",
          component: r =>
            require.ensure([], () =>
              r(require("@/views/demos.vue"), "Demos")
            ),
          meta: { title: "demo", url: "/demos", needLogin: false }
        }
      ]
    }
  ]
});
