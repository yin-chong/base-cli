export default {
  baseUrl: {
    development: 'https://easy-mock.com/mock/5d47dd762b3693531efebace/wxserver', // 开发
    test: 'https://easy-mock.com/mock/5d47dd762b3693531efebace/wxserver', // 测试
    production: 'https://wanht.top/wxserver' // 测试
  },
  apiList: [
    {
      name: 'items',
      url: '/getItems.do',
      method: ['get']
    },
    // 刷新token
    {
      name: 'refreshToken',
      url: 'refreshToken',
      method: ['get'],
      isRefreshToken: true
    }
  ]
}
