<template>
  <div class="favorites-page">
    <nuxt-link v-if="_isAuth === false" to="/auth" class="favotites-auth-btn">
      Авторизация
    </nuxt-link>

    <div v-else-if="_isAuth === true" class="favorites-page-row">
      <div
        v-for="item of _favorites"
        :key="item._id"
        class="favorites-page-col"
      >
        <Stream
          :preview="item.preview.large"
          :userName="item.channel.display_name"
          :title="item.channel.status"
          :viewers="item.viewers"
          :channelId="item.channel._id.toString()"
          :channelLang="item.channel.language"
          :apiType="'kraken'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Stream from '~/components/game-page/Stream'

export default {
  components: { Stream },
  computed: {
    _isAuth() {
      return this.$store.state.auth.isAuth
    },

    _favorites() {
      return this.$store.state.favorites.favorites
    }
  },
  mounted() {
    this.__getFavorites()
  },
  methods: {
    __getFavorites() {
      this.$store.dispatch('favorites/getFavorites')
    }
  }
}
</script>

<style lang="scss" scoped>
.favorites-page {
  padding: 40px 0;
}

.favorites-page-row {
  display: flex;
  flex-wrap: wrap;
}

.favotites-auth-btn {
  display: block;
  width: 100%;
  max-width: 400px;
  text-align: center;
  background-color: #fff;
  color: #000000;
  padding: 20px 4px;
  border-radius: 4px;
  margin: 40px auto;
}

.favorites-page-col {
  width: 33.33%;
  padding: 0 10px;
}
</style>
