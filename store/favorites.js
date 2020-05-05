import { favorites } from '@/core/api/api'

export const state = () => ({
  favorites: null
})

export const mutations = {
  SET_FAVORITES(state, favorites) {
    state.favorites = favorites
  }
}

export const actions = {
  async getFavorites({ commit }) {
    const token = localStorage.getItem('myTwitchToken')

    if (token) {
      try {
        const data = await favorites(token)

        commit('SET_FAVORITES', data.data.streams)
      } catch (error) {
        console.log('--->', error)
      }
    }
  }
}
