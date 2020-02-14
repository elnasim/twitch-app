<template>
  <div class="setting-page">
    <a v-if="!_isAuth" href="/auth" class="setting-item">Авторизация</a>
    <a v-if="_isAuth" href="/logout" class="setting-item">Выход</a>
  </div>
</template>

<script>
export default {
  computed: {
    _isAuth() {
      return this.$store.state.auth.isAuth
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-item {
  display: block;
  padding: 20px;
  text-decoration: none;
  color: #ffffff;
  border-bottom: 1px solid #fff;
}
</style>
