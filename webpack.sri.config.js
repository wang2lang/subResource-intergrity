var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SriPlugin = require('webpack-subresource-integrity');

var webpackConfig = {
  entry: {
    app: ['./src/app.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [{
      test: /\.(css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }]
      })
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:6].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template-sri.html',
      inject: false, //这里应该填false，手动插入script标签
      chunksSortMode: 'dependency'
    }),
    new SriPlugin({
      hashFuncNames: ['sha256'],
      enabled: true
    })
  ]
}

module.exports = webpackConfig
