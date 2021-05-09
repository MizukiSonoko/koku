import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { secureStorage } from "@/globals";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  plugins: [
    /*
    createPersistedState({
      storage: {
        getItem: key => secureStorage.get(key),
        setItem: (key, value) => secureStorage.set(key, value),
        removeItem: key => secureStorage.remove(key)
      }
    })
    */
  ]
});
