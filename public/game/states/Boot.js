import Phaser from 'phaser'

import Splash from './Splash'

export default class Boot extends Phaser.State {
  init (props) {
    this.stage.backgroundColor = '#000'
  }

  preload () {
    this.load.image('stars', './assets/starfield.jpg')
    this.load.image('shipMain', './assets/shipMain.png')
    this.load.image('shipBigPart', './assets/shipBigPartN.png')
  }

  render () {
    this.state.start('Splash')
  }

}
