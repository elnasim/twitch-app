import { clientID } from '@/config'
import axios from 'axios'

function config(token = '') {
  return {
    headers: {
      accept: 'application/vnd.twitchtv.v5+json',
      Authorization: `OAuth ${token}`,
      'Client-ID': clientID
    }
  }
}

// Игры по количеству зрителей
export async function games(pagination = 0) {
  const data = await axios.get(
    `https://api.twitch.tv/kraken/games/top?offset=${pagination}`,
    config()
  )
  return data
}

// Стримы конкретной игры с фильтром по языку
export async function streams(id, lang, pagination = 0) {
  let data
  if (lang === 'all') {
    data = await axios.get(
      `https://api.twitch.tv/kraken/streams/?game=${id}&offset=${pagination}`,
      config()
    )
  } else {
    data = await axios.get(
      `https://api.twitch.tv/kraken/streams/?game=${id}&language=${lang}&offset=${pagination}`,
      config()
    )
  }
  return data
}

// Подписки
export async function favorites(token) {
  const data = await axios.get(
    `https://api.twitch.tv/kraken/streams/followed`,
    config(token)
  )

  return data
}

// Инфо о текущем стриме
export async function getStreamInfo(streamerID) {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/kraken/streams/${streamerID}`,
      config()
    )
    return data
  } catch (error) {
    console.log('--->', error)
  }
}

// Инфо о стримере
export async function streamerData(streamerName) {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/kraken/search/channels?query=${streamerName}&limit=1`,
      config()
    )
    return data
  } catch (error) {
    console.log('--->', error)
  }
}

// Записи стримера
export async function streamerVideos(streamerID) {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/kraken/channels/${streamerID}/videos`,
      config()
    )
    return data
  } catch (error) {
    console.log('--->', error)
  }
}

// Поиск стримеров
export async function searchChannels(query) {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/kraken/search/channels?query=${query}`,
      config()
    )
    return data
  } catch (error) {
    console.log('--->', error)
  }
}

// Поиск игр
export async function searchGames(query) {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/kraken/search/games?query=${query}`,
      config()
    )
    return data
  } catch (error) {
    console.log('--->', error)
  }
}

// Подписка на канал
export async function followChannel(userID, streamerID, token) {
  try {
    const data = await axios({
      method: 'put',
      url: `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${streamerID}`,
      headers: {
        accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${token}`,
        'Client-ID': clientID
      }
    })
    return data
  } catch (error) {}
}

// Отписка от канала
export async function unFollowChannel(userID, streamerID, token) {
  try {
    const data = await axios({
      method: 'delete',
      url: `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${streamerID}`,
      headers: {
        accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${token}`,
        'Client-ID': clientID
      }
    })
    return data
  } catch (error) {}
}

// Проверка подписки на канал
export async function checkFollowChannel(userID, streamerID, token) {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${streamerID}`,
      config(token)
    )

    return data
  } catch (error) {
    console.log('-->', error)
  }
}
