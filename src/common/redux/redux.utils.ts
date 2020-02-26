import * as Immutable from 'immutable'

export interface Action {
  type: string
}

/**
 * Helper method for creating action plain objects so that the data object gets type checked by the TS compiler
 * Note: If the data object is empty ({}), then there is no need to provide the type while calling the method
 * @param type      Action name
 * @param data      Data
 * @returns {Action}    The action plain object for dispatching
 */

export function createAction<T>(type: string, data: T): Action {
  return Immutable.Map(data as any)
    .set('type', type)
    .toObject() as any
}

/**
 * Throw error when server returns a response with status 'error'
 * @param response - Response sent by server
 */
export function checkServerError(response: any): any {
  if (response.status === 'error') {
    throw response
  } else {
    return response
  }
}

interface ActionReducer<S> {
  action: Action
  handler: (state: S, action: any) => S
}

/**
 * Helper method for creating a reducer that handles the given set of actions
 *
 * @param initialState  Initial state of the store (or part of the store)
 * @param reducers      A set of reducers (action and handler)
 * @returns The generated reducer function
 */
export function createReducer<S>(
  initialState: S,
  reducers: ActionReducer<S>[],
): (S: any, Action: any) => S {
  return (state: S = initialState, action: Action = { type: 'NONE' }): any => {
    const reducer = Immutable.List(reducers).find(
      x => x.action.type === action.type,
    )
    if (reducer) {
      return reducer.handler(state, action)
    } else {
      return state
    }
  }
}
