<template>
  <div class="search-page">
    <div class="search-top">
      <nuxt-link to="/search/games" class="search-top__link">
        Поиск стримеров
      </nuxt-link>
    </div>

    <form @submit.prevent="onSearch" class="search-form">
      <input v-model="input" type="text" class="search-form__input" />
      <button class="search-form__btn">Поиск</button>
    </form>

    <div v-if="data" class="search-page__row">
      <div v-for="item of data" :key="item._id" class="col">
        <Game
          :img="item.box.large"
          :title="item.name"
          :id="item._id"
          :viewers="item.popularity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Game from '~/components/main-page/Game'

export default {
  components: { Game },
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
          `https://api.twitch.tv/kraken/search/games?query=${this.input}`,
          config
        )

        this.data = data.games
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

.search-form {
  display: flex;
  align-items: stretch;
}

.search-form__input {
  border: none;
  background-color: #fff;
  padding: 10px;
  flex: 1;
}

.search-form__btn {
  width: 150px;
  border: none;
  cursor: pointer;
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
