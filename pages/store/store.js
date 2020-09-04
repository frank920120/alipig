import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const list = {
  listing: [],
};

const navLoading = {
  loadingList: "",
};
const state = {
  list,
  navLoading,
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
  },
});

export default store;
