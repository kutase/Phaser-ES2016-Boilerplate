export default class Sprite {
  constructor (game, x, y, spriteKey, enablePhysics = false) {
    this.game = game

    this.spriteKey = spriteKey

    let sprite = game.add.sprite(x, y, spriteKey)
    sprite.anchor.setTo(0.5)
    this.sprite = sprite

    if (enablePhysics) {
      game.physics.arcade.enable(sprite)
    }
  }

  setAnchor (x, y) {
    if (y)
      this.sprite.anchor.setTo(x, y)
    else
      this.sprite.anchor.setTo(x)
  }

  makeInvisible () {
    this.sprite.visible = false
  }

  makeVisible () {
    this.sprite.visible = true
  }

  enableInput () {
    this.sprite.inputEnabled = true
  }

  disableInput () {
    this.sprite.inputEnabled = false
  }

  set alpha (newAlpha) {
    this.sprite.alpha = newAlpha
  }

  get alpha () {
    return this.sprite.alpha
  }

  set tint (newTint) {
    this.sprite.tint = newTint
  }

  get events () {
    return this.sprite.events
  }

  get tint () {
    return this.sprite.tint
  }

  set x (x) {
    this.sprite.x = x
  }

  get x () {
    return this.sprite.x
  }

  set y (y) {
    this.sprite.y = y
  }

  get y () {
    return this.sprite.y
  }

  set rotation (rotation) {
    this.sprite.rotation = rotation
  }

  get rotation () {
    return this.sprite.rotation
  }

  get width () {
    return this.sprite.width
  }

  get height () {
    return this.sprite.height
  }

  get anchor () {
    return this.sprite.anchor
  }

  set state (newState) {
    this.sprite.x = newState.x
    this.sprite.y = newState.y
    this.sprite.rotation = newState.rotation
  }

  get state () {
    return {
      x: this.sprite.x,
      y: this.sprite.y,
      rotation: this.sprite.rotation
    }
  }

  destroy () {
    this.sprite.destroy()
  }
}
