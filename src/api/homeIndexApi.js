import request from "@/utils/request";
import md5 from "js-md5";

const homeIndexApi = {
  /**
   * 百度通用翻译
   * @q {TEXT} 请求翻译query
   * @from {TEXT} 翻译源语言 可设置为auto
   * @to {TEXT} 译文语言 不可设置为auto
   * @appid {INT} APP ID
   * @salt {INT} 随机数
   * @sign {TEXT} 签名 appid+q+salt+密钥 的MD5值
   */
  baiduTranslate({ q, from, to, appid, salt, key }) {
    let sign = md5(appid + q + salt + key);
    return request({
      //http
        // url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
    //   https
      url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
      type: "json",
      method: "get",
      params: { q, from, to, appid, salt, sign }
    });
  }
};

export default homeIndexApi;
