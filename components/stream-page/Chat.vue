<template>
  <div class="chat">
    <iframe
      :src="`https://www.twitch.tv/embed/${userName}/chat?darkpopout`"
      frameborder="0"
      scrolling="no"
      height="100%"
      width="100%"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  flex: 1;
}
</style>
