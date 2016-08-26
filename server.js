'use strict'

let express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  sioController = require('./socketio/controller'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  path = require('path')

const port = 1337
const compiler = webpack(webpackConfig)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express[ 'static' ]('public'))

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

http.listen(port, () =>
  console.log(`🌎+👽👾=🔯 --> Listening on port: ${port}`)
)

io.on('connection', (socket) =>
  sioController.handleSocket(socket)
)

sioController.startPhysicsLoop()
sioController.updateClientsLoop(io)
