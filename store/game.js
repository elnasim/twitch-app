export const state = () => ({
  streams: null,
  paginationID: 0
})

export const mutations = {
  SET_STREAMS(state, payload) {
    state.streams = payload
  },

  SET_MORE_STREAMS(state, payload) {
    state.streams = state.streams.concat(payload)
  },

  SET_PAGINATION(state, payload) {
    state.paginationID = payload
  }
}

export const actions = {
  async getGames({ commit }, payload) {
    const config = {
      headers: {
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
        accept: 'application/vnd.twitchtv.v5+json'
      }
    }
    const data = await this.$axios.$get(
      `https://api.twitch.tv/kraken/streams/?game=${payload}`,
      config
    )
    commit('SET_STREAMS', data.streams)
    commit('SET_PAGINATION', 25)
  },

  async moreGames({ commit, state }, payload) {
    const config = {
      headers: {
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
        accept: 'application/vnd.twitchtv.v5+json'
      }
    }
    const data = await this.$axios.$get(
      `https://api.twitch.tv/kraken/streams/?game=${payload}&offset=${state.paginationID}`,
      config
    )
    commit('SET_MORE_STREAMS', data.streams)
    commit('SET_PAGINATION', 25 + state.paginationID)
  }
}
