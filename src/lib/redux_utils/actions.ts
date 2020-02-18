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
