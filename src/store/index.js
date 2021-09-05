import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import { auth } from "src/boot/firebase";
import createPersistedState from "vuex-persistedstate";
import state from "./module-example/state";
// import cookie from "cookie";
import Vuex from "vuex";

export default store(function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [
      createPersistedState({
        storage: window.sessionStorage,
        // paths: [],
      }),
    ],

    modules: {},
    state: {
      fireUser: null,
    },
    actions: {
      signOutAction({ commit }) {
        auth.signOut().then(() => {
          commit("setFireUser", null);
        });
      },
      authAction({ commit }) {
        auth.onAuthStatChanged((user) => {
          if (user) {
            commit("setFireUser", user);
          }
        });
      },
    },
    mutations: {
      setFireUser(state, firebaseUser) {
        state.fireUser = firebaseUser;
      },
    },
    getters: {
      getFireUser(state) {
        return state.fireUser;
      },
      isUserAuth(state) {
        return !!state.fireUser;
      },
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
});
