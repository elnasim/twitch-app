<template>
  <div ref="layout" class="layout-stream">
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.layout.requestFullscreen()
    this.$store.dispatch('auth/validateAuth')
  }
}
</script>
>

<style lang="scss" scoped>
.content {
  height: 100vh;
}
</style>
