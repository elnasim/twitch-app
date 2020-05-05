<template>
  <nuxt-link :to="`/streamer?name=${title}`" class="streamer-preview">
    <div
      :style="`background-image: url(${img})`"
      class="streamer-preview__preview"
    ></div>

    <div class="streamer-preview__info">
      <div class="streamer-preview__name">{{ title }}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.streamer-preview {
  margin-bottom: 40px;
  display: block;
}

.streamer-preview__preview {
  height: 300px;
  background-size: cover;
  background-position: center;
}

.streamer-preview__info {
  color: #ffffff;
}
</style>
