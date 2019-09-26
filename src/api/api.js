import axios from 'axios'
import qs from 'qs'

const env = process.env.NODE_ENV
const baseConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
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

const requestHandler = (baseRequestConfig, data = {}) => {
  let { method, url } = baseRequestConfig
  const isNoBody = NO_BODY_METHODS.includes(method)
  
  if (isNoBody && Object.keys(data).length) {
    url = `${url}?${qs.stringify(data, { arrayFormat: 'repeat' })}`
  } else if (!isNoBody) {
    data = JSON.stringify(data)
  }
  
  return instance(Object.assign({}, { ...baseRequestConfig }, {
    ...(isNoBody ? { url } : { data })
  })).then(res => [undefined, res.hasOwnProperty('data') ? res.data : res])
    .catch(err => [err])
}

const makeRequestHandler = (baseURL, url, type) => {
  type = type.toLowerCase()
  const baseRequestConfig = {
    baseURL,
    method: type,
    url
  }
  
  if (isHasUrlParams(url)) {
    return (params) => {
      Object.assign(baseRequestConfig, { url: pickUpUrlParams(url, params) })
      return requestHandler.bind(null, baseRequestConfig)
    }
  }
  
  return requestHandler.bind(null, baseRequestConfig)
}

export default function processApiConfig (apiConfig) {
  let { baseUrl, apiList } = apiConfig
  const processFirstLetterToUpper = (name) => {
    const firstLetter = name.substring(0, 1)
    return `${firstLetter.toUpperCase()}${name.substring(1)}`
  }
  
  (apiList || []).forEach(apiConfigItem => {
    let { name, method, url } = apiConfigItem
    
    if (!Array.isArray(method)) return
    
    method.forEach(methodItem => {
      api[`${methodItem}${processFirstLetterToUpper(name)}`] = makeRequestHandler(baseUrl[env], url, methodItem)
    })
  })
  
  return { ...api }
}
