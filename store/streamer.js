import { streamerData, streamerVideos } from '@/core/api/api'

export const state = () => ({
  data: null,
  videos: null
})

export const mutations = {
  SET_DATA(state, data) {
    state.data = data
  },

  SET_VIDEOS(state, data) {
    state.videos = data
  }
}

export const actions = {
  async loadStreamerData({ commit, dispatch }, streamerName) {
    const token = localStorage.getItem('myTwitchToken')
    const data = await streamerData(streamerName, token)
    const streamerID = data.data.data[0].id
    commit('SET_DATA', data)
    dispatch('loadVideos', streamerID)
  },

  async loadVideos({ commit }, streamerID) {
    const token = localStorage.getItem('myTwitchToken')
    const data = await streamerVideos(streamerID, token)
    commit('SET_VIDEOS', data)
  }
}
