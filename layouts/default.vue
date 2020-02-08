<template>
  <div class="layout-default">
    <Header />
    <div class="content">
      <nuxt />
    </div>
    <Nav />
  </div>
</template>

<script>
import Nav from '~/components/app/Nav'
import Header from '~/components/app/Header'

export default {
  components: {
    Nav,
    Header
  }
}
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 50px;
}

.content {
  flex: 1;
}
</style>
