import * as constants from '../constants/Counter'

const initialState = 0

export default function counter (state = initialState, action) {
  switch (action.type) {
    case constants.INCREMENT:
      return ++state

    case constants.DECREMENT:
      return --state

    default:
      return state
  }
}