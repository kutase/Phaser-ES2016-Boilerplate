import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import 'pixi'
import 'p2'
import Phaser from 'phaser'

//States
import BootState from '../states/Boot'
import GameState from '../states/Game'
import SplashState from '../states/Splash'

import StateStore from '../classes/StateStore'

class Game extends Phaser.Game {
  constructor () {
    let width = window.innerWidth - 20
    let height = window.innerHeight

    width = width < 1280 ? 1280 : width
    height = height < 720 ? 720 : height

    super(width, height, Phaser.AUTO, null, null);

    window.game = this

    this.gameState = new StateStore({}, '/loadGame', '/saveGame')

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }

  startState (state) {
    this.state.start(state)
  }

  removeGame () {
    this.destroy()
  }
}

export default class ReGame extends Component {
  constructor () {
    super()
    this.Game = new Game()
  }

  componentDidMount () {
    this.renderGame()
  }

  componentWillUpdate () {
    this.Game.removeGame()
  }

  componentDidUpdate () {
    this.Game = new Game()
    this.renderGame()
  }

  renderGame () {
    this.Game.parent = findDOMNode(this)
  }

  updateCanvas () {
    this.Game.removeGame()
    this.Game = new Game()
    this.renderGame()
  }

  render () {
    return (
      <div>
        <div id="game"></div>
        {process.env.NODE_ENV !== 'production' ?
          <button
            onClick={this.updateCanvas.bind(this)}
            className="btn"
            style={{margin: '5px'}}
          >
            Make update
          </button> 
        : ''}
      </div>
    )
  }
}
