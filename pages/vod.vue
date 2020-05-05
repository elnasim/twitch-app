<template>
  <div class="vod-page">
    <div ref="player" class="player"></div>
  </div>
</template>

<script>
export default {
  layout: 'stream-page',
  data: () => ({
    videoId: null,
    player: null
  }),
  mounted() {
    this.videoId = this.$route.query.id

    const options = {
      width: '100%',
      height: '100%',
      video: this.videoId,
      theme: 'dark'
    }

    // eslint-disable-next-line
    this.player = new Twitch.Player(this.$refs.player, options)
  }
}
</script>

<style lang="scss" scoped>
.vod-page {
  height: 100vh;
}
.player {
  height: 100vh;
  .player-video {
    .avap-ads-container,
    .ima-ads-container {
      display: none !important;
    }
  }
}
</style>
