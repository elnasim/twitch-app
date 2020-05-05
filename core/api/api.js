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
export async function streams(id, lang, pagination = '') {
  let data
  if (lang === 'all') {
    data = await axios.get(
      `https://api.twitch.tv/helix/streams/?game_id=${id}&after=${pagination}`,
      config()
    )
  } else {
    data = await axios.get(
      `https://api.twitch.tv/helix/streams/?game_id=${id}&language=${lang}&after=${pagination}`,
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

// Инфо о стримере
export async function streamerData(streamerName, token = '') {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/helix/users?login=${streamerName}`,
      config(token)
    )
    return data
  } catch (error) {
    console.log('--->', error)
  }
}

// Записи стримера
export async function streamerVideos(streamerID, token = '') {
  try {
    const data = await axios.get(
      `https://api.twitch.tv/helix/videos?user_id=${streamerID}&first=6&sort=time`,
      config(token)
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

// ПОиск игр
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
