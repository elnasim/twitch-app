<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('auth/auth')
  }
}
</script>

<style></style>
