<template>
  <div class="demo-contain">
    <div class="item-group">
      <div class="modules baidu-trans">
        <img src="../assets/images/baidu_trans_logo.png" alt>
      </div>
      <div class="modules youdao-trans">
        <img src="../assets/images/youdao_trans_logo.png" alt>
      </div>
      <div class="modules train-line">
        <img src="../assets/images/12306_logo.jpg" alt>
      </div>
      <div class="modules centre-weather">
        <img src="../assets/images/centre_weather_logo.png" alt>
      </div>
      <div class="modules lottery-logo">
        <img src="../assets/images/lottery_logo.png" alt>
      </div>
      <div class="modules china-news">
        <img src="../assets/images/china_news_logo.jpg" alt>
      </div>
      <div class="modules baidu-map">
        <img src="../assets/images/baidu_map_logo.png" alt>
      </div>
      <div class="modules driving-license">
        <img src="../assets/images/driving_license_logo.jpg" alt>
      </div>
      <div class="modules food-menu">
        <img src="../assets/images/food_menu_logo.png" alt>
      </div>
      <div class="modules jd-financial">
        <img src="../assets/images/jd_financial.png" alt>
      </div>
      <div class="modules company-search">
        <img src="../assets/images/company_search_logo.png" alt>
      </div>
      <div class="modules air-quality">
        <img src="../assets/images/air_quality_logo.png" alt>
      </div>
      <div class="modules car-brands">
        <img src="../assets/images/car_brands_logo.png" alt>
      </div>
      <div class="modules eolinker">
        <img src="../assets/images/eolinker_logo.png" alt>
      </div>
      <div class="modules tencent-developer">
        <img src="../assets/images/tencent_developer_logo.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.demo-contain {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 1200px;
  margin: 0 auto;
  .item-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .modules {
      cursor: pointer;
      border-radius: 5px;
      margin: 10px 10px;
      box-shadow: 0px 0px 10px 0px rgba(192, 196, 204, 1);
      padding: 15px;
    }
  }
}
</style>