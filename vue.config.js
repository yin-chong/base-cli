/* eslint-disable new-parens */
const isProdBuild = process.env.NODE_ENV === 'production'
const isDevBuild = !isProdBuild // process.env.NODE_ENV === 'dev'
const path = require('path')

const publicPath = isDevBuild ? '' : ''
const outputDir = isDevBuild ? 'output' : 'output'
const lintOnSave = false
const plugins = []

if (isDevBuild) {
  // plugins.push(new BundleAnalyzerPlugin)
}

module.exports = {
  lintOnSave,
  publicPath,
  outputDir,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/style/style.scss";`
      }
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].[hash].bundle.js'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.json', '.vue']
    },
    plugins,
    devServer: {
      proxy: 'http://dev.test.baidu.com:8080'
    }
  },

  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          // 要公用的scss的路径
          resources: './src/style/style.scss'
        })
        .end()
    })
    config.plugin('html').tap((args) => {
      args[0].minimize = isProdBuild
      return args
    })
  }
}
