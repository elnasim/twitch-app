<template>
  <nuxt-link to="/game" class="game">
    <div
      class="game__img"
      style="background-image: url('https://cdn.vox-cdn.com/thumbor/3xHq2Shga3kfsw-lTM2Vlss3CgM=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/65093706/mdoying_180118_2249_0338stills.0.jpg')"
    ></div>
    <div class="game__info">
      <div class="game__title">Lol</div>
      <div class="game__viewers">1000 зрителей</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.game {
  display: flex;
  border-bottom: 1px solid rgba(#fff, 0.5);
}

.game__img {
  width: 20%;
  background-size: cover;
  background-position: center;
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
