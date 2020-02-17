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
    this.$refs.layout.requestFullscreen().catch((err) => {
      console.log('-->', err)
    })
  }
}
</script>
>

<style lang="scss" scoped>
.content {
  height: 100vh;
}
</style>
