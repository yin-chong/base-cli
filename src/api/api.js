import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { sessionFetch, refreshToken } from '@/util.js'

const env = process.env.NODE_ENV
const baseConfig = {
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json'
  }
  // xhrFields: {
  //   withCredentials: true
  // }
}
const instance = axios.create(baseConfig)
const NO_BODY_METHODS = ['get', 'delete', 'head', 'option']
const REG_COLON_URL = /:([^/]+)/g
const api = {}

function isHasUrlParams (url) {
  return url && /:([^/]+)/.test(url)
}

function pickUpUrlParams (url, params) {
  return url.replace(REG_COLON_URL, (n, $1) => {
    if (params) {
      return ''
    } else if (params.hasOwnProperty($1)) {
      return params[$1] == null ? '' : params[$1]
    }

    return n
  })
}

const requestHandler = (baseRequestConfig, mock, data = {}) => {
  let { method, url } = baseRequestConfig

  if (mock) return [void 666, mock]

  const isNoBody = NO_BODY_METHODS.includes(method)

  if (isNoBody && Object.keys(data).length) {
    url = `${url}?${qs.stringify(data, { arrayFormat: 'repeat' })}`
  } else if (!isNoBody) {
    data = JSON.stringify(data)
    // data = qs.stringify(data)
  }

  const [tken] = [sessionFetch('token')]
  // console.log(tken)
  const [refreshTime, t] = [sessionFetch('refreshTime'), new Date().getTime()]
  if (tken) {
    baseRequestConfig.headers = {
      Authorization: `${tken}`
    }
  }
  return instance(Object.assign({}, { ...baseRequestConfig }, {
    ...(isNoBody ? { url } : { data })
  })).then(async res => {
    console.log(res)
    switch (res.data.code) {
      case 200:
        if (!!refreshTime && t >= refreshTime && !baseRequestConfig.isRefreshToken) {
          refreshToken()
        }
        break
      case 402:
        Toast.fail('网络错误!')
    }
    return [void 666, res.hasOwnProperty('data') ? res.data : res]
  })
    .catch(err => {
      const r = err.response
      console.log(r)
      if (r.data.code === 406) {
        Toast.fail('您的安全信息已过期,请重新登录！')
        window.location.href = ''
      } else {
        Toast.fail('网络错误!')
      }
      return [err]
    })
}

const makeRequestHandler = (baseURL, url, type, isRefreshToken, ...args) => {
  const [mock] = args
  type = type.toLowerCase()
  const baseRequestConfig = {
    baseURL,
    method: type,
    url,
    isRefreshToken: isRefreshToken || false
  }

  if (isHasUrlParams(url)) {
    return (params) => {
      Object.assign(baseRequestConfig, { url: pickUpUrlParams(url, params) })
      return requestHandler.bind(null, baseRequestConfig, mock)
    }
  }

  return requestHandler.bind(null, baseRequestConfig, mock)
}

export default function processApiConfig (apiConfig) {
  let { baseUrl, apiList } = apiConfig
  const processFirstLetterToUpper = (name) => {
    const firstLetter = name.substring(0, 1)
    return `${firstLetter.toUpperCase()}${name.substring(1)}`
  }

  (apiList || []).forEach(apiConfigItem => {
    let { name, method, url, isRefreshToken, mock } = apiConfigItem

    if (!Array.isArray(method)) return

    method.forEach(methodItem => {
      const apiName = `${methodItem}${processFirstLetterToUpper(name)}`
      api[apiName] = makeRequestHandler(baseUrl[env], url, methodItem, isRefreshToken, mock)
    })
  })

  return { ...api }
}

export const apiTarget = { ...api }
