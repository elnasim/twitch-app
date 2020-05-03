<template>
  <header class="header">
    <div class="header__logo">Twitch</div>
    <nuxt-link to="/search-game" class="header__search">Search</nuxt-link>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  background-color: #000;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.header__logo {
  color: #ffffff;
}

.header__search {
  color: #ffffff;
}
</style>
