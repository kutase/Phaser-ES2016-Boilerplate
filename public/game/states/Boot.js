import Phaser from 'phaser'
import WebFont from 'webfontloader'

import Splash from './Splash'

export default class Boot extends Phaser.State {
  init (props) {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: [ 'Nunito' ]
      },
      active: this.fontsLoaded
    })

    this.load.image('stars', './assets/starfield.jpg')
    this.load.image('shipMain', './assets/shipMain.png')
    this.load.image('shipBigPart', './assets/shipBigPartN.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
