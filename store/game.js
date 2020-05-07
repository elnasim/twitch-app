import { streams } from '@/core/api/api'

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
  async getStreams({ commit }, payload) {
    const { data } = await streams(payload.game, payload.lang)
    commit('SET_DATA', data.streams)
    commit('SET_PAGINATION_ID', 25)
  },

  async moreStreams({ commit, state }, payload) {
    const pagination = state.paginationID
    const { data } = await streams(
      payload.game,
      payload.lang,
      state.paginationID
    )
    commit('MORE_DATA', data.streams)
    commit('SET_PAGINATION_ID', pagination + 25)
  }
}
