<template>
  <div>
    <a href="">Logout</a>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios.$post(
      'https://id.twitch.tv/oauth2/revoke?client_id=z97pdq1cei4wqu42l3kkkdnseq06bj&token=vlkukalk93bbikbzdrh7xyw5g5ykoq'
    )
  }
}
</script>

<style></style>
