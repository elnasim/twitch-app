export const state = () => ({
  games: []
})

export const mutations = {
  SET_GAMES(state, payload) {
    state.games = payload
  }
}

export const actions = {
  async getGames({ commit }) {
    const config = {
      headers: {
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj'
      }
    }

    const data = await this.$axios.$get(
      'https://api.twitch.tv/helix/games/top',
      config
    )

    commit('SET_GAMES', data.data)
  }
}
