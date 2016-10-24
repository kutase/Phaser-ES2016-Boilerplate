import 'pixi'
import 'p2'
import Phaser from 'phaser'

//States
import BootState from '../states/Boot'
import GameState from '../states/Game'
import SplashState from '../states/Splash'

export default class Game extends Phaser.Game {
  constructor () {
    let width = window.innerWidth - 20
    let height = window.innerHeight

    width = width < 1280 ? 1280 : width
    height = height < 720 ? 720 : height

    super(width, height, Phaser.AUTO, null, null);

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }

  startState (stateName) {
    this.state.start(stateName)
  }

  removeGame () {
    this.destroy()
  }
}
