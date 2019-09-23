const path = require('path')

const APP_PATH = path.resolve(__dirname, '../app')
const DIST_PATH = path.resolve(__dirname, '../dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  output: {
    path: DIST_PATH,
  },
  resolve: {
    extensions: ['.js', 'json', 'jsx', 'scss', 'css', 'png', 'svg', 'jpg'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: process.env.NODE_ENV === 'production' ? 'happypack/loader?id=js' : 'babel-loader?cacheDirectory=true',
        include: APP_PATH,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][local]-[hash:base64:5]',
              },
              localsConvention: 'camelCase',
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
        include: APP_PATH,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][local]-[hash:base64:5]',
              },
              localConvention: 'camelCase',
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash].[ext]',
            },
          },
        ],
        include: APP_PATH,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css',
      chunkFilename: 'css/app.[contenthash].css',
    }),
  ],
}
