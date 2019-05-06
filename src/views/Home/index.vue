<template>
  <div class="demo-contain">
    <div class="item-group">
      <div class="modules" v-for="(item,ind) in logos" :key="ind" :class="item.class">
        <img :src="item.src" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { logos } from './logoData'
export default {
  data() {
    return {
      logos
    }
  },
  mounted () {
    console.log(this.logos);
  },
};
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
      padding: 10px;
    }
  }
}
</style>
