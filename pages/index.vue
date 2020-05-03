<template>
  <div>
    <div class="games">
      <div v-for="item of _games" :key="item.game._id" class="col">
        <Game
          :img="item.game.box.large"
          :title="item.game.name"
          :id="item.game._id"
          :viewers="item.viewers"
        />
      </div>
    </div>
    <Loading v-if="isLoading" />

    <LoadMore :loadMore="__moreGames" v-if="!isLoading" />
  </div>
</template>

<script>
import Game from '@/components/main-page/Game'
import Loading from '@/components/app/Loading'
import LoadMore from '@/components/app/LoadMore'

export default {
  components: { Game, Loading, LoadMore },
  data: () => ({
    isLoading: false
  }),
  computed: {
    _games() {
      return this.$store.state.main.data
    }
  },
  mounted() {
    // перенаправление на главную при получении токена атворизации
    if (this.$route.hash) {
      this.$store.dispatch('auth/setToken', this.$route.hash)
      this.$router.push('/')
    }
    this.__getGames()
  },
  methods: {
    async __moreGames() {
      this.isLoading = true
      await this.$store.dispatch('main/moreGames')
      this.isLoading = false
    },

    async __getGames() {
      this.isLoading = true
      await this.$store.dispatch('main/getGames')
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.games {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
}

.col {
  width: 20%;
  padding: 0 10px;
  @media (max-width: 1199px) {
    width: 25%;
  }
  @media (max-width: 991px) {
    width: 33.33%;
  }
  @media (max-width: 767px) {
    width: 50%;
  }
}
</style>
