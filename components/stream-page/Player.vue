<template>
  <div
    ref="playerWrapper"
    :class="isPlayerFull ? 'full' : ''"
    class="player-wrapper"
  >
    <div
      @dblclick="__dblClickHandler"
      @click="__closeQualities(), __toggleControls()"
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

        <div
          @click.stop="__follow()"
          v-if="!isFollowed"
          class="player__unfollow"
        >
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
            <div class="stream__viewers">{{ streamInfo.viewers }} зрителей</div>
          </div>

          <div @click.stop="__showQualities()" class="player__change-quality">
            <i class="fas fa-cog"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isPlayerLoading" class="player__loading">
      Loading...
    </div>

    <QualityChange
      v-if="qualities"
      :qualities="qualities"
      :isShow="showQualityChange"
      :changeQuality="__changeQuality"
      :currQuality="currQuality"
    />

    <div ref="player" class="player"></div>
  </div>
</template>

<script>
import QualityChange from '@/components/stream-page/QualityChange'
import {
  getStreamInfo,
  checkFollowChannel,
  followChannel,
  unFollowChannel
} from '@/core/api/api'
export default {
  components: { QualityChange },
  props: {
    userName: {
      type: String,
      default: ''
    },
    streamerID: {
      type: String,
      default: ''
    },
    changePlayerSize: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    isShowControls: false,
    isFollowed: false,
    streamInfo: null,
    isPlayerLoading: false,
    player: null,
    qualities: null,
    currQuality: null,
    showQualityChange: false,
    isPlayerFull: true
  }),
  mounted() {
    this.isPlayerLoading = true

    const options = {
      channel: this.userName,
      width: '100%',
      height: '100%',
      theme: 'dark',
      controls: false
    }

    // eslint-disable-next-line
    this.player = new Twitch.Player(this.$refs.player, options)

    // eslint-disable-next-line
    this.player.addEventListener(Twitch.Player.PLAYING, () => {
      this.qualities = this.player.getQualities()
      this.isPlayerLoading = false
      this.currQuality = this.player.getQuality()
      this.player.setMuted(false)
    })

    this.__getStreamInfo()

    this.__checkFollowChannel()
  },
  methods: {
    __dblClickHandler() {
      this.isPlayerFull = !this.isPlayerFull
    },

    __closeQualities() {
      this.showQualityChange = false
    },

    __toggleControls() {
      if (!this.isShowControls) {
        this.isShowControls = true
      } else {
        this.isShowControls = false
      }
    },

    __back() {
      this.$router.back()
    },

    async __unFollow() {
      const res = confirm('Вы уверены, что хотите отписаться?')

      if (res) {
        const userID = this.$store.state.auth.userID
        const token = localStorage.getItem('myTwitchToken')
        const data = await unFollowChannel(userID, this.streamerID, token)
        if (data) {
          this.isFollowed = false
        }
      }
    },

    async __follow() {
      const userID = this.$store.state.auth.userID
      const token = localStorage.getItem('myTwitchToken')
      const data = await followChannel(userID, this.streamerID, token)
      if (data) {
        this.isFollowed = true
      }
    },

    __showQualities() {
      this.showQualityChange = true
    },

    __changeQuality(q) {
      this.player.setQuality(q)
      this.showQualityChange = false
    },

    async __getStreamInfo() {
      const { data } = await getStreamInfo(this.streamerID)
      this.streamInfo = data.stream
    },

    async __checkFollowChannel() {
      await this.$store.dispatch('auth/validateAuth')
      const userID = this.$store.state.auth.userID
      const token = localStorage.getItem('myTwitchToken')

      const data = await checkFollowChannel(userID, this.streamerID, token)

      if (data) {
        this.isFollowed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player-wrapper {
  position: relative;
  width: 70%;
  @media (max-width: 575px) {
    width: 100%;
  }
  &.full {
    width: 100%;
  }
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
  height: 100%;
  width: 100%;
  pointer-events: none;
  &.active {
    opacity: 1;
    user-select: all;
    pointer-events: all;
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
