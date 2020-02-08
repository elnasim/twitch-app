<template>
  <nuxt-link to="/game" class="game">
    <img :src="`${_img}`" alt="" class="game__img" />
    <div class="game__info">
      <div class="game__title">{{ title }}</div>
      <!-- <div class="game__viewers">1000 зрителей</div> -->
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['title', 'img'],
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
}

.game__img {
  width: 20%;
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
