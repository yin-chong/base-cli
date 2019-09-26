<template>
  <div class="g-page g-page-dashboard">
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',

    data () {
      return {}
    },

    async created () {
      const [err, res] = await this.$api.getItems()
      console.log(res)
    }
  }
</script>

<style scoped>

</style>
