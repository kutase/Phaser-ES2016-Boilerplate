let path = require('path')
let webpack = require('webpack')
let autoprefixer = require('autoprefixer')
let precss = require('precss')

// Phaser webpack config
let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
let phaser = path.join(phaserModule, '/build/custom/phaser-split.js')
let pixi = path.join(phaserModule, '/build/custom/pixi.js')
let p2 = path.join(phaserModule, '/build/custom/p2.js')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './public/index'
  ],
  output: {
    pathinfo: true,
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/js/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map.js'
  },
  performance: { hints: false },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      { 
        test: /\.json$/, 
        use: "json-loader" 
      },
      {
        test: /(\.jsx|\.js)$/,
        use: [ 'babel-loader' ],
        include: [
          path.resolve('./public/')
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /pixi\.js/,
        use: 'expose-loader?PIXI'
      },
      {
        test: /phaser-split\.js$/,
        use: 'expose-loader?Phaser'
      },
      {
        test: /p2\.js/,
        use: 'expose-loader?p2'
      }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
