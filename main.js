import Vue from "vue";
import App from "./App";
import store from "./pages/store/store";
Vue.config.productionTip = false;

App.mpType = "app";

import loader from "./element/loading.vue";
Vue.component("load-list", loader);
const app = new Vue({
  ...App,
  store,
});
app.$mount();
