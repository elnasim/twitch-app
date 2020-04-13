<template>
  <div class="stream">
    <div ref="playerWrapper" class="player-wrapper">
      <div
        @dblclick="__changePlayerSize()"
        @click="__closeQualities(), __showControls()"
        class="player__controls-wrap"
      >
        <div :class="{ active: isShowControls }" class="player__controls">
          <div @click.stop="__back()" class="player__back">
            <i class="fas fa-arrow-left"></i>
          </div>

          <div
            @click.stop="__unFollow()"
            v-if="isFollowed"
            class="player__follow"
          >
            <i class="fas fa-heart"></i>
          </div>
          <div @click.stop="__follow()" v-else class="player__unfollow">
            <i class="far fa-heart"></i>
          </div>

          <div v-if="streamInfo" class="stream__info">
            <div class="stream__info-logo-col">
              <div
                :style="`background-image: url(${streamInfo.channel.logo})`"
                class="stream__logo"
              ></div>
            </div>
            <div class="stream__info-info-col">
              <div class="stream__streamer">
                {{ streamInfo.channel.display_name }}
              </div>
              <div class="stream__title">{{ streamInfo.channel.status }}</div>
              <div class="stream__game">{{ streamInfo.game }}</div>
              <div class="stream__viewers">
                {{ streamInfo.viewers }} зрителей
              </div>
            </div>

            <div @click.stop="__showQualities()" class="player__change-quality">
              <i class="fas fa-cog"></i>
            </div>
          </div>
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
        :changeQuality="__changeQuality"
        :currQuality="currQuality"
      />
    </div>

    <Chat :isPlayerFull="isPlayerFull" :userName="userName" />
  </div>
</template>

<script>
import QualityChange from '~/components/stream-page/QualityChange'
import Chat from '~/components/stream-page/Chat'

export default {
  layout: 'stream-page',
  components: { QualityChange, Chat },
  data: () => ({
    userName: null,
    userID: null,
    player: null,
    qualities: [],
    currQuality: null,
    showQualityChange: false,
    isPlayerFull: false,
    isPlayerLoading: false,
    isFollowed: false,
    streamInfo: null,
    isShowControls: false
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

    this.__getStreamInfo()

    // eslint-disable-next-line
    this.player = new Twitch.Player(this.$refs.player, options)

    // eslint-disable-next-line
    this.player.addEventListener(Twitch.Player.PLAYING, () => {
      this.qualities = this.player.getQualities()
      this.isPlayerLoading = false
      this.currQuality = this.player.getQuality()
      this.player.setMuted(false)
    })

    this.__checkFollowChannel()
  },
  methods: {
    __showQualities() {
      this.showQualityChange = true
    },

    __closeQualities() {
      this.showQualityChange = false
    },

    __changeQuality(q) {
      this.player.setQuality(q)
      this.showQualityChange = false
    },

    __changePlayerSize() {
      this.isPlayerFull = !this.isPlayerFull
    },

    __back() {
      this.$router.back()
    },

    __showControls() {
      if (!this.isShowControls) {
        this.isShowControls = true
      } else {
        this.isShowControls = false
      }
    },

    async __follow() {
      const userID = this.$store.state.auth.userID
      const data = await this.$store.dispatch('favorites/followChannel', [
        userID,
        this.userID
      ])
      if (data) {
        this.isFollowed = true
      }
    },

    async __unFollow() {
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
    },

    async __getStreamInfo() {
      const data = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/${this.userID}`,
        {
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj'
          }
        }
      )
      this.streamInfo = data.stream
    }
  }
}
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  position: relative;
  height: 100vh;
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

.player__controls-wrap {
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

.player__controls {
  opacity: 0;
  transition: 0.25s;
  user-select: none;
  &.active {
    opacity: 1;
    user-select: all;
  }
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

.stream__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  padding: 10px;
  color: #ffffff;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  z-index: 5;
  user-select: none;
}

.stream__info-logo-col {
  padding: 0 10px;
}

.stream__info-info-col {
  flex: 1;
  padding: 0 10px;
}

.stream__logo {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 100%;
}
</style>
