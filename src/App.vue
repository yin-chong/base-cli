<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view :class="transName"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "app",
  data() {
    return {
      transName: ""
    };
  },
  components: {},
  created() {
  },
  computed: {
    ...mapGetters(['keepAlive'])
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transName = "slide-left";
      } else {
        this.transName = "slide-right";
      }
    },
  },
};
</script>

<style>
.slide-left,
.slide-right {
  width: 100%;
  position: absolute;
  left: 0;
}
.slide-left {
  animation: move-left 0.8s;
}
.slide-right {
  animation: move-right 0.8s;
}
@keyframes move-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes move-right {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
