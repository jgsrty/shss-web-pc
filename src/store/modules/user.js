import Storage from "@/utils/storage";
const user = {
  state: {
    token: Storage.get("token") || null,
    loginFormFlag: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      Storage.set("token", token);
    },
    SWITCH_LOGIN_FORM_FLAG: (state, flag) => {
      state.loginFormFlag = flag;
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    }
  }
};
export default user;
