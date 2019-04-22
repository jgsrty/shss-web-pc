const publicApi = {
  //百度翻译
  baiduTrans: {
    appid: "20190417000288752",
    appsecret: "nZSNZpNrirkokFH4KCCq",
    http: "http://api.fanyi.baidu.com/api/trans/vip/translate",
    https: "https://fanyi-api.baidu.com/api/trans/vip/translate"
  },
  //极速数据
  jisuData: {
    appkey: "43bec24221b5ce12",
    appsecret: "nQ8szIBfRkHIvtdtqc9WDHwCaZTfAFE8",
    //火车查询
    train: {
      url: "https://api.jisuapi.com/train/",
      //站站查询
      station2s: "station2s",
      //车次查询
      line: "line",
      //余票查询
      ticket: "ticket"
    }
  }
};

export default publicApi;
