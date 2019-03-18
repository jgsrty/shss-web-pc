<template>
  <div class="app-layout">
    <app-head></app-head>
    <div class="contain">
      <app-contain></app-contain>
    </div>
  </div>
</template>

<script>
import appHead from "./components/head";
import appContain from "./components/contain";
export default {
  components: {
    appHead,
    appContain
  }
};
</script>

<style lang="scss">
</style>