<template>
  <nav class="nav">
    <nuxt-link to="/" class="nav__link">Игры</nuxt-link>
    <nuxt-link to="/1" class="nav__link">Подписки</nuxt-link>
    <nuxt-link to="/2" class="nav__link">Настройки</nuxt-link>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.nav {
  background-color: #000;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.nav__link {
  color: #ffffff;
  display: block;
  width: 140px;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &.nuxt-link-exact-active {
    background-color: #fff;
    color: #000000;
  }
}
</style>
