<template>
  <div class="app-layout">
    <el-scrollbar ref="scrollBar">
      <app-head></app-head>
      <div class="contain">
        <app-contain></app-contain>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import appHead from "./components/head";
import appContain from "./components/contain";
export default {
  components: {
    appHead,
    appContain
  },
  watch: {
    $route(to, from) {
      this.$refs["scrollBar"].wrap.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app,
.app-layout,
.el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.app-layout {
  position: relative;
  .contain {
    padding-top: 50px;
  }
}
#nprogress {
  .bar {
    background: #00c1de !important;
  }
  .spinner {
    display: none !important;
  }
}
</style>