const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HappyPack = require('happypack')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

const smp = new SpeedMeasurePlugin()

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: './app/index.js',
    framwork: ['react', 'react-dom'], // 抽出框架代码
  },
  output: {
    filename: 'js/[name].[chunkhash:16].js',
    publicPath: '/',
  },
  cache: false,
  devtool: 'source-map',
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        // collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    /* 每次编译生产环境代码前先删除先前的文件 */
    new CleanWebpackPlugin({
      /* 将删除操作产生的信息打印到控制台上 */
      verbose: true,
      dry: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    /* 作用域提升 */
    new webpack.optimize.ModuleConcatenationPlugin(),
    /* 多线程快速编译代码 */
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader'],
    }),
  ],
  optimization: {
    minimizer: [
      /* 自定义 js 优化配置，覆盖默认设置 */
      new UglifyJsPlugin({
        exclude: /\.min.js$/,
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
          },
          output: {
            comments: false, // 去掉注释
            beautify: false, // 紧凑输出
          },
        },
      }),
      /* 压缩 css 文件 */
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {
            disable: true,
          },
          mergeLonghand: false,
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
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

// module.exports = prodWebpackConfig
module.exports = smp.wrap(prodWebpackConfig)
