import Vue from "vue";
import App from "./App";
import store from "./pages/store/store";
Vue.config.productionTip = false;

App.mpType = "app";

import loader from "./element/loading.vue";
Vue.component("load-list", loader);
import noData from "./element/noData.vue";
Vue.component("no-data", noData);
import homeload from "./element/homeload.vue";
Vue.component("home-load", homeload);
import animate from "animate.css";
Vue.use(animate);
const app = new Vue({
  ...App,
  store,
});
app.$mount();
