import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as counterActions from '../actions/CounterActions'

class Counter extends Component {
  render () {
    const counter = this.props.counter
    const { increment, decrement } = this.props.counterActions
    return (
      <div>
        <span>{counter}</span>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    counterActions: bindActionCreators(counterActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
