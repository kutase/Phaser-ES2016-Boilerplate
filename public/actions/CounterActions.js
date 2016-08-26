import * as constants from '../constants/Counter'
import 'whatwg-fetch'
import { parseJSON, checkStatus } from '../fetchLib'

export function increment () {
  return dispatch => {
    dispatch({
      type: constants.INCREMENT
    })
  }
}

export function decrement () {
  return dispatch => {
    dispatch({
      type: constants.DECREMENT
    })
  }
}
