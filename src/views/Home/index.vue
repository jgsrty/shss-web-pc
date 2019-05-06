<template>
  <div class="contain">
    <div class="thanos-glove">
      <div
        v-show="!snapped"
        class="glove glove-snap"
        :class="snapping?'snapping':''"
        @click="switchGlove"
      ></div>
      <div
        v-show="snapped"
        class="glove glove-reverse"
        :class="reversing?'reversing':''"
        @click="switchGlove"
      ></div>
    </div>
    <div class="logo-group">
      <div class="modules" v-for="(item,ind) in logos" :key="ind" :class="item.class">
        <img :src="item.src" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { logos } from "./logoData";
export default {
  data() {
    return {
      //logos
      logos,
      //thanos
      snapped: false,
      snapping: false,
      reversing: false,
      surviveItem: []
    };
  },
  mounted() {
    this.surviveItem = [...this.logos];
  },
  methods: {
    switchGlove() {
      // this.snapped = !this.snapped;
      if (!this.snapped) {
        //打响指
        this.snapping = true;
        setTimeout(() => {
          let interval = setInterval(() => {
            let vanish = Math.floor(Math.random() * this.logos.length);
            this.logos.splice(vanish, 1);
            if (this.logos.length < this.surviveItem.length / 2) {
              clearInterval(interval);
              this.snapped = true;
              this.snapping = false;
            }
          }, 500);
        }, 2800);
      } else {
        //恢复
        this.reversing = true;
        setTimeout(() => {
          this.snapped = false;
          this.reversing = false;
          this.logos = [...this.surviveItem];
        }, 2800);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 1200px;
  margin: 0 auto;
  //thanos
  .thanos-glove {
    .glove {
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
    .glove-snap {
      background: url("../../assets/images/thanos/thanos_snap.png");
    }
    .snapping {
      -webkit-animation: gloveAni 2.8s steps(47) both;
      animation: gloveAni 2.8s steps(47) both;
    }
    .glove-reverse {
      background: url("../../assets/images/thanos/thanos_reverse.png");
    }
    .reversing {
      -webkit-animation: gloveAni 2.8s steps(47) both;
      animation: gloveAni 2.8s steps(47) both;
    }
  }
  //logo
  .logo-group {
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
@keyframes gloveAni {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -3760px 0;
  }
}
</style>
