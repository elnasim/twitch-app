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

  async followChannel({ commit }, followData) {
    try {
      await this.$axios({
        method: 'put',
        url: `https://api.twitch.tv/kraken/users/${followData[0]}/follows/channels/${followData[1]}`,
        headers: {
          accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
        }
      })
    } catch (error) {}
  }
}
