<template>
  <div>
    <nuxt-link v-if="!_isAuth" to="/auth">Авторизация</nuxt-link>

    <div v-else class="favorites-page">
      <Stream
        v-for="item of _getFavorites"
        :key="item._id"
        :preview="item.preview.large"
        :title="item.channel.status"
        :userName="item.channel.name"
        :viewers="item.viewers"
        :logo="item.channel.logo"
        :channelId="item.channel._id"
      />
    </div>
  </div>
</template>

<script>
import Stream from '~/components/favorites-page/Stream'
export default {
  components: { Stream },
  computed: {
    _isAuth() {
      return this.$store.state.auth.isAuth
    },

    _getFavorites() {
      return this.$store.state.favorites.favorites
    }
  },
  mounted() {
    this.$store.dispatch('favorites/getFavorites')
  }
}
</script>

<style lang="scss" scoped>
.favorites-page {
  display: flex;
  flex-wrap: wrap;
}
</style>
