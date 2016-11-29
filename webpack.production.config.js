let path = require('path')
let webpack = require('webpack')
let autoprefixer = require('autoprefixer')
let precss = require('precss')

// Phaser webpack config
let phaserModule = path.join(__dirname, '/node_modules/phaser/')
let phaser = path.join(phaserModule, '/build/custom/phaser-split.js')
let pixi = path.join(phaserModule, '/build/custom/pixi.js')
let p2 = path.join(phaserModule, '/build/custom/p2.js')

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
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: true,
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
    new webpack.optimize.AggressiveMergingPlugin()
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
