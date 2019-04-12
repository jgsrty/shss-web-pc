import request from "@/utils/request";

const userApi = {
  //登录
  login({ username, password }) {
    return request({
      url: "user/login",
      method: "post",
      params: {
        username,
        password
      }
    });
  },
  //用户信息
  getInfo({ shssToken }) {
    return request({
      url: "/user/findUserInfo",
      method: "post",
      params: {
        shssToken
      }
    });
  },
  //登出
  logOut({ token }) {
    return request({
      url: "/userLogout",
      method: "post",
      params: {
        token
      }
    });
  }
};

export default userApi;
