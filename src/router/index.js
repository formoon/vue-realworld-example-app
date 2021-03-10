import Vue from "vue";
import Router from "vue-router";
import { BASE_INDEX_PAGE } from "@/common/config.js";

// console.log(BASE_INDEX_PAGE);
Vue.use(Router);

export default new Router({
  mode: "history",
  // base: "/index.html",
  // base: "/static/index.html",
  base: BASE_INDEX_PAGE,

  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeGlobal")
        },
        {
          path: "my-feed",
          name: "home-my-feed",
          component: () => import("@/views/HomeMyFeed")
        },
        {
          path: "tag/:tag",
          name: "home-tag",
          component: () => import("@/views/HomeTag")
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/views/Register")
    },
    {
      name: "settings",
      path: "/settings",
      component: () => import("@/views/Settings")
    },
    // Handle child routes with a default, by giving the name to the
    // child.
    // SO: https://github.com/vuejs/vue-router/issues/777
    {
      path: "/@:username",
      component: () => import("@/views/Profile"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("@/views/ProfileArticles")
        },
        {
          name: "profile-favorites",
          path: "favorites",
          component: () => import("@/views/ProfileFavorited")
        }
      ]
    },
    {
      name: "article",
      path: "/articles/:slug",
      component: () => import("@/views/Article"),
      props: true
    },
    {
      name: "uploadScript",
      path: "/upload",
      component: () => import("@/views/Upload"),
      props: true
    },
    {
      name: "article-edit",
      path: "/editor/:slug?",
      props: true,
      component: () => import("@/views/ArticleEdit")
    }
  ]
});
