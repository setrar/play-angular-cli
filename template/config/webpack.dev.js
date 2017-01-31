var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

require('dotenv').config({
  path: './.env'
});

var proxy = process.env.PROXY_TARGET = 'http://localhost:9000';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: '../dist',
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
      '/api/*': {
        target: proxy
      },
      '/assets/*': {
        target: 'http://localhost:8080',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/assets/, '');
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ]


});