import { Color, Easing } from 'phaser'

export default class Animations {
  constructor (game) {
    this.game = game
  }

  tweenTint (sprite, startColor, endColor, duration, done = null, easing = Easing.Default) {
    let colorBlend = { step: 0 }

    let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, duration, easing, false)

    colorTween.onUpdateCallback(() => {
      sprite.tint = Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1)
    })

    sprite.tint = startColor

    if (done) {
      colorTween.onComplete.add(done)
    }

    colorTween.start()
  }

  tweenTintFlash (sprite, endColor, duration, done = null) {
    let startColor = sprite.tint

    this.tweenTint(sprite, startColor, endColor, duration, () => {
      this.tweenTint(sprite, endColor, startColor, duration, () => {
        sprite.tint = startColor
        done && done()
      }, Easing.Linear.None)
    }, Easing.Linear.None)
  }
}