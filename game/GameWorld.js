class GameWorld {
  constructor (width, height) {
    this.widht = width
    this.height = height

    this.centerX = this.widht/2
    this.centerY = this.height/2

    this.players = new Map()
    this.actionsQueue = []
  }

  destroy () {
    // todo
  }
}

module.exports = GameWorld