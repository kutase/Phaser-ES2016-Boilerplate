let path = require('path')
let webpack = require('webpack')
let autoprefixer = require('autoprefixer')
let precss = require('precss')

// Phaser webpack config
let phaserModule = path.join(__dirname, '/node_modules/phaser/')
let phaser = path.join(phaserModule, '/build/custom/phaser-split.js')
let pixi = path.join(phaserModule, '/build/custom/pixi.js')
let p2 = path.join(phaserModule, '/build/custom/p2.js')

let WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    './public/index'
  ],
  output: {
    pathinfo: true,
    path: path.join(__dirname, 'build/js/'),
    publicPath: '/static/js/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new WebpackShellPlugin({ // hoosk for build
    //   // onBuildStart: ['node clearBuildPath.js'], // before start
    //   onBuildEnd: [] // after end
    // })
  ],
  module: {
    noParse: p2,
    loaders: [
      {
        loaders: [ 'babel-loader' ],
        include: [
          path.resolve('./public/')
        ],
        test: /(\.jsx|\.js)$/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /pixi\.js/,
        loader: 'expose?PIXI'
      },
      {
        test: /phaser-split\.js$/,
        loader: 'expose?Phaser'
      },
      {
        test: /p2\.js/,
        loader: 'expose?p2'
      }
    ]
  },
  postcss: () => [ autoprefixer, precss ],
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
