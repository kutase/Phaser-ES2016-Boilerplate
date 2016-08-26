let path = require('path'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './public/src/index'
  ],
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: 'bundle.js',
    publicPath: '/js/',
    sourceMapFilename: 'bundle.map.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    loaders: [
      {
        loaders: [ 'babel-loader' ],
        include: [
          path.resolve('./public/src/')
        ],
        test: /(\.jsx|\.js)$/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: () => [ autoprefixer, precss ]
};