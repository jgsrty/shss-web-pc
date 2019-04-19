import request from "@/utils/request";

const userApi = {
  /**
   * 登录
   * @param {string} username 用户名
   * @param {string} password 密码
   */
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
  register({ username, password }){
    return request({
      url: "user/registerUser",
      method: "post",
      params: {
        username,
        password
      }
    });
  },
  /**
   * 用户信息
   * @param {string} token token放在header中无需通过参数传递
   */
  getInfo() {
    return request({
      url: "/user/findUserInfo",
      method: "post"
    });
  },
  /**
   * 登出
   * @param {string} token 退出登录用户的token
   */
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
