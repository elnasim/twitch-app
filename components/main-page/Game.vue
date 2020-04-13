<template>
  <nuxt-link :to="`/game?title=${title}&id=${id}&lang=all`" class="game">
    <div :style="`background-image: url(${img})`" class="game__img"></div>
    <div class="game__info">
      <div class="game__title">{{ title }}</div>
      <div v-if="viewers" class="game__viewers">{{ viewers }} зрителей</div>
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
  border-bottom: 1px solid rgba(#fff, 0.5);
  height: 200px;
}

.game__img {
  background-size: cover;
  background-position: center;
  width: 40%;
  display: block;
  overflow: hidden;
  &::before {
    content: '';
    float: left;
    padding-top: 140%;
  }
}

.game__info {
  padding: 20px;
  flex: 1;
}

.game__title {
  color: #ffffff;
}

.game__viewers {
  color: rgba(#fff, 0.7);
}
</style>
