export const state = () => ({
  isAuth: null,
  userID: null
})

export const mutations = {
  SET_IS_AUTH(state, payload) {
    state.isAuth = payload
  },

  SET_USER_ID(state, payload) {
    state.userID = payload
  }
}

export const actions = {
  auth() {
    window.location.href =
      'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=z97pdq1cei4wqu42l3kkkdnseq06bj&redirect_uri=http://localhost:3000&scope=user_follows_edit'
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

    try {
      this.$router.push('/')
      await this.$axios.$post(
        `https://id.twitch.tv/oauth2/revoke?client_id=z97pdq1cei4wqu42l3kkkdnseq06bj&token=${token}`
      )
    } catch (error) {}
  },

  async validateAuth({ commit }) {
    console.log('-->', 'validateAuth')

    const config = {
      headers: {
        accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
      }
    }

    try {
      const authData = await this.$axios.$get(
        'https://id.twitch.tv/oauth2/validate',
        config
      )

      console.log('-->', authData)

      if (authData) {
        commit('SET_IS_AUTH', true)
        commit('SET_USER_ID', authData.user_id)
      } else {
        commit('SET_IS_AUTH', false)
      }
    } catch (e) {}
  }
}
