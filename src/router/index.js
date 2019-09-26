import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routerConfig'

const baseRouterConfig = []

const buildRouter = (baseConfig, routerConfig) => {
  return baseConfig && baseConfig.length ? ((baseConfig[0].children = [...routerConfig]) &&
    [ ...baseConfig ]) : [...routerConfig]
}

const routes = buildRouter(baseRouterConfig, routerConfig)

Vue.use(Router)

export default new Router({
  routes
})
