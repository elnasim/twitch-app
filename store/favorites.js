export const state = () => ({})

export const actions = {
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
  },

  async unFollowChannel({ commit }, followData) {
    try {
      await this.$axios({
        method: 'delete',
        url: `https://api.twitch.tv/kraken/users/${followData[0]}/follows/channels/${followData[1]}`,
        headers: {
          accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
        }
      })
    } catch (error) {}
  },

  async checkFollowChannel({ commit }, followData) {
    try {
      const data = await this.$axios({
        method: 'get',
        url: `https://api.twitch.tv/kraken/users/${followData[0]}/follows/channels/${followData[1]}`,
        headers: {
          accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
          Authorization: `OAuth ${localStorage.getItem('myTwitchToken')}`
        }
      })

      if (data.status === 200) {
        return true
      } else return false
    } catch (error) {}
  }
}
