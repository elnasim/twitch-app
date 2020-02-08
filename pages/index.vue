<template>
  <div class="games">
    <Game
      v-for="item of _getGames"
      :key="item.id"
      :img="item.box_art_url"
      :title="item.name"
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
  }
}
</script>

<style lang="scss" scoped></style>
