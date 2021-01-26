import { SHORT_CACHE, LONG_CACHE } from './constant'
import processApiConfig from './api/api'
import apiConfig from './api/apiConfig/apiConfig'

export const sessionSave = (key, val) => {
  SHORT_CACHE.setItem(key, window.btoa(window.encodeURIComponent(JSON.stringify(val))))
}

export const sessionFetch = (key) => {
  const val = SHORT_CACHE.getItem(key)
  if (val) {
    return JSON.parse(decodeURIComponent(window.atob(val)))
  } else {
    return 'error'
  }
}

export const localSave = (key, val) => {
  LONG_CACHE.setItem(key, window.btoa(window.encodeURIComponent(JSON.stringify(val))))
}

export const localFetch = (key) => {
  const val = LONG_CACHE.getItem(key)
  if (val) {
    return JSON.parse(decodeURIComponent(window.atob(val)))
  } else {
    return void 666
  }
}

// 刷新token
export const refreshToken = async () => {
  const params = {
    Authorization: sessionFetch('token')
  }
  const [err, res] = await processApiConfig(apiConfig).getRefreshToken(params)
  if (err) refreshToken()
  if (res && res.code === 200) {
    sessionSave('token', res.token.token)
    const [expiration, t] = [res.token.expiration, new Date().getTime()]
    const refreshTime = expiration + t - 1.8e6
    sessionSave('refreshTime', refreshTime)
  }
}
