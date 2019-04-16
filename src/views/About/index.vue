<template>
  <div>
    <div v-for="(item,ind) in 100" :key="ind">{{$t('header.router.about')}}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(123);
  }
};
</script>

<style scoped>
</style>