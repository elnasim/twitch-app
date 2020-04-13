<template>
  <div class="col">
    <nuxt-link
      :to="`/stream?channel=${userName}&id=${channelId}`"
      class="stream"
    >
      <div :style="`background-image: url(${preview})`" class="stream__preview">
        <div class="stream__viewers">{{ viewers }} зрителей</div>
      </div>
      <div class="stream__info">
        <div
          :style="`background-image: url(${logo})`"
          class="stream__logo"
        ></div>
        <div class="stream__info-row">
          <div class="stream__profile-name">{{ userName }}</div>
          <div class="stream__profile-name">{{ game }}</div>
          <div class="stream__title">{{ title }}</div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    preview: {
      type: String,
      default: ''
    },
    viewers: {
      type: Number,
      default: null
    },
    logo: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    channelId: {
      type: Number,
      default: null
    },
    game: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.col {
  width: 50%;
}

.stream {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.stream__info {
  display: flex;
  padding: 10px;
}

.stream__logo {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  margin-right: 10px;
}

.stream__profile-name {
  color: #ffffff;
}

.stream__title {
  color: #ffffff;
}

.stream__preview {
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  &::before {
    content: '';
    padding-top: 50%;
    float: left;
  }
}

.stream__viewers {
  color: #ffffff;
}
</style>
