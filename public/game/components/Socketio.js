import io from 'socket.io-client'

export default class Socketio {
  constructor () {
    this.socket = io.connect('/')
    this.socket.on('connected', (data) => {
      console.log(`Connected to server with id: ${data.id}`)
      this.userid = data.id
    });
  }

  on (name, callback) {
    this.socket.on(name, callback)
  }

  off (name) {
    this.socket.removeListener(name)
  }

  emit (name, data) {
    this.socket.emit(name, data)
  }

  disconnect () {
    this.socket.disconnect()
  }
  
  get disconnected () {
    return this.socket.disconnected
  }
}