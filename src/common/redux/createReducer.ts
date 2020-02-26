import { Reducer } from 'redux'
import { Action } from '../../model'

export default function createReducer<S>(
  initialState: S,
  handlers: any,
): Reducer<S> {
  const r = (state: S = initialState, action: Action): S => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }

  return (r as unknown) as Reducer<S>
}
