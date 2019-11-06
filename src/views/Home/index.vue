<template>
  <div class="contain">
    <div class="thanos-glove">
      <div
        v-show="showSnap"
        class="glove glove-snap"
        :class="snapping?'snapping':''"
        @click="switchGlove"
      ></div>
      <div
        v-show="showReverse"
        class="glove glove-reverse"
        :class="reversing?'reversing':''"
        @click="reverseHandle"
      ></div>
    </div>
    <div class="logo-group">
      <div class="modules" v-for="(item,ind) in logos" :key="ind" :id="item.class" @click="selectLogo(ind)">
        <img :src="item.src" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { logos } from "./logoData";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      //logos
      logos,
      //thanos
      showSnap: true,
      showReverse: false,
      snapping: false,
      reversing: false
    };
  },
  mounted() {
    // this.surviveItem = [...this.logos];
    console.log(123)
  },
  methods: {
    //选择logo服务
    selectLogo(ind){
      console.log(ind)
    },
    //打响指
    switchGlove() {
      if (this.snapping || this.reversing) return;
      this.snapping = true;
      setTimeout(async () => {
        this.showReverse = true;
        this.showSnap = false;
        this.hidedIds = this.logos
          .slice(0)
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.ceil(this.logos.length / 2))
          .map(item => item.class);
        for (let i = 0; i < this.hidedIds.length; i++) {
          let heroId = this.hidedIds[i],
            itm = document.getElementById(heroId);
          await this.snapToDust(itm);
          await this.sleep();
        }
        this.snapping = false;
      }, 2800);
    },
    //恢复
    reverseHandle() {
      if (this.snapping || this.reversing) return;
      this.reversing = true;
      // this.playAudio("reverse");
      setTimeout(() => {
        this.showSnap = true;
        this.showReverse = false;
        this.reversing = false;
        for (let i = 0; i < this.logos.length; i++) {
          let itm = document.getElementById(this.logos[i].class);
          itm.style.visibility = "visible";
        }
      }, 2800);
    },
    generateFrames($canvas, count = 32) {
      const { width, height } = $canvas;
      // get a 2d rendering context from $canvas
      const ctx = $canvas.getContext("2d");
      // copy a rectangular area marked by 4 parameter
      const originalData = ctx.getImageData(0, 0, width, height);
      const imageDatas = [...Array(count)].map((_, i) =>
        // createImageData funciton is used to create a blank ImageData obj
        ctx.createImageData(width, height)
      );
      // pixel level
      for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
          // REPEAT
          for (let i = 0; i < 2; ++i) {
            const dataIndex = Math.floor(
              (count * (Math.random() + (2 * x) / width)) / 3
            );
            const pixelIndex = (y * width + x) * 4;
            for (let offset = 0; offset < 4; ++offset) {
              imageDatas[dataIndex].data[pixelIndex + offset] =
                originalData.data[pixelIndex + offset];
            }
          }
        }
      }
      // return a array of canvas
      return imageDatas.map(data => {
        const $c = $canvas.cloneNode(true);
        // putImageData used to put a ImageData on a canvas
        $c.getContext("2d").putImageData(data, 0, 0);
        return $c;
      });
    },
    replaceElementVisually($old, $new) {
      // play audio when the hero becomes dust
      // this.playAudio();
      // offsetParent could get all attrs
      const $parent = $old.offsetParent;
      $new.style.top = `${$old.offsetTop}px`;
      $new.style.left = `${$old.offsetLeft}px`;
      $new.style.width = `${$old.offsetWidth}px`;
      $new.style.height = `${$old.offsetHeight}px`;
      $parent.appendChild($new);
      $old.style.visibility = "hidden";
    },
    sleep(delay) {
      return new Promise(resovle => {
        setTimeout(() => {
          resovle();
        }, delay || 1000);
      });
    },
    snapToDust($elm) {
      return new Promise(resolve => {
        html2canvas($elm, {
          allowTaint: true
        }).then($canvas => {
          // create a container
          const $container = document.createElement("div");
          $container.classList.add("dust-container");
          // frames for animation
          const $frames = this.generateFrames($canvas);
          $frames.forEach(($frame, i) => {
            $frame.style.transitionDelay = `${(1.35 * i) / $frames.length}s`;
            $container.appendChild($frame);
          });
          // insert canvas into DOM over the element
          this.replaceElementVisually($elm, $container);
          // animate them
          $container.offsetLeft;
          $frames.forEach($frame => {
            const randomRadian = 2 * Math.PI * (Math.random() - 0.5);
            // rotate(${15 * (Math.random() - 0.5)}deg)
            $frame.style.transform = `rotate(${15 *
              (Math.random() - 0.5)}deg) translate(${60 *
              Math.cos(randomRadian)}px, ${30 * Math.sin(randomRadian)}px)`;
            $frame.style.opacity = 0;
          });
          resolve();
        });
      });
    }
  }
};
</script>

<style lang="scss">
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
      background-position: 0 0;
    }
    .snapping {
      -webkit-animation: gloveAni 2.8s steps(47) both;
      animation: gloveAni 2.8s steps(47) both;
    }
    .glove-reverse {
      background: url("../../assets/images/thanos/thanos_reverse.png");
      background-position: 0 0;
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
//thanos动画
@keyframes gloveAni {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -3760px 0;
  }
}
.dust-container {
  position: absolute;
  pointer-events: none;
}
.dust-container canvas {
  position: absolute;
  left: 0;
  top: 0;
  transition: transform 1s ease-out, opacity 1s ease-out;
  opacity: 1;
  transform: rotate(0deg) translate(0px, 0px) rotate(0deg);
}
</style>
