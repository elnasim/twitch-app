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
  }
}
