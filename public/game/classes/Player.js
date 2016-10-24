import Sprite from './Sprite'

export default class Player extends Sprite {
  constructor (game, x, y, spriteKey) {
    super(game, x, y, spriteKey, true)
  }

  setAnchor (x, y) {
    if (y)
      this.sprite.anchor.setTo(x, y)
    else
      this.sprite.anchor.setTo(x)
  }

  bindCamera () {
    let game = this.game
    game.camera.follow(this.sprite, game.camera.FOLLOW_LOCKON)
  }

  unbindCamera () {
    let game = this.game
    game.camera.follow(null)
  }
}
