import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const list = {
  listing: [],
};

const navLoading = {
  loadingList: "",
};
const navData = {
  nav: "recommend",
  pageId: 0,
};

const hotCities = {
  name: "",
};
const state = {
  list,
  navLoading,
  navData,
  hotCities,
};

const store = new Vuex.Store({
  state,
  mutations: {
    setLists(state, lists) {
      state.list = { listing: lists };
    },
    setLoading(state, loading) {
      state.navLoading = { loadingList: loading };
    },
    setNavData(state, navData) {
      state.navData = navData;
    },
    setHotCity(state, hotcity) {
      state.hotCities = { name: hotcity };
    },
  },
});

export default store;
