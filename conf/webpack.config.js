
const path                     = require('path');

const HtmlWebpackPlugin        = require('html-webpack-plugin');
const ExtractTextPlugin        = require('extract-text-webpack-plugin');
const CommonsChunkPlugin       = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin             = require('webpack/lib/DefinePlugin');

const ENV  = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9000;
const DIST = process.env.DIST || '../backend/public/dist';

const metadata = {
  env : ENV,
  host: HOST,
  port: PORT,
  dist: DIST
};

// 'about'     : './src/app/about/about.module.ts',
//   'dashboard' : './src/app/dashboard/dashboard.module.ts',
//   'home'      : './src/app/home/home-routing.module.ts',
//   'user'      : './src/app/user/user.module.ts',

  module.exports = {
  devServer: {
    contentBase: path.join(__dirname, metadata.dist),
    compress: true,
    historyApiFallback: true,
    host: metadata.host,
    port: metadata.port
  },
  devtool: 'source-map',
  entry: {
    'main'      : './src/main.ts',
    'vendor'    : './src/vendor.ts'
  },
  output: {
    filename: '[name].js',
    path:  path.resolve(__dirname, metadata.dist),
    publicPath: "/dist"
  },
  module: {
    rules: [
      {test: /\.html$/, use: 'raw-loader'},
      {test: /\.css$/,  use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
      {test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?sourceMap', 'sass-loader?sourceMap'] })},
      {test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'file-loader?name=public/fonts/[name].[ext]'},
      {test: /\.ts$/,   loaders: [
        {loader: 'awesome-typescript-loader', options: { configFileName: path.resolve(__dirname, './src/tsconfig.json') }},
        {loader: 'angular2-template-loader'},
        {loader: 'angular2-router-loader'}
      ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity}),
    new DefinePlugin({'webpack': {'ENV': JSON.stringify(metadata.env)}}),
    new ContextReplacementPlugin(
      // needed as a workaround for the Angular's internal use System.import()
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(__dirname, 'src') // location of your src
    ),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
