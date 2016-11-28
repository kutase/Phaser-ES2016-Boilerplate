import Sprite from './Sprite'

export default class SpriteSheet extends Sprite {
  constructor (game, x, y, spriteKey, enablePhysics = false, frame) {
    super(game, x, y, spriteKey, enablePhysics)

    if (frame != undefined)
      this.setFrame(frame)
  }

  addAnimation (name, rate, frames = null, isLooped = true) {
    this.sprite.animations.add(name, frames, rate, isLooped)
  }

  playAnimation (name, rate = null, loop = false, killOnComplete = false) {
    this.sprite.animations.play(name, rate, loop, killOnComplete)
  }

  getAnimation (name) {
    return this.sprite.animations.getAnimation(name)
  }

  onAnimationUpdate (name, fun, ctx = null) {
    let animation = this.getAnimation(name)
    animation.enableUpdate = true
    animation.onUpdate.add(fun, ctx)
  }

  stopAnimation (name) {
    this.sprite.animations.stop(name)
  }

  setFrame (num) {
    this.sprite.frame = num
  }
}
