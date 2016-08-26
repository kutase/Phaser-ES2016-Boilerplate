import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader'

import Game from './game/components/Game'

import './styles/app.css'

export default class App extends Component {
  render () {
    return (
      <Game />
    )
  }
}
