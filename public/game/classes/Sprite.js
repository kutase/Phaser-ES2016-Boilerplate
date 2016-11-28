export default class Sprite {
  constructor (game, x, y, spriteKey, enablePhysics = false) {
    this.game = game

    this.spriteKey = spriteKey

    this.initSprite(x, y, spriteKey)

    if (enablePhysics) {
      this.physicsEnabled = true
      game.physics.arcade.enable(this.sprite)
    }
  }

  setBodyCircle (r) {
    if (this.physicsEnabled)
      this.sprite.body.setCircle(r)
  }

  setBodySize (width, height, offsetX, offsetY) {
    if (this.physicsEnabled)
      this.sprite.body.setSize(width, height, offsetX, offsetY)
  }

  setBodyImmovable () {
    if (this.physicsEnabled)
      this.sprite.body.immovable = true
  }

  onFloor () {
    if (this.physicsEnabled)
      return this.sprite.body.onFloor()
  }

  enableBody () {
    if (this.sprite.body)
      this.sprite.body.enable = true
  }

  disableBody () {
    if (this.sprite.body)
      this.sprite.body.enable = false
  }


  enableHandCursor () {
    if (this.sprite.input) {
      this.sprite.input.useHandCursor = true
    }
  }

  disableHandCursor () {
    if (this.sprite.input) {
      this.sprite.input.useHandCursor = false
      this.game.canvas.style.cursor = "inherit"
    }
  }

  addToGroup (group) {
    this.group = group
    group.add(this.sprite)
  }

  enableGravity (value, collideWorldBounds = false) {
    if (this.physicsEnabled) {
      this.sprite.body.gravity.y = value

      if (collideWorldBounds)
        this.collideWorldBounds()
    }
  }

  set blocked (val) {}

  get blocked () {
    if (this.sprite.body)
      return this.sprite.body.blocked
  }

  set touching (val) {}

  get touching () {
    if (this.sprite.body)
      return this.sprite.body.touching
  }

  bringToTop () {
    this.sprite.bringToTop()
  }

  set velocity (point) {
    if (this.physicsEnabled && this.sprite.body) {
      let { x, y } = point

      this.sprite.body.velocity.setTo(x, y)
    }
  }

  get velocity () {
    if (this.physicsEnabled && this.sprite.body) {
      return this.sprite.body.velocity
    }
  }

  onInputDown (fun, ctx) {
    if (this.sprite.inputEnabled)
      this.sprite.events.onInputDown.add(fun, ctx)
  }

  clearAllDownEvents () {
    if (this.sprite.inputEnabled)
      this.sprite.events.onInputDown.removeAll()
  }

  onInputOver (fun, ctx) {
    if (this.sprite.inputEnabled)
      this.sprite.events.onInputOver.add(fun, ctx)
  }

  clearAllOverEvents () {
    if (this.sprite.inputEnabled)
      this.sprite.events.onInputOver.removeAll()
  }

  onInputOut (fun, ctx) {
    if (this.sprite.inputEnabled)
      this.sprite.events.onInputOut.add(fun, ctx)
  }

  clearAllOutEvents () {
    if (this.sprite.inputEnabled)
      this.sprite.events.onInputOut.removeAll()
  }

  collideWorldBounds () {
    if (this.physicsEnabled)
      this.sprite.body.collideWorldBounds = true
  }

  initSprite (x, y, spriteKey) {
    this.sprite = this.game.add.sprite(x, y, spriteKey)
    this.sprite.anchor.setTo(0.5)
  }

  setAnchor (x, y) {
    if (y != undefined)
      this.sprite.anchor.setTo(x, y)
    else
      this.sprite.anchor.setTo(x)
  }

  setScale (x, y) {
    if (x != undefined)
      this.sprite.scale.x = x

    if (y != undefined)
      this.sprite.scale.y = y
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

  set width(newWidth) {
    this.sprite.width = newWidth
  }

  get height () {
    return this.sprite.height
  }

  set height(newHeight) {
    this.sprite.height = newHeight
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
