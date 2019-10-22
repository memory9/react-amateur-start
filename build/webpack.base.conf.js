const path = require('path')

const APP_PATH = path.resolve(__dirname, '../app')
const DIST_PATH = path.resolve(__dirname, '../dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 使用 WEBPACK_SERVE 环境变量检测当前是否是在 webpack-server 启动的开发环境中
const DEV = Boolean(process.env.WEBPACK_DEV_SERVER)

module.exports = {
  output: {
    path: DIST_PATH,
  },
  resolve: {
    alias: {
      app: APP_PATH,
      containers: path.resolve(APP_PATH, 'containers'),
    },
    extensions: ['.js', 'json', 'jsx', 'scss', 'css', 'png', 'svg', 'jpg'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: DEV ? 'babel-loader?cacheDirectory=true' : 'happypack/loader?id=js',
        include: APP_PATH,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
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
            loader: DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
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
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  ],
}
