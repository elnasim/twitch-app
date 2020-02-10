<template>
  <div class="favorites-page"></div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('favorites/getFavorites')
  }
}
</script>

<style lang="scss" scoped></style>
