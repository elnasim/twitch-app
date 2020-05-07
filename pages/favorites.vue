<template>
  <div class="favorites-page">
    <nuxt-link v-if="_isAuth === false" to="/auth" class="favotites-auth-btn">
      Авторизация
    </nuxt-link>

    <div v-else-if="_isAuth === true && _favorites" class="favorites-page-row">
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
          :channelId="item.channel._id"
          :channelLang="item.channel.language"
          :game="item.channel.game"
          :apiType="'kraken'"
        />
      </div>
    </div>

    <div v-if="_isAuth && !_favorites" class="no-streams">
      Активных стримов нет
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

    _favorites() {
      if (this.$store.state.favorites.favorites) {
        return this.$store.state.favorites.favorites
      }
      return null
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

  @media (max-width: 991px) {
    width: 50%;
  }

  @media (max-width: 479px) {
    width: 100%;
  }
}

.no-streams {
  color: #ffffff;
  width: 100%;
  text-align: center;
  padding: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
}
</style>
