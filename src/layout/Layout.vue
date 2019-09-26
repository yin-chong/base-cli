<template>
  <div class="g-layout">
    <header-nav-bar></header-nav-bar>
    <side-nav-bar></side-nav-bar>

    <router-view></router-view>
  </div>
</template>

<script>
  import { SideNavBar, HeaderNavBar } from './components'

  export default {
    name: 'Layout',

    components: {
      SideNavBar,
      HeaderNavBar
    }
  }
</script>

<style scoped>

</style>
