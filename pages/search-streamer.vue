<template>
  <div class="search-page">
    <div class="search-top">
      <nuxt-link to="/search-game" class="search-top__link">
        Поиск игр
      </nuxt-link>
    </div>

    <div class="search-form-wrapper">
      <form @submit.prevent="__search" class="search-form">
        <input
          v-model="input"
          type="text"
          class="search-form__input"
          placeholder="Введите ник стримера"
        />
        <button class="search-form__btn">Поиск</button>
      </form>
    </div>

    <div v-if="_getData" class="search-page__row">
      <div v-for="item of _getData" :key="item._id" class="col">
        <StreamerPreview
          :img="item.logo"
          :title="item.display_name"
          :id="+item._id"
        />
      </div>
    </div>

    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import StreamerPreview from '~/components/search-page/StreamerPreview'
import Loading from '~/components/app/Loading'

export default {
  components: { StreamerPreview, Loading },
  data: () => ({
    input: '',
    isLoading: false
  }),
  computed: {
    _getData() {
      if (this.$store.state.search.searchData) {
        return this.$store.state.search.searchData
      }

      return null
    }
  },
  created() {
    this.$store.dispatch('search/clearData')
  },
  methods: {
    async __search() {
      if (this.input.trim().length > 2) {
        this.isLoading = true
        await this.$store.dispatch('search/getChannels', this.input)
        this.input = ''
        this.isLoading = false
      }
      return false
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

  @media (max-width: 991px) {
    width: 50%;
  }

  @media (max-width: 479px) {
    width: 100%;
  }
}
</style>
