const path = require('path')

const PUBLIC_PATH = path.resolve(__dirname, '../public')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:16].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: '8080',
    contentBase: PUBLIC_PATH, // serve static files
    compress: true, // enable gzip compression
    historyApiFallback: true, // not found redirect to homepage
    hot: true,
    https: false,
    proxy: {},
  },
  optimization: {
    runtimeChunk: true, // 它的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        framework: {
          test: 'framework',
          name: 'framework',
          enforce: true,
        },
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
      },
    },
  },
})
