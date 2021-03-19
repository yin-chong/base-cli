// const path = require('path')

module.exports = {
  'rule': [
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
}
