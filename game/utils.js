exports.doInputAction = (action, player) => {
  switch (action.type) {
    case 'moveUp':
      player.x -= 5 * Math.cos(player.rotation)
      player.y -= 5 * Math.sin(player.rotation)
      break

    case 'moveDown':
      player.x += 5 * Math.cos(player.rotation)
      player.y += 5 * Math.sin(player.rotation)
      break

    case 'rotateLeft':
      player.rotation -= Math.PI / 180 * 4
      break

    case 'rotateRight':
      player.rotation += Math.PI / 180 * 4
      break
  }
}
