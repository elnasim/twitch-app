export const state = () => ({
  games: [],
  paginationId: null
})

export const mutations = {
  SET_GAMES(state, payload) {
    state.games = payload
  },

  SET_MORE_GAMES(state, payload) {
    state.games = state.games.concat(payload)
  },

  SET_PAGINATION(state, payload) {
    state.paginationId = payload
  }
}

export const actions = {
  async getGames({ commit }) {
    const config = {
      headers: {
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
        accept: 'application/vnd.twitchtv.v5+json'
      }
    }

    const data = await this.$axios.$get(
      'https://api.twitch.tv/kraken/games/top',
      config
    )

    commit('SET_GAMES', data.top)
    commit('SET_PAGINATION', 10)
  },

  async getMoreGames({ commit, state }) {
    const config = {
      headers: {
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
        accept: 'application/vnd.twitchtv.v5+json'
      }
    }
    const data = await this.$axios.$get(
      `https://api.twitch.tv/kraken/games/top?offset=${state.paginationId}`,
      config
    )
    commit('SET_MORE_GAMES', data.top)
    commit('SET_PAGINATION', state.paginationId + 10)
  }
}
