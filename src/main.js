import Vue from 'vue'
import store from './stores'
import router from './router'
import App from './App.vue'
import processApiConfig from './api/api'
import apiConfig from './api/apiConfig/apiConfig'

Vue.prototype.$api = processApiConfig(apiConfig)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next()
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
