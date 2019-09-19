const path = require('path')
const PUBLIC_PATH = path.resolve(__dirname, '../public')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:16].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: '8080',
    contentBase: PUBLIC_PATH, // serve static files
    compress: true,           // enable gzip compression
    historyApiFallback: true, // not found redirect to homepage
    hot: true,
    https: false,
    proxy: {}
  }
})