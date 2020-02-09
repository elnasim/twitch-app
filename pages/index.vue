<template>
  <div class="games">
    <Game
      v-for="item of _getGames"
      :key="item.game._id"
      :img="item.game.box.large"
      :title="item.game.name"
      :id="item.game._id"
      :viewers="item.viewers"
    />
  </div>
</template>

<script>
import Game from '~/components/main-page/Game'
export default {
  components: { Game },
  computed: {
    _getGames() {
      return this.$store.state.games
    }
  },
  mounted() {
    this.$store.dispatch('getGames')
  },
  methods: {
    _moreGames() {
      this.$store.dispatch('getMoreGames')
    }
  }
}
</script>

<style lang="scss" scoped>
.games {
  display: flex;
  flex-wrap: wrap;
}
</style>
