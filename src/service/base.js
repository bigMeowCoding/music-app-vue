import axios from 'axios'

const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'prod' ? 'http://www.bigmeow.club/music-app/' : '/'

axios.defaults.baseURL = baseURL

export function get(url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const serverData = res.data
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch((e) => {
    console.log(e)
  })
}