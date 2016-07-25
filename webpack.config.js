let path = require('path')
let webpack = require('webpack')
let autoprefixer = require('autoprefixer')
let precss = require('precss')

// Phaser webpack config
let phaserModule = path.join(__dirname, '/node_modules/phaser/')
let phaser = path.join(phaserModule, '/build/custom/phaser-split.js')
let pixi = path.join(phaserModule, '/build/custom/pixi.js')
let p2 = path.join(phaserModule, '/dist/p2.js')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './public/index.js'
  ],
  output: {
    pathinfo: true,
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/js/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    noParse: p2,
    loaders: [
      {
        loaders: [ 'react-hot', 'babel-loader' ],
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
