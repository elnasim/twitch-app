<template>
  <div>
    <div class="games">
      <Game
        v-for="item of _getGames"
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
    isLoading: false
  }),
  computed: {
    _getGames() {
      return this.$store.state.games
    }
  },
  mounted() {
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
      if (y >= bodyHeight - 50 && !this.isLoading) {
        this.__moreGames()
      }
    })
  },
  methods: {
    async __getGames() {
      this.isLoading = true
      await this.$store.dispatch('getGames')
      this.isLoading = false
    },
    async __moreGames() {
      this.isLoading = true
      await this.$store.dispatch('getMoreGames')
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
