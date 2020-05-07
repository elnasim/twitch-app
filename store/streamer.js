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
    const { data } = await streamerData(streamerName)
    const streamerID = data.channels[0]._id
    commit('SET_DATA', data.channels[0])
    dispatch('loadVideos', streamerID)
  },

  async loadVideos({ commit }, streamerID) {
    const { data } = await streamerVideos(streamerID)
    commit('SET_VIDEOS', data.videos)
  }
}
