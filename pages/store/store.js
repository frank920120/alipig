import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const list = {
  listing: [],
};

const state = {
  list,
};

const store = new Vuex.Store({
  state,
  actions: {
    changeList({ commit }, lists) {
      commit("setLists", lists);
    },
  },
  mutations: {
    setLists(state, lists) {
      state.list = { listing: lists };
    },
  },
});

export default store;
