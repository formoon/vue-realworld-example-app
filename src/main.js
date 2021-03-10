import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";

// 阻止启动的时候显示你在开发状态啊之类的那条消息
Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH, to)]).then(function(url) {
    // console.log(url[0]);
    if (url[0] == "") {
      next();
    } else {
      next({ path: url[0] });
    }
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
