import axios from "axios";
import store from "../store";
import Storage from "@/utils/storage";
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
    if (store.getters.shssToken) {
      config.headers["shssToken"] = store.getters.shssToken;
    }
    // if (config.method === "post") {
    if (config.type != "json") {
      config.data = qs.stringify(config.params);
      config.params = "";
    }
    // }
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
      // 501 请求参数错误或登录信息已过期
      // 503 登录过期，请重新登录
      Notification.error({
        title: "错误",
        message: errMsg,
        offset: 30
      });
      if (stateCode == 503) {
        setTimeout(() => {
          Storage.del("shssToken");
          window.location.reload();
        }, 1500);
      }
      return Promise.resolve(false);
    } else {
      return { data, result, errMsg };
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
