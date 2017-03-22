
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

// 'about'       : './src/app/about/about.module.ts',
// 'dashboard'   : './src/app/dashboard/dashboard.module.ts',
// 'home'        : './src/app/home/home-routing.module.ts',
// 'user'        : './src/app/user/user.module.ts',
// 'admin'       : './src/app/admin/admin.module.ts',
// 'crisisCenter': './src/app/crisis-center/crisis-center.module.ts',

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
    'main' : './src/main.ts',
    'polyfills' : './src/polyfills.ts',
    'vendor'    : './src/vendor.ts'
  },
  output: {
    filename: '[name].js',
    path:  path.resolve(__dirname, metadata.dist),
    publicPath: "/dist"
  },
  module: {
    rules: [

      /*
       * Typescript loader support for .ts
       *
       * Component Template/Style integration using `angular2-template-loader`
       * Angular 2 lazy loading (async routes) via `ng-router-loader`
       *
       * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
       * order of the loader matter.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       * See: https://github.com/TheLarkInn/angular2-template-loader
       * See: https://github.com/shlomiassaf/ng-router-loader
       */
      {
        test: /\.ts$/,
        use: [
          // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
            'ng-router-loader', 'awesome-typescript-loader', 'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      /*
       * to string and css loader support for *.css files (from Angular components)
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [path.resolve(__dirname, 'src/styles')]
      },

      /*
       * to string and sass loader support for *.scss files (from Angular components)
       * Returns compiled css content as string
       *
       */
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        exclude: [path.resolve(__dirname, 'src/styles')]
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [path.resolve(__dirname, 'src/index.html')]
      },

      /*
       * File loader for supporting images, for example, in CSS files.
       */
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },

      /* File loader for supporting fonts, for example, in CSS files.
       */
      {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
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
