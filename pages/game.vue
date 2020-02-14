<template>
  <div>
    <div class="game-page">
      <Stream
        v-for="item of streams"
        :key="item._id"
        :preview="item.preview.large"
        :title="item.channel.status"
        :userName="item.channel.name"
        :viewers="item.viewers"
        :logo="item.channel.logo"
        :channelId="item.channel._id"
      />
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Stream from '~/components/game-page/Stream'
import Loading from '~/components/app/Loading'

export default {
  components: { Stream, Loading },
  data: () => ({
    isLoading: false,
    title: '',
    streams: null,
    paginationID: null
  }),
  mounted() {
    this.title = this.$route.query.title

    this.__getStreams()

    window.addEventListener('scroll', () => {
      const bodyHeight = document.body.clientHeight
      const yOffset = window.pageYOffset
      const windowHeight = window.innerHeight
      const y = yOffset + windowHeight
      if (y >= bodyHeight - 150 && !this.isLoading) {
        this.__moreStreams()
      }
    })
  },
  methods: {
    async __getStreams() {
      this.isLoading = true
      const config = {
        headers: {
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          accept: 'application/vnd.twitchtv.v5+json'
        }
      }

      const data = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/?game=${this.title}`,
        config
      )

      this.streams = data.streams
      this.paginationID = 25
      this.isLoading = false
    },

    async __moreStreams() {
      this.isLoading = true
      const config = {
        headers: {
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          accept: 'application/vnd.twitchtv.v5+json'
        }
      }
      const data = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/?game=${this.title}&offset=${this.paginationID}`,
        config
      )

      this.streams = this.streams.concat(data.streams)
      this.paginationID = this.paginationID + 25
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.game-page {
  display: flex;
  flex-wrap: wrap;
}
</style>
