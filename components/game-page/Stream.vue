<template>
  <div class="col">
    <nuxt-link
      :to="`/stream?channel=${userName}&id=${channelId}`"
      class="stream"
    >
      <div :style="`background-image: url(${_img})`" class="stream__preview">
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
      type: String,
      default: null
    },
    channelLang: {
      type: String,
      default: ''
    }
  },
  computed: {
    _img() {
      const str = this.preview.slice(0, -20)
      return `${str}300x200.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.col {
  width: 33.33%;
  @media (max-width: 991px) {
    width: 50%;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
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
  width: 30px;
  min-width: 30px;
  height: 30px;
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

.stream__viewers-round {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  background-color: red;
}
</style>
