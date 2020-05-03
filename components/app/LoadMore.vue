<template>
  <a @click.prevent="loadMore" href="#" class="load-more">Загрузить еще</a>
</template>

<script>
export default {
  props: {
    loadMore: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.load-more {
  display: block;
  background-color: #fff;
  color: #000;
  padding: 10px;
  text-align: center;
}
</style>
