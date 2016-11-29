import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './styles/app.css'

import Game from './game/components/Game'

render(
  <AppContainer>
    <Game />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./game/components/Game', () => {
    const NextGame = require('./game/components/Game').default
    render(
      <AppContainer>
         <NextGame />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
