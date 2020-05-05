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
      <div class="row-stream-page">
        <div v-for="item of _streams" :key="item.id" class="col-stream-page">
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

    <Loadmore :loadMore="__moreStreams" v-if="!isLoading" />
  </div>
</template>

<script>
import Stream from '@/components/game-page/Stream'
import Loading from '@/components/app/Loading'
import Loadmore from '@/components/app/LoadMore'

export default {
  components: { Stream, Loading, Loadmore },
  data: () => ({
    isLoading: false,
    title: '',
    id: '',
    language: ''
  }),
  computed: {
    _streams() {
      if (this.$store.state.game.data) return this.$store.state.game.data
      return []
    }
  },
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
  },

  methods: {
    async __getStreams() {
      this.isLoading = true
      const payload = {
        id: this.id,
        game: this.title,
        lang: this.language
      }
      await this.$store.dispatch('game/getStreams', payload)
      this.isLoading = false
    },

    async __moreStreams() {
      this.isLoading = true
      const payload = {
        id: this.id,
        game: this.title,
        lang: this.language
      }
      await this.$store.dispatch('game/moreStreams', payload)
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
  margin-bottom: 20px;
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
