<template>
  <div class="layout-default">
    <Nav />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Nav from '~/components/app/Nav'

export default {
  components: {
    Nav
  },
  mounted() {
    this.$store.dispatch('auth/validateAuth')
  }
}
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
}

.content {
  overflow-y: auto;
  width: 100%;

  @media (max-width: 767px) {
    flex: 1;
  }
}
</style>
