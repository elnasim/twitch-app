export const state = () => ({
  isAuth: null
})

export const mutations = {
  SET_IS_AUTH(state, payload) {
    state.isAuth = payload
  }
}

export const actions = {
  auth() {
    window.location.href =
      'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=z97pdq1cei4wqu42l3kkkdnseq06bj&redirect_uri=http://localhost:3000&scope='
  },
  // auth() {
  //   window.location.href =
  //     'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=z97pdq1cei4wqu42l3kkkdnseq06bj&redirect_uri=https://movie-dvd-release.github.io&scope='
  // },

  setToken({ commit }, payload) {
    const token = payload.slice(14, 44)
    localStorage.setItem('myTwitchToken', token)
  },

  async logout() {
    const token = localStorage.getItem('myTwitchToken')
    localStorage.setItem('myTwitchToken', '')
    await this.$axios.$post(
      `https://id.twitch.tv/oauth2/revoke?client_id=z97pdq1cei4wqu42l3kkkdnseq06bj&token=${token}`
    )
    this.$router.push('/')
  },

  async validateAuth({ commit }) {
    const config = {
      headers: {
        accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
      }
    }
    const authData = await this.$axios.$get(
      'https://id.twitch.tv/oauth2/validate',
      config
    )

    if (authData) {
      commit('SET_IS_AUTH', true)
    } else {
      commit('SET_IS_AUTH', false)
    }
  }
}
