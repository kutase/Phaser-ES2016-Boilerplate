import { State, Physics } from 'phaser'
import { doInputAction } from '../components/utils'

export default class Game extends State {
  init () {}

  preload () {}

  create () {
    let game = this.game

    this.socket = game.socket

    this.starfield = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'stars')

    game.physics.startSystem(Physics.ARCADE)

    this.setupPlayer()

    this.setupHandlers()

    let mainLoop = game.time.create(false)
    mainLoop.loop(15, this.mainLoop, this)

    let physicsLoop = game.time.create(false)
    physicsLoop.loop(15, this.physicsLoop, this)

    this.inputQueue = []

    this.predictionQueue = []

    this.last_sequence_counter = 0

    mainLoop.start()
    physicsLoop.start()
  }

  mainLoop () {
    // <-------------------------->
    // < Handle inputs and redraw >
    // <-------------------------->

    this.execServerResults()

    this.handleInputs()

  }

  execServerResults () {
    let inputQueue = this.inputQueue
    let predictionQueue = this.predictionQueue
    let player = this.player
    let counter = 0

    while (inputQueue.length > 0 && counter <= 3) {
      let state = inputQueue.shift()
      player.x = state.x
      player.y = state.y
      player.rotation = state.rotation;
    }
  }

  physicsLoop () {
    // <---------------------->
    // < Execute hard physics >
    // <---------------------->
  }

  setupPlayer () {
    let game = this.game

    console.log(game)

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'shipMain')
    this.player.anchor.setTo(0.5)
    this.player.rotation = Math.PI / 2
    this.player.userid = game.socket.userid

    window.player = this.player

    this.cursors = game.input.keyboard.createCursorKeys()

    game.physics.arcade.enable(this.player)
  }

  setupPlayers (rawPlayers) {
    let game = this.game

    this.players = new Map()
    for (let [key, val] of rawPlayers) {
      let value = JSON.parse(val)
      let player = game.add.sprite(game.world.centerX, game.world.centerY, 'shipMain')
      player.anchor.setTo(0.5)
      player.rotation = value.rotation
      player.x = value.x
      player.y = value.y

      this.players.set(key, player)
    }
  }

  updatePlayers (rawPlayers) {
    let game = this.game
    let players = this.players

    let rawPlayersMap = new Map(rawPlayers)
    for (let [key, val] of players) {
      if (!rawPlayersMap.get(key)) {
        players.delete(key)
      }
    }

    for (let [key, val] of rawPlayersMap) {
      let value = JSON.parse(val)
      let player = players.get(key)
      if (player) {
        player.x = value.x
        player.y = value.y
        player.rotation = value.rotation
      } else {
        let player = game.add.sprite(game.world.centerX, game.world.centerY, 'shipMain')
        player.anchor.setTo(0.5)
        player.rotation = value.rotation
        player.x = value.x
        player.y = value.y

        players.set(key, player)
      }
    }
  }

  setupHandlers () {
    let socket = this.socket

    socket.emit('init');

    socket.on('playersSetup', (players) => {
      this.setupPlayers(players.players)
      socket.emit('playersReady')
    })

    socket.on('inited', (data) => {
      data = JSON.parse(data)
      let player = this.player
      player.x = data.x
      player.y = data.y
      player.rotation = data.rotation
      player.isActive = true
    })

    socket.on('playersUpdate', (players) => this.updatePlayers(players.players))

    socket.on('input', (state) => this.updatePlayer(state))
  }

  updatePlayer (state) {
    this.inputQueue.push(state)
  }

  sendInputs (action) {
    let socket = this.socket
    socket.emit('input', action)

    doInputAction(action, this.player)

    this.predictionQueue.push(action)
  }

  handleInputs () {
    let cursors = this.cursors
    let inputQueue = this.inputQueue
    let socket = this.socket

    if (cursors.up.isDown) {
      this.sendInputs({
        type: 'moveUp',
        counter: this.last_sequence_counter++
      })
    }

    if (cursors.down.isDown) {
      this.sendInputs({
        type: 'moveDown',
        counter: this.last_sequence_counter++
      })
    }

    if (cursors.left.isDown) {
      this.sendInputs({
        type: 'rotateLeft',
        counter: this.last_sequence_counter++
      })
    }

    if (cursors.right.isDown) {
      this.sendInputs({
        type: 'rotateRight',
        counter: this.last_sequence_counter++
      })
    }
  }
}