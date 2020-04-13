<template>
  <div>
    <div class="game-page">
      <nuxt-link
        v-if="language === 'all'"
        :to="`/game?title=${title}&id=${id}&lang=ru`"
        class="language-filter"
      >
        Показать трансляции на русском
      </nuxt-link>
      <nuxt-link
        v-if="language === 'ru'"
        :to="`/game?title=${title}&id=${id}&lang=all`"
        class="language-filter"
      >
        Показать трансляции на всех языках
      </nuxt-link>
      <!-- <Stream
        v-for="item of streams"
        :key="item._id"
        :preview="item.preview.large"
        :title="item.channel.status"
        :userName="item.channel.name"
        :viewers="item.viewers"
        :logo="item.channel.logo"
        :channelId="item.channel._id"
      /> -->
      <div class="row-stream-page">
        <div class="col-stream-page" v-for="item of streams" :key="item.id">
          <Stream
            :preview="item.thumbnail_url"
            :userName="item.user_name"
            :title="item.title"
            :viewers="item.viewer_count"
            :channelId="item.user_id"
            :channelLang="item.language"
            :apiType="'helix'"
          />
        </div>
      </div>
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
    id: '',
    language: '',
    streams: null,
    paginationID: null,
    scrollLoadingData: null,
    cachedData: null
  }),
  watch: {},
  beforeRouteUpdate(to, from, next) {
    next()
    this.language = this.$route.query.lang
    this.__getStreams()
  },
  mounted() {
    this.title = this.$route.query.title
    this.language = this.$route.query.lang
    this.id = this.$route.query.id

    this.__getStreams()

    this.scrollLoadingData = () => {
      const bodyHeight = document.body.clientHeight
      const yOffset = window.pageYOffset
      const windowHeight = window.innerHeight
      const y = yOffset + windowHeight
      if (y >= bodyHeight - 150 && !this.isLoading) {
        this.__moreStreams()
      }
    }

    window.addEventListener('scroll', this.scrollLoadingData)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollLoadingData)
  },
  methods: {
    async __getStreams() {
      this.isLoading = true
      this.streams = null
      const config = {
        headers: {
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          accept: 'application/vnd.twitchtv.v5+json'
        }
      }

      let data

      if (this.language === 'all') {
        data = await this.$axios.$get(
          `https://api.twitch.tv/helix/streams/?game_id=${this.id}`,
          config
        )
      } else {
        data = await this.$axios.$get(
          `https://api.twitch.tv/helix/streams/?game_id=${this.id}&language=${this.language}`,
          config
        )
      }

      this.streams = data.data
      this.paginationID = data.pagination.cursor
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

      let data

      if (this.language === 'all') {
        data = await this.$axios.$get(
          `https://api.twitch.tv/helix/streams/?game_id=${this.id}&after=${this.paginationID}`,
          config
        )
      } else {
        data = await this.$axios.$get(
          `https://api.twitch.tv/helix/streams/?game_id=${this.id}&language=${this.language}&after=${this.paginationID}`,
          config
        )
      }

      this.streams = this.streams.concat(data.data)
      this.paginationID = data.pagination.cursor
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

.language-filter {
  width: 100%;
  user-select: none;
  background-color: rgba(#fff, 0.5);
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px;
}

.row-stream-page {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.col-stream-page {
  width: 33.33%;
  padding: 0 10px;

  @media (max-width: 767px) {
    width: 50%;
  }

  @media (max-width: 479px) {
    width: 100%;
  }
}
</style>
