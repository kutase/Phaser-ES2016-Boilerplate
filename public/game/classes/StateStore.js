import { checkStatus, parseJSON, postJSON } from '../../fetchLib'
import uuid from 'node-uuid'

export default class Store {
  constructor (state = {}, loadURL, saveURL) {
    this.state = state
    this.loadURL = loadURL
    this.saveURL = saveURL
  }

  updateState (newState) {
    this.state = {
      ...this.state,
      ...newState
    }
  }

  getState (name) {
    return this.state[name]
  }

  saveState (type = 'local') {
    switch (type) {
      case 'local':
        this.saveInLocalStorage()
        break
      case 'server':
        this.saveStateOnServer()
        break
    }
  }

  loadState (type = 'local') {
    switch (type) {
      case 'local':
        this.loadFromLocalStorage()
        break
      case 'server':
        this.loadStateFromServer()
        break
    }
  }

  saveInLocalStorage () {
    let userId = uuid.v4()

    localStorage.setItem('userId', userId)
    localStorage.setItem(userId, JSON.stringify(this.state))
  }

  loadFromLocalStorage () {
    let userId = localStorage.getItem('userId')

    if (userId) {
      let state = localStorage.getItem(userId)

      if (state) {
        this.state = JSON.parse(state)
        return this.state
      } else {
        console.error('Wrong localStorage state!')
      }
    } else {
      console.error('userId was not found!')
    }
  }

  saveStateOnServer () {
    let settings = postJSON(this.state)

    fetch(this.saveURL, settings)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        // todo
      })
      .catch(err => {
        console.error(`Can't save state on server!`)
        console.error(err.message)
      })
  }

  loadStateFromServer () {
    let settings = {}

    fetch(this.loadURL, settings)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => this.state = json)
      .catch(err => {
        console.error(`Can't load state from server!`)
        console.error(err.message)
      })
  }
}