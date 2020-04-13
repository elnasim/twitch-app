<template>
  <nuxt-link
    :to="`/game?title=${title}&id=${id}&lang=all`"
    :style="`background-image: url(${img})`"
    class="game"
  >
    <div class="game__info">
      <div class="game__title">{{ title }}</div>
      <div v-if="viewers" class="game__viewers">
        <span class="game__round-viewers"></span>
        {{ viewers }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: null
    },
    viewers: {
      type: Number,
      default: null
    }
  },
  computed: {
    _img() {
      const str = this.img.slice(0, -20)
      return `${str}285x380.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  display: flex;
  margin-bottom: 20px;
  background-size: cover;
  background-position: center;
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border-radius: 4px;
  &::before {
    content: '';
    float: left;
    padding-top: 140%;
  }
}

.game__info {
  background-color: #191919;
  padding: 10px;
}

.game__title {
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game__viewers {
  color: rgba(#fff, 0.7);
}

.game__round-viewers {
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
}
</style>
