<template>
  <div>
    <div v-if="_streamerData" class="streamer-page">
      <div
        :style="`background-image:url(${_streamerData.profile_banner})`"
        class="streamer-page__header"
      >
        <div class="streamer-page__info">
          <div class="streamer-page__info-row">
            <div class="streamer-page__name">
              <div v-if="_streamerData.partner" class="streamer-page__patner">
                ✓
              </div>
              {{ _streamerData.display_name }}
            </div>
            <img :src="_streamerData.logo" class="streamer-page__logo" />
            <div class="streamer-page__views">
              {{ _streamerData.views }} просмотров
            </div>
          </div>
          <div class="streamer-page__desc">{{ _streamerData.description }}</div>
        </div>
      </div>

      <div v-if="_videosData" class="streamer-page__videos container">
        <div class="streamer-page__row-videos row">
          <StreamerVideo
            v-for="video in _videosData"
            :key="video._id"
            :preview="video.preview.large"
            :title="video.title"
            :duration="video.length"
            :views="video.views"
            :id="video._id"
          />
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import StreamerVideo from '@/components/streamer-page/StreamerVideo'
import Loading from '@/components/app/Loading'

export default {
  components: { StreamerVideo, Loading },
  computed: {
    _streamerData() {
      if (this.$store.state.streamer.data) {
        return this.$store.state.streamer.data
      }
      return null
    },
    _videosData() {
      if (this.$store.state.streamer.videos) {
        return this.$store.state.streamer.videos
      }
      return null
    }
  },
  mounted() {
    this.__loadStreamerData()
  },
  methods: {
    __loadStreamerData() {
      const streamerName = this.$route.query.name
      this.$store.dispatch('streamer/loadStreamerData', streamerName)
    }
  }
}
</script>

<style lang="scss" scoped>
.streamer-page__header {
  height: 300px;
  background-size: cover;
  background-position: center;
}

.streamer-page__info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  background: radial-gradient(
    circle,
    rgba(20, 20, 20, 1) 10%,
    rgba(255, 255, 255, 0) 100%
  );
  padding: 20px;
}

.streamer-page__info-row {
  display: flex;
  align-items: center;
}

.streamer-page__logo {
  width: 100px;
  border-radius: 100%;
  margin: 0 20px;
}

.streamer-page__name {
  font-size: 20px;
  display: flex;
  align-items: center;
}

.streamer-page__views {
  font-size: 20px;
}

.streamer-page__patner {
  background-color: #fff;
  border-radius: 100%;
  font-size: 12px;
  width: 16px;
  height: 16px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.streamer-page__videos {
  padding-top: 20px;
  padding-bottom: 2px;
}
</style>
