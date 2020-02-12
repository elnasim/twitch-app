<template>
  <div class="setting-page">
    <a v-if="!_isAuth" href="/auth" class="setting-item">Авторизация</a>
    <a v-if="_isAuth" href="/logout" class="setting-item">Выход</a>
    <button @click="test123()">test</button>
  </div>
</template>

<script>
export default {
  computed: {
    _isAuth() {
      return this.$store.state.auth.isAuth
    }
  },
  methods: {
    test123() {
      this.$store.dispatch('favorites/followChannel')
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
