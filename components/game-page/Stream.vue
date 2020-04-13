<template>
  <nuxt-link :to="`/stream?channel=${userName}&id=${channelId}`" class="stream">
    <div
      v-if="apiType === 'helix'"
      :style="`background-image: url(${_img})`"
      class="stream__preview"
    >
      <div class="stream__viewers">
        <span class="stream__viewers-round"></span>
        {{ viewers }} зрителей
      </div>
    </div>

    <div
      v-if="apiType === 'kraken'"
      :style="`background-image: url(${preview})`"
      class="stream__preview"
    >
      <div class="stream__viewers">
        <span class="stream__viewers-round"></span>
        {{ viewers }} зрителей
      </div>
    </div>

    <div class="stream__info">
      <!-- <img :src="logo" class="stream__logo" /> -->
      <div class="stream__info-row">
        <div class="stream__profile-name">
          [{{ channelLang }}] {{ userName }}
        </div>
        <div class="stream__title">{{ title }}</div>
      </div>
    </div>
  </nuxt-link>
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
      type: String,
      default: null
    },
    channelLang: {
      type: String,
      default: ''
    },
    apiType: {
      type: String,
      default: ''
    }
  },
  computed: {
    _img() {
      const str = this.preview.slice(0, -20)
      return `${str}600x400.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.stream__info {
  display: flex;
  padding: 10px 0;
}

.stream__info-row {
  overflow: hidden;
}

.stream__logo {
  width: 30px;
  min-width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 10px;
}

.stream__profile-name {
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stream__title {
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.stream__viewers-round {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  background-color: red;
}
</style>
