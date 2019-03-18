<template>
  <div class="header flex-justify-between">
    <div class="logo">logo</div>
    <div class="navs">
      <span>首页</span>
      <span>page2</span>
      <span>page3</span>
      <span>page4</span>
    </div>
    <div class="user">登录</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  align-items: center;
  padding: 0 20px;
  .navs {
    span {
      margin-right: 20px;
    }
  }
}
</style>