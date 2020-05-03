<template>
  <div ref="infiniteScroll" class="infiniteScroll">Loading...</div>
</template>

<script>
export default {
  mounted() {
    const options = {
      root: document.querySelector('.game-page'),
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(this.__callback, options)
    const target = this.$refs.infiniteScroll
    observer.observe(target)
  },
  methods: {
    __callback(entries, observer) {
      entries.forEach((entry) => {
        console.log('--->', entry.isIntersecting)
      })
    }
  }
}
</script>

<style></style>
