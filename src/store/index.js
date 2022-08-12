import { createLogger, createStore } from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutatation";
import * as actions from "./action";
const debug = process.env.NODE_ENV === "development";

export default createStore({
  state,
  getters: {},
  mutations,
  actions,
  plugins: debug ? [createLogger()] : [],
  strict: debug,
});
