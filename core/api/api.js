import { clientID } from '@/config'
import axios from 'axios'

function config(token) {
  return {
    headers: {
      accept: 'application/vnd.twitchtv.v5+json',
      Authorization: `OAuth ${token}`,
      'Client-ID': clientID
    }
  }
}

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
