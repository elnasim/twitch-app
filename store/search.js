import { searchChannels, searchGames } from '~/core/api/api'

export const state = () => ({
  searchData: null
})

export const mutations = {
  SET_DATA(state, data) {
    state.searchData = data
  },

  CLEAR_DATA(state) {
    state.searchData = null
  }
}

export const actions = {
  async getChannels({ commit }, payload) {
    const { data } = await searchChannels(payload)
    commit('SET_DATA', data.channels)
  },

  async getGames({ commit }, payload) {
    const { data } = await searchGames(payload)
    commit('SET_DATA', data.games)
  },

  clearData({ commit }) {
    commit('CLEAR_DATA')
  }
}
