import { Line, Rectangle } from 'phaser'

export const angleBetweenPoints = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x)
}

export const implementBound = (lowerBound, upperBound, input, angleSpeed = 0.5) => {
  if (input < lowerBound || input > upperBound) {
    let distance_to_lower, distance_to_upper

    distance_to_upper = Math.abs(upperBound - input)

    distance_to_lower = Math.abs(lowerBound - input)

    if (distance_to_lower < distance_to_upper)
      return Math.min(lowerBound, input + angleSpeed * Math.pow(distance_to_lower, 0.5))
    else
      return Math.max(upperBound, input - angleSpeed * Math.pow(distance_to_upper, 0.5))
  } else {
    return input
  }
}

// Normalise angle1 to angle2
export const normaliseAngle = (angle1, angle2) => {
  while (Math.abs(angle1 - angle2) > Math.PI)
    angle1 += 2 * Math.PI * (angle1 < angle2 ? 1 : -1)

  return angle1
}

export const distance = (x1, y1, x2, y2) => {
  let dx = x1 - x2
  let dy = y1 - y2

  return Math.sqrt(dx * dx + dy * dy)
}

export const distanceBetweenPoints = (p1, p2) => {
  let dx = p1.x - p2.x
  let dy = p1.y - p2.y

  return Math.sqrt(dx * dx + dy * dy)
}

export const generateColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export const lightenColor = (hex, lum) => {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ]
  }

  lum = lum || 0

  // convert to decimal and change luminosity
  let rgb = "", c, i
  for (let i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
    rgb += ("00" + c).substr(c.length)
  }

  return rgb
}

export const getRandomElement = (array) => {
  return array[ Math.floor(Math.random() * array.length) ]
}

// Shuffle elements in array
// let arr = [1,2,3]
// shuffle(arr)
// console.log(arr) -> [2,3,1]
export const shuffle = (array) => {
  let j, x, i
  for (let i = array.length; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    x = array[ i - 1 ]
    array[ i - 1 ] = array[ j ]
    array[ j ] = x
  }
}

// Rotate array
// let arr = [1,2,3]
// arrayRotate(arr)
// console.log(arr) -> [3,2,1]
export const arrayRotate = (arr, reverse = false) => {
  if (reverse)
    arr.push(arr.shift())
  else
    arr.unshift(arr.pop())

  return arr
}

export const pointInRect = (point, rect) => {
  let { x, y, width, height } = rect

  return (point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height)
}

export const findNode = (point, root, pred = () => true) => {
  let queue = [ root ]

  let lastFindedNode = null
  while (queue.length > 0) {
    let node = queue.pop()

    if (pointInRect(point, node.getRect()) && pred(node))
      lastFindedNode = node

    if (!node.primitive)
      node.children.forEach(el => queue.push(el))
  }

  return lastFindedNode
}

export const checkCollision = (line, sprite) => {
  let x = sprite.x
  let y = sprite.y
  let width = sprite.width
  let height = sprite.height
  let anchor = sprite.anchor

  let trueX = sprite.x - width * anchor.x
  let trueY = sprite.y - height * anchor.y

  let lines = [
    new Line(trueX, trueY, trueX + width, trueY),
    new Line(trueX + width, trueY, trueX + width, trueY + height),
    new Line(trueX, trueY + height, trueX + width, trueY + height),
    new Line(trueX, trueY, trueX, trueY + height)
  ]

  let lastCollision
  let lastDistance = Infinity
  for (let spriteLine of lines) {
    let collision = line.intersects(spriteLine)

    if (collision) {
      let dist = distanceBetweenPoints(line.start, collision)

      if (dist < lastDistance) {
        lastDistance = dist
        lastCollision = collision
      }
    }
  }

  if (!lastCollision) return null

  return {
    point: lastCollision,
    distance: lastDistance
  }
}

export const lineIntersectsGroup = (line, group, stepRate = 1) => {
  let coords = line.coordinatesOnLine(stepRate)

  let resSprite = null
  let lastDistance = Infinity

  for (let child of group.children) {
    let rect = child.body

    for (let coord of coords) {
      if (rect.hitTest(coord[ 0 ], coord[ 1 ])) {
        if (!resSprite) {
          resSprite = child
          lastDistance = distance(line.start.x, line.start.y, coord[ 0 ], coord[ 1 ])
        } else {
          let dist = distance(line.start.x, line.start.y, coord[ 0 ], coord[ 1 ])
          if (dist < lastDistance) {
            resSprite = child
            lastDistance = dist
          }
        }
      }
    }
  }

  return {
    sprite: resSprite,
    distance: lastDistance
  }
}

export const lineIntersectsGroupAll = (line, group, stepRate = 1) => {
  let coords = line.coordinatesOnLine(stepRate)

  let groupObjects = []

  for (let child of group.children) {
    let rect = child.body

    for (let coord of coords) {
      if (rect.hitTest(coord[ 0 ], coord[ 1 ])) {
        if (groupObjects.indexOf(child) == -1)
          groupObjects.push(child)
        else
          break
      }
    }
  }

  return groupObjects
}
