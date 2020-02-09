<template>
  <div class="stream">
    <div :style="`width: ${playerSize}%`" class="player-wrapper">
      <div class="player__controls">
        <div @click="showQualities" class="player__change-quality">
          <i class="fas fa-cog"></i>
        </div>
        <div class="player__qualities"></div>
      </div>

      <div ref="player" class="player"></div>
    </div>

    <div class="chat">
      <iframe
        :src="`https://www.twitch.tv/embed/${userName}/chat?darkpopout`"
        frameborder="0"
        scrolling="no"
        height="100%"
        width="100%"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'stream-page',
  data: () => ({
    userName: null,
    playerSize: 70,
    player: null
  }),
  mounted() {
    this.userName = this.$route.query.channel
    const options = {
      channel: this.userName,
      controls: false,
      width: '100%',
      height: '100%',
      allowfullscreen: true
    }
    // eslint-disable-next-line
    this.player = new Twitch.Player(this.$refs.player, options)
    // eslint-disable-next-line
    this.player.addEventListener(Twitch.Player.PLAYING, () => {
      // const quality = this.player.getQualities()
    })
  },
  methods: {
    showQualities() {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

.player-wrapper {
  position: relative;
}

.player {
  height: 100%;
}

.player__controls {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 1;
  justify-content: flex-end;
}

.player__change-quality {
  color: #ffffff;
  align-self: flex-end;
  padding: 10px;
  user-select: none;
  cursor: pointer;
  i {
    font-size: 30px;
  }
}

.chat {
  flex: 1;
}
</style>
