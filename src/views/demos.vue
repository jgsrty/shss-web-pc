<template>
  <div class="demo-contain">
    <div
      :ref="item"
      class="list flex-center-center"
      :class="{'full-width':activeItem==item}"
      v-for="(item,ind) in 99"
      :key="ind"
    >
      <button @click="bigger(item)">bigger</button>
      <div>{{Math.floor(Math.random()*100)*Math.floor(Math.random()*100)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: ""
    };
  },
  methods: {
    bigger(item) {
      this.activeItem = item;

    //   document.documentElement.scrollTop = this.$refs[
    //     item
    //   ][0].offsetTop;
    // console.log(document.getElementById('scrollBar').scrollTop)

    //   console.log(document.documentElement.scrollTop);
    //   console.log(this.$refs[item][0].offsetTop);
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-contain {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .list {
    // width: 400px;
    // height: 350px;
    background: #f6f6f6;
    margin-bottom: 10px;
    padding:50px;
  }
  .full-width {
    width: 1200px;
    height: 600px;
  }
}
</style>