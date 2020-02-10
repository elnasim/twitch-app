<template>
  <div>
    <div class="game-page">
      <Stream
        v-for="item of _getStreams"
        :key="item._id"
        :preview="item.preview.large"
        :title="item.channel.status"
        :userName="item.channel.name"
        :viewers="item.viewers"
        :logo="item.channel.logo"
        :channelId="item.channel._id"
      />
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Stream from '~/components/game-page/Stream'
import Loading from '~/components/app/Loading'
export default {
  components: { Stream, Loading },
  data: () => ({
    isLoading: false,
    title: ''
  }),
  computed: {
    _getStreams() {
      return this.$store.state.game.streams
    }
  },
  mounted() {
    this.title = this.$route.query.title
    this.__getStreams()

    window.addEventListener('scroll', () => {
      const bodyHeight = document.body.clientHeight
      const yOffset = window.pageYOffset
      const windowHeight = window.innerHeight
      const y = yOffset + windowHeight
      if (y >= bodyHeight && !this.isLoading) {
        this.__moreStreams()
      }
    })
  },
  methods: {
    async __getStreams() {
      this.isLoading = true
      await this.$store.dispatch('game/getGames', this.title)
      this.isLoading = false
    },
    async __moreStreams() {
      this.isLoading = true
      await this.$store.dispatch('game/moreGames', this.title)
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.game-page {
  display: flex;
  flex-wrap: wrap;
}
</style>
