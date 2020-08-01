import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    frames: [],
    styles: [
      {
        "--bg": "rgb(131, 140, 145)",
        "--btn": "#5aac44",
      },
      {
        "--bg": "rgb(210, 144, 52)",
        "--btn": "rgb(210, 144, 52)",
      },
      {
        "--bg": "rgb(176, 70, 50)",
        "--btn": "rgb(176, 70, 50)",
      },
      {
        "--bg": "rgb(137, 96, 158)",
        "--btn": "rgb(137, 96, 158)",
      },
      {
        "--bg": "rgb(0, 174, 204)",
        "--btn": "rgb(0, 174, 204)",
      },
    ],
    style: JSON.parse(localStorage.getItem("style")) || {
      "--bg": "rgb(131, 140, 145)",
      "--btn": "#5aac44",
    },
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
});

export { store };
