import { State, Physics } from 'phaser'

import { doInputAction } from '../utils/controls'
import Player from '../classes/Player'

export default class Game extends State {
  init () {}

  preload () {}

  create () {
    let game = this.game

    this.starfield = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'stars')

    game.physics.startSystem(Physics.ARCADE)

    this.setupPlayer()

    let mainLoop = game.time.create(false)
    mainLoop.loop(15, this.mainLoop, this)

    let physicsLoop = game.time.create(false)
    physicsLoop.loop(15, this.physicsLoop, this)

    mainLoop.start()
    physicsLoop.start()
  }

  mainLoop () {
    // <-------------------------->
    // < Handle inputs and redraw >
    // <-------------------------->

    this.handleInputs()

  }

  physicsLoop () {
    // <---------------------->
    // < Execute hard physics >
    // <---------------------->
  }

  setupPlayer () {
    let game = this.game

    this.player = new Player(game, game.world.centerX, game.world.centerY, 'shipMain')
    this.player.rotation = Math.PI / 2

    window.player = this.player

    this.cursors = game.input.keyboard.createCursorKeys()
  }

  execInputs (action) {
    doInputAction(action, this.player)
  }

  handleInputs () {
    let cursors = this.cursors

    if (cursors.up.isDown) {
      this.execInputs({
        type: 'moveUp'
      })
    }

    if (cursors.down.isDown) {
      this.execInputs({
        type: 'moveDown'
      })
    }

    if (cursors.left.isDown) {
      this.execInputs({
        type: 'rotateLeft'
      })
    }

    if (cursors.right.isDown) {
      this.execInputs({
        type: 'rotateRight'
      })
    }
  }
}