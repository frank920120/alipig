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
const state = {
  list,
  navLoading,
  navData,
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
  },
});

export default store;
