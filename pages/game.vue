<template>
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
</template>

<script>
import Stream from '~/components/game-page/Stream'
export default {
  components: { Stream },
  computed: {
    _getStreams() {
      return this.$store.state.game.streams
    }
  },
  mounted() {
    const title = this.$route.query.title
    this.$store.dispatch('game/getGames', title)
  }
}
</script>

<style lang="scss" scoped></style>
