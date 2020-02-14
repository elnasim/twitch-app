<template>
  <div class="col">
    <nuxt-link :to="`/game?title=${title}&lang=all`" class="game">
      <img :src="`${img}`" alt="" class="game__img" />
      <div class="game__info">
        <div class="game__title">{{ title }}</div>
        <div class="game__viewers">{{ viewers }} зрителей</div>
      </div>
    </nuxt-link>
  </div>
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
.col {
  width: 50%;
}

.game {
  display: flex;
  border-bottom: 1px solid rgba(#fff, 0.5);
}

.game__img {
  height: 380px;
  width: 285px;
  display: block;
}

.game__info {
  padding: 20px;
}

.game__title {
  color: #ffffff;
}

.game__viewers {
  color: rgba(#fff, 0.7);
}
</style>
