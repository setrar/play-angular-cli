var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

var configs = webpackMerge(commonConfig, {
  devTool: 'source-map',

  output: {
    path: '../../public',
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'proces.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../app/views/index.scala.html'
    }),
    new CopyWebpackPlugin([
      {from: './i18n/*.json', to: '../public/assets'},
      {from: './images', to: '../public/img'}
    ]),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]

});

module.exports = configs;