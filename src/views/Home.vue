<template>
  <div class="home">
    <!-- banner -->
    <div class="banner flex-center-center">
      <div>banner</div>
    </div>
    <!-- list -->
    <div class="list">
      <div class="tabs">
        <span>tab1</span>
        <span>tab2</span>
        <span>tab3</span>
        <span>tab4</span>
      </div>
      <div class="item">
        <div class="news" v-for="(item,ind) in 10" :key="ind">
          <div class="left">
            <div class="img"></div>
          </div>
          <div class="right">
            <h4 class="title">title</h4>
            <div class="digest">放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达放大范德萨富士达</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
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
