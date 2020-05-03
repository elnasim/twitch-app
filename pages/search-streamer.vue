<template>
  <div class="search-page">
    <div class="search-top">
      <nuxt-link to="/search-game" class="search-top__link">
        Поиск игр
      </nuxt-link>
    </div>

    <div class="search-form-wrapper">
      <form @submit.prevent="onSearch" class="search-form">
        <input v-model="input" type="text" class="search-form__input" />
        <button class="search-form__btn">Поиск</button>
      </form>
    </div>

    <div v-if="data" class="search-page__row">
      <div v-for="item of data" :key="item._id" class="col">
        <StreamerPreview
          :img="item.logo"
          :title="item.display_name"
          :id="+item._id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StreamerPreview from '~/components/search-page/StreamerPreview'

export default {
  components: { StreamerPreview },
  data: () => ({
    input: '',
    data: ''
  }),
  methods: {
    async onSearch() {
      const config = {
        headers: {
          accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
        }
      }

      try {
        const data = await this.$axios.$get(
          `https://api.twitch.tv/kraken/users?login=${this.input}`,
          config
        )

        this.data = data.users
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.search-top {
  margin-bottom: 50px;
}

.search-top__link {
  background-color: #fff;
  color: #000000;
  display: block;
  text-align: center;
  padding: 10px;
}

.search-form-wrapper {
  padding: 0 10px;
}

.search-form {
  display: flex;
  align-items: stretch;
  margin-bottom: 20px;
}

.search-form__input {
  border: none;
  background-color: #fff;
  padding: 10px;
  flex: 1;
  font-size: 20px;
}

.search-form__btn {
  width: 150px;
  border: none;
  cursor: pointer;
  background-color: #a30f2c;
  color: #ffffff;
  font-size: 20px;
}

.search-page__row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  width: 25%;
  padding: 0 10px;
}
</style>
