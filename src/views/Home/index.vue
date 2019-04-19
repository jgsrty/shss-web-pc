<template>
  <div class="home">
    <!-- banner -->
    <div class="banner flex-center-center">
      <div>{{$t('header.router.index')}}</div>
    </div>
    <baidu-map class="bm-view" :center="mapArea" :scroll-wheel-zoom="true">
      <!-- 地图类型 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <!-- 缩放 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
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
export default {
  name: "home",
  data() {
    return {
      mapArea: "登封"
    };
  }
};
</script>

<style scoped lang="scss">
.home {
  .banner {
    height: 300px;
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
