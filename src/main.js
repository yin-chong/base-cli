import Vue from 'vue'
import store from './stores'
import router from './router'
import App from './App.vue'
import processApiConfig from './api/api'
import apiConfig from './api/apiConfig/apiConfig'
import Vant from 'vant'
import 'vant/lib/index.css'
import * as components from '@/components'
import './style/style.scss'

Vue.prototype.$api = processApiConfig(apiConfig)

Vue.use(Vant)
Object.values(components).forEach(compItem => {
  Vue.component(compItem.name, { ...compItem })
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next()
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
