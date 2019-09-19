const path = require('path')
const DIST_PATH = path.resolve(__dirname, '../dist')

module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: DIST_PATH
  },
  resolve: {
    extensions: ['.js', 'json', 'jsx']
  }
}