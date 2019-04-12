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
  getInfo({ token }) {
    return request({
      url: "/userInfo",
      method: "post",
      params: {
        token
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
