import Storage from "@/utils/storage";
import userApi from "@/api/userApi";
const user = {
  state: {
    shssToken: Storage.get("shssToken") || '',
    loginFormFlag: false,
    userInfo: Storage.get("userInfo")
      ? JSON.parse(Storage.get("userInfo"))
      : "",
    userState: Storage.get("userState") || false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      Storage.set("shssToken", token);
      state.shssToken = token;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SWITCH_LOGIN_FORM_FLAG: (state, flag) => {
      state.loginFormFlag = flag;
    },
    SET_USER_STATE: (state, flag) => {
      state.userState = flag;
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setUserInfo({ commit }, data) {
      commit("SET_USER_STATE", true);
      Storage.set("userState", true);
      commit("SET_USER_INFO", data);
      Storage.set("userInfo", data);
      // return new Promise((resolve, reject) => {
      //   userApi
      //     .getInfo()
      //     .then(res => {
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       reject(err);
      //     });
      // });
    },
    //登出
    logOut({ commit, state }) {
      commit("SET_TOKEN", "");
      commit("SET_USER_INFO", "");
      commit("SET_USER_STATE", false);
      Storage.del("shssToken");
      Storage.del("userInfo");
      Storage.del("userState");
    }
  }
};
export default user;
