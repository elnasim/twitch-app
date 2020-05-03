import { games } from '@/core/api/api'

export const state = () => ({
  data: null,
  paginationID: null
})

export const mutations = {
  SET_DATA(state, data) {
    state.data = data
  },

  MORE_DATA(state, data) {
    state.data = state.data.concat(data)
  },

  SET_PAGINATION_ID(state, paginationID) {
    state.paginationID = paginationID
  }
}

export const actions = {
  async getGames({ commit }) {
    const data = await games()

    commit('SET_DATA', data.data.top)
    commit('SET_PAGINATION_ID', 10)
  },

  async moreGames({ commit, state }, payload) {
    const data = await games(state.paginationID)

    commit('MORE_DATA', data.data.top)
    commit('SET_PAGINATION_ID', state.paginationID + 10)
  }
}
