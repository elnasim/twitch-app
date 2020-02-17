<template>
  <div class="stream">
    <div ref="playerWrapper" class="player-wrapper">
      <div
        @dblclick="changePlayerSize()"
        @click="closeQualities()"
        class="player__controls"
      >
        <div @click.stop="_back()" class="player__back">
          <i class="fas fa-arrow-left"></i>
        </div>

        <div @click.stop="_unFollow()" v-if="isFollowed" class="player__follow">
          <i class="fas fa-heart"></i>
        </div>
        <div @click.stop="_follow()" v-else class="player__unfollow">
          <i class="far fa-heart"></i>
        </div>

        <div @click.stop="showQualities()" class="player__change-quality">
          <i class="fas fa-cog"></i>
        </div>

        <div class="player__qualities"></div>

        <div v-if="isPlayerLoading" class="player__loading">
          Loading...
        </div>
      </div>

      <div ref="player" class="player"></div>

      <QualityChange
        :qualities="qualities"
        :isShow="showQualityChange"
        :changeQuality="changeQuality"
        :currQuality="currQuality"
      />
    </div>

    <div
      :style="isPlayerFull ? 'display: none' : 'display: block'"
      class="chat"
    >
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
    userID: null,
    player: null,
    qualities: [],
    currQuality: null,
    showQualityChange: false,
    isPlayerFull: false,
    isPlayerLoading: false,
    isFollowed: false
  }),
  mounted() {
    this.isPlayerLoading = true

    this.userName = this.$route.query.channel
    this.userID = this.$route.query.id

    const options = {
      channel: this.userName,
      controls: false,
      width: '100%',
      height: '100%'
    }

    // eslint-disable-next-line
    this.player = new Twitch.Player(this.$refs.player, options)

    // eslint-disable-next-line
    this.player.addEventListener(Twitch.Player.PLAYING, () => {
      this.qualities = this.player.getQualities()
      this.isPlayerLoading = false
      this.currQuality = this.player.getQuality()
    })

    this.__checkFollowChannel()
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
      this.isPlayerFull = !this.isPlayerFull
    },

    _back() {
      this.$router.back()
    },

    async _follow() {
      const userID = this.$store.state.auth.userID
      const data = await this.$store.dispatch('favorites/followChannel', [
        userID,
        this.userID
      ])
      if (data) {
        this.isFollowed = true
      }
    },

    async _unFollow() {
      const res = confirm('Вы уверены, что хотите отписаться?')

      if (res) {
        const userID = this.$store.state.auth.userID
        const data = await this.$store.dispatch('favorites/unFollowChannel', [
          userID,
          this.userID
        ])
        if (data) {
          this.isFollowed = false
        }
      }
    },

    async __checkFollowChannel() {
      await this.$store.dispatch('auth/validateAuth')
      const userID = this.$store.state.auth.userID
      const data = await this.$store.dispatch('favorites/checkFollowChannel', [
        userID,
        this.userID
      ])
      this.isFollowed = data
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
  flex: 1;
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
  z-index: 4;
  i {
    font-size: 30px;
  }
}

.player__follow,
.player__unfollow {
  color: #ffffff;
  user-select: none;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  z-index: 4;
  i {
    font-size: 30px;
  }
}

.player__loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(#000, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: #ffffff;
}

.chat {
  width: 30%;
}
</style>
