import request from "@/utils/request";

const homeIndexApi = {
  /**
   * 调用外部接口
   * @param {string} url 外部接口url及参数
   * @param {string} method 暂只支持get
   */
  doPostForResult({ url, method }) {
    return request({
      url: "sendUrl/doPostForResult",
      method: "post",
      params: {
        url,
        method
      }
    });
  }
};

export default homeIndexApi;
