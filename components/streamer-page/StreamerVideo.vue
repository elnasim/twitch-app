<template>
  <div class="streamer-page__col-videos col">
    <a :href="`/vod?id=${id}`" class="video-streamer-page streamer-page__video">
      <div
        :style="`background-image:url(${preview})`"
        class="video-streamer-page__preview"
      ></div>
      <div class="video-streamer-page__info">
        <div class="video-streamer-page__title">
          {{ title }}
        </div>

        <div class="video-streamer-page__time">
          Продолжительность: {{ _time }}
        </div>

        <div class="video-streamer-page__views">Просмотры: {{ views }}</div>
      </div>
    </a>
  </div>
</template>

<script>
import { slicePreview } from '@/core/functions'

export default {
  props: {
    preview: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: null
    },
    views: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    _preview() {
      if (this.preview) {
        const img = slicePreview(this.preview)
        return img
      }
      return 'https://vod-secure.twitch.tv/_404/404_processing_320x180.png'
    },
    _time() {
      const time = this.duration
      const hours = time / 60 / 60
      const hour = Math.floor(hours)
      const min = Math.floor((hours - hour) * 60)
      return `${hour}:${min}`
    }
  }
}
</script>

<style lang="scss" scoped>
.streamer-page__col-videos {
  width: 33.33%;
}

.video-streamer-page {
  color: #ffffff;
  font-size: 14px;
}

.video-streamer-page__preview {
  width: 100%;
  margin: auto;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  &::before {
    content: '';
    padding-top: 60%;
    float: left;
  }
}
</style>
