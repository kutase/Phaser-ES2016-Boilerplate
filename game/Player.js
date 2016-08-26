let uuid = require('node-uuid')
let doInputAction = require('./utils').doInputAction

class Player {
  constructor (socket, gameWorld) {
    this.socket = socket
    this.players = gameWorld.players
    this.actionsQueue = gameWorld.actionsQueue
    this.gameWorld = gameWorld

    this.x = 100//gameWorld.centerX
    this.y = 100//gameWorld.centerY
    this.rotation = Math.PI / 2
    this.hp = 100

    this.isActive = false

    this.setupSocket()
  }

  setupSocket () {
    this.userid = uuid.v4()
    this.socket.userid = this.userid;

    console.log(`User with id:${this.userid} was connected!`)

    this.socket.emitPlayers = () => {
      let players = [ ...this.players ]
      let index = players.findIndex(el => el[ 0 ] == this.userid)
      if (index != -1)
        players.splice(index, 1)

      if (this.isActive)
        this.socket.emit('playersUpdate', {
          players: players
        })
    }

    this.setupHandlers()
  }

  setupHandlers () {
    let socket = this.socket

    socket.on('init', () => {
      socket.emit('playersSetup', {
        players: [ ...this.players ]
      })

      socket.on('playersReady', () => {
        this.players.set(this.userid, this);
        socket.emit('inited', this)
        this.isActive = true
      })

      socket.on('input', (action) => {
        this.actionsQueue.push(() => {
          const actionsQueue = this.actionsQueue
          const counter = action.counter
          doInputAction(action, this)
          socket.emit('input', {
            x: this.x,
            y: this.y,
            rotation: this.rotation,
            counter
          })
          actionsQueue.splice(0, 1)
        })
      })
    })

    socket.on('disconnect', () => this.destroy())
  }

  destroy () {
    this.isActive = false
    this.players.delete(this.userid)
  }

  toJSON () {
    return JSON.stringify({
      x: this.x,
      y: this.y,
      rotation: this.rotation
    })
  }
}

module.exports = Player