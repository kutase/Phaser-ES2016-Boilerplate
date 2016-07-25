import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Game from './game/components/Game'

import Counter from './components/Counter'

import configureStore from './store/configureStore'
import './styles/app.css'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    )
  }
}
