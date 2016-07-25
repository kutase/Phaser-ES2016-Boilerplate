"use strict"

let Player = require('../game/Player')
let GameWorld = require('../game/GameWorld')

let gameWorld = new GameWorld(4000, 3000)

exports.handleSocket = (socket) => {
  new Player(socket, gameWorld)
}

exports.updateClientsLoop = (io) => {
  setInterval(() => {
    let connected = io.sockets.connected
    let keys = Object.keys(connected)
    for (let key of keys)
      connected[ key ].emitPlayers()
  }, 45)
}

exports.startPhysicsLoop = () => {
  setInterval(() => {
    const actionsQueue = gameWorld.actionsQueue
    let counter = 0
    
    while (actionsQueue.length > 0 && counter < 3) {
      let firstAction = actionsQueue[ 0 ]
      firstAction()
      counter++
    }
  }, 15)
}