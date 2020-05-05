<template>
  <div class="stream">
    <Player :userName="userName" :streamerID="streamerID" />

    <!-- <Chat :isPlayerFull="isPlayerFull" :userName="userName" /> -->
  </div>
</template>

<script>
// import Chat from '@/components/stream-page/Chat'
import Player from '@/components/stream-page/Player'

export default {
  layout: 'stream-page',
  components: { Player },
  data: () => ({
    userName: null,
    streamerID: null,
    isPlayerFull: false
  }),
  created() {
    this.userName = this.$route.query.channel
    this.streamerID = this.$route.query.id
  }
}
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  position: relative;
  height: 100vh;
}
</style>
