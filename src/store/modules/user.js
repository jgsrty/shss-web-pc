import Storage from "@/utils/storage";
import userApi from "@/api/userApi";
const user = {
  state: {
    shssToken: Storage.get("shssToken") || null,
    loginFormFlag: false,
    userInfo: null,
    userState: false
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
    setUserInfo({ commit }, token) {
      return new Promise((resolve, reject) => {
        userApi
          .getInfo({ shssToken: token })
          .then(res => {
            commit("SET_USER_STATE", true);
            commit("SET_USER_INFO", res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit, state }) {
      // ----delete----
      commit("SET_TOKEN", "");
      Storage.del("shssToken");
      // ----delete----
      // return new Promise((resolve, reject) => {
      //   userApi
      //     .logOut({ token: state.token })
      //     .then(() => {
      //       commit("SET_TOKEN", "");
      //        Storage.del('shssToken');
      //       resolve();
      //     })
      //     .catch(err => {
      //       reject(err);
      //     });
      // });
    }
  }
};
export default user;
