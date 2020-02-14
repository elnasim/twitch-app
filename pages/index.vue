<template>
  <div>
    <div class="games">
      <Game
        v-for="item of games"
        :key="item.game._id"
        :img="item.game.box.large"
        :title="item.game.name"
        :id="item.game._id"
        :viewers="item.viewers"
      />
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Game from '~/components/main-page/Game'
import Loading from '~/components/app/Loading'

export default {
  components: { Game, Loading },
  data: () => ({
    isLoading: false,
    games: null,
    paginationId: null
  }),
  mounted() {
    // перенаправление на главную при получении токена атворизации
    if (this.$route.hash) {
      this.$store.dispatch('auth/setToken', this.$route.hash)
      this.$router.push('/')
    }

    this.__getGames()

    window.addEventListener('scroll', () => {
      const bodyHeight = document.body.clientHeight
      const yOffset = window.pageYOffset
      const windowHeight = window.innerHeight
      const y = yOffset + windowHeight
      if (y >= bodyHeight - 150 && !this.isLoading) {
        this.__moreGames()
      }
    })
  },
  methods: {
    async __moreGames() {
      this.isLoading = true
      const config = {
        headers: {
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          accept: 'application/vnd.twitchtv.v5+json'
        }
      }
      const data = await this.$axios.$get(
        `https://api.twitch.tv/kraken/games/top?offset=${this.paginationId}`,
        config
      )

      this.games = this.games.concat(data.top)
      this.paginationId = this.paginationId + 10
      this.isLoading = false
    },

    async __getGames() {
      this.isLoading = true

      const config = {
        headers: {
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          accept: 'application/vnd.twitchtv.v5+json'
        }
      }

      const data = await this.$axios.$get(
        'https://api.twitch.tv/kraken/games/top',
        config
      )

      this.paginationId = 10
      this.games = data.top
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.games {
  display: flex;
  flex-wrap: wrap;
}
</style>
