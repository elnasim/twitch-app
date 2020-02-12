export const state = () => ({
  favorites: []
})

export const mutations = {
  SET_FAVORITES(state, payload) {
    state.favorites = payload
  }
}

export const actions = {
  async getFavorites({ commit }) {
    const config = {
      headers: {
        accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
      }
    }

    try {
      const data = await this.$axios.$get(
        `https://api.twitch.tv/kraken/streams/followed`,
        config
      )

      commit('SET_FAVORITES', data.streams)
    } catch (error) {}
  },

  async followChannel({ commit }, data1) {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'PUT',
        accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
        Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
      }
    }

    try {
      const data = await this.$axios.$put(
        `https://api.twitch.tv/kraken/users/39462167/follows/channels/129454141`,
        config
      )

      console.log('-->', data)
    } catch (error) {
      console.log('-->', error)
    }
  }
}
