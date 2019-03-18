<template>
  <section class="main-contain">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.main-contain {
  width: 1200px;
  margin: 0 auto;
}
</style>