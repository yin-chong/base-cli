<template>
  <div class="component-svg-container">
    <svg aria-hidden="true" :style="{
      width: svgSizeConfig['width'] || '64px',
      height: svgSizeConfig['height'] || '64px'
    }">
      <use :xlink:href="iconSymbolId"></use>
    </svg>
  </div>
</template>

<script>
  import '@/assets/icon/iconfont'

  export default {
    name: 'svg-icon',

    props: {
      iconSymbolId: {
        type: String,
        required: true
      },
      svgSizeConfig: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .component-svg-container svg {
    width: 64px;
    height: 64px;
  }
</style>
