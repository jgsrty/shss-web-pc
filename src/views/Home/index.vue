<template>
  <div class="home">
    <!-- banner -->
    <div class="banner flex-center-center">
      <div class="trans-input">
        <el-input v-model="baiduTrans.q" placeholder="请输入内容" size="mini"></el-input>
      </div>
      <el-button type="primary" round size="mini" @click="transText">trans</el-button>
    </div>
    <baidu-map class="bm-view" :center="mapArea" :scroll-wheel-zoom="true">
      <!-- 地图类型 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <!-- 缩放 有bug -->
      <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
      <!-- 缩略图 -->
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <!-- 交通流量 -->
      <!-- <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic> -->
      <!-- 定位 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
    <!-- list -->
  </div>
</template>

<script>
import homeIndexApi from "@/api/homeIndexApi";
import publicApi from "@/api/publicApi";
import md5 from "js-md5";
export default {
  name: "home",
  data() {
    return {
      mapArea: "登封",
      //百度翻译参数
      baiduTrans: {
        url: publicApi.baiduTrans.https, //请求url
        method: "POST", //请求方法
        q: "", //翻译文本
        from: "auto", //翻译源语言 默认auto
        to: "zh", //译文语言
        appid: publicApi.baiduTrans.appid, //appid
        salt: Date.parse(new Date()), //随机数
        sign: "" //签名=md5(appid+q+salt+密钥)
      }
    };
  },
  methods: {
    async transText() {
      if (this.baiduTrans.q) {
        this.baiduTrans.sign = md5(
          this.baiduTrans.appid +
            this.baiduTrans.q +
            this.baiduTrans.salt +
            publicApi.baiduTrans.appsecret
        );
        let res = await homeIndexApi.doPostForResult(this.baiduTrans);
        if (res) {
          alert(`翻译结果：${res.trans_result[0].dst}`);
        }
      } else {
        this.$message({
          showClose: true,
          message: "请输入需要翻译的文本",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  .banner {
    height: 300px;
    .trans-input {
      width: 300px;
      margin-right: 10px;
    }
  }
  .bm-view {
    width: 100%;
    height: 500px;
  }
  .list {
    .tabs {
      margin-bottom: 10px;
      span {
        margin-right: 20px;
      }
    }
    .item {
      .news {
        display: flex;
        margin-bottom: 10px;
        .left {
          margin-right: 20px;
          .img {
            width: 200px;
            height: 150px;
            border: 1px solid #cccccc;
          }
        }
        .right {
        }
      }
    }
  }
}
</style>
