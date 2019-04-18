<template>
  <div class="home">
    <!-- banner -->
    <div class="banner flex-center-center">
      <div>{{$t('header.router.index')}}</div>
    </div>
    <baidu-map class="bm-view"></baidu-map>
    <!-- list -->
  </div>
</template>

<script>
import homeIndexApi from "@/api/homeIndexApi";
export default {
  name: "home"
};
</script>

<style scoped lang="scss">
.home {
  .banner {
    height: 300px;
  }
  .bm-view {
    width: 300px;
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
