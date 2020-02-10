export const state = () => ({})

export const mutations = {}

export const actions = {
  async getFavorites() {
    const config = {
      headers: {
        'Client-ID': 'z97pdq1cei4wqu42l3kkkdnseq06bj',
        accept: 'application/vnd.twitchtv.v5+json',
        Authorization: 'OAuth vlkukalk93bbikbzdrh7xyw5g5ykoq'
      }
    }

    const data = await this.$axios.$get(
      `https://api.twitch.tv/kraken/streams/followed`,
      config
    )

    console.log('-->', data)
  }
}
