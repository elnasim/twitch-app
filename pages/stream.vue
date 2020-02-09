<template>
  <div class="stream">
    <div :style="`width: ${playerSize}%`" class="player-wrapper">
      <div
        @dblclick="changePlayerSize()"
        @click="closeQualities()"
        class="player__controls"
      >
        <div @click.stop="_back()" class="player__back">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div @click.stop="showQualities()" class="player__change-quality">
          <i class="fas fa-cog"></i>
        </div>
        <div class="player__qualities"></div>
      </div>

      <div ref="player" class="player"></div>

      <QualityChange
        :qualities="qualities"
        :isShow="showQualityChange"
        :changeQuality="changeQuality"
      />
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
import QualityChange from '~/components/stream-page/QualityChange'

export default {
  layout: 'stream-page',
  components: { QualityChange },
  data: () => ({
    userName: null,
    playerSize: 70,
    player: null,
    qualities: [],
    showQualityChange: false
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
      this.qualities = this.player.getQualities()
    })
  },
  methods: {
    showQualities() {
      this.showQualityChange = true
    },
    closeQualities() {
      this.showQualityChange = false
    },
    changeQuality(q) {
      this.player.setQuality(q)
      this.showQualityChange = false
    },
    changePlayerSize() {
      if (this.playerSize === 100) {
        this.playerSize = 70
      } else if (this.playerSize === 70) {
        this.playerSize = 100
      }
    },
    _back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  position: relative;
}

.player-wrapper {
  position: relative;
}

.player {
  height: 100%;
  .player-video {
    .avap-ads-container,
    .ima-ads-container {
      display: none !important;
    }
  }
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
  user-select: none;
}

.player__change-quality {
  color: #ffffff;
  user-select: none;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  i {
    font-size: 30px;
  }
}

.player__back {
  color: #ffffff;
  user-select: none;
  position: absolute;
  left: 10px;
  top: 10px;
  cursor: pointer;
  i {
    font-size: 30px;
  }
}

.chat {
  flex: 1;
}
</style>
