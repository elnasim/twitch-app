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

    const data = await this.$axios.$get(
      `https://api.twitch.tv/kraken/streams/followed`,
      config
    )

    commit('SET_FAVORITES', data.streams)
  }
}
