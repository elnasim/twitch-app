<template>
  <div :style="isPlayerFull ? 'display: none' : 'display: block'" class="chat">
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
    isPlayerFull: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  width: 30%;

  @media (max-width: 767px) {
    width: 100%;
    height: 1000px;
  }
}
</style>
