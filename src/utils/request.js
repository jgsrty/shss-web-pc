import axios from "axios";
import store from "../store";
import qs from "qs";
import { Notification } from "element-ui";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = store.getters.token;
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.params);
      config.params = "";
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    let { data, stateCode, result, errMsg } = response.data;
    if (stateCode != 200) {
      // 501 登录失败，密码错误
      console.log(123);
      Notification.error({
        title: "错误",
        message: errMsg
      });
      return Promise.resolve(false);
    } else {
      return { data, result };
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
