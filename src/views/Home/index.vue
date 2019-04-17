<template>
  <div class="home">
    <!-- banner -->
    <div class="banner flex-center-center">
      <div>
        <el-input v-model="transText" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="submitTransText">翻译一下</el-button>
      </div>
    </div>
    <!-- list -->
  </div>
</template>

<script>
import homeIndexApi from "@/api/homeIndexApi";
export default {
  name: "home",
  data() {
    return {
      transText: ""
    };
  },
  methods: {
    async submitTransText() {
      let params = {
        q: this.transText,
        from: "auto",
        to: "zh",
        appid: 20190417000288752,
        salt: Date.parse(new Date() / 1000),
        key: "nZSNZpNrirkokFH4KCCq"
      };
      let res = homeIndexApi.baiduTranslate(params);
      console.log(res);
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  .banner {
    height: 300px;
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
