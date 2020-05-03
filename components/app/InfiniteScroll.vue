<template>
  <div ref="infiniteScroll" class="infiniteScroll">Loading...</div>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['el'],
  mounted() {
    const options = {
      root: this.el,
      rootMargin: '0px',
      threshold: 1.0
    }

    window.addEventListener('scroll', function() {
      console.log('--->', 123)
      const observer = new IntersectionObserver(this.__callback, options)
      const target = this.$refs.infiniteScroll
      observer.observe(target)
    })
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

<style lang="scss">
.infiniteScroll {
  color: #ffffff;
}
</style>
