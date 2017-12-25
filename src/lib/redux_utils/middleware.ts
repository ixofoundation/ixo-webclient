import {IAction} from "./actions";
import * as Immutable from 'immutable';
import {Middleware, MiddlewareAPI} from "redux";

interface IMiddlewareHandler<S> {
  /** Action the middleware handles */
  action: IAction
  /** Gets called before the state changes. If it returns false, the action is not executed */
  beforeHandler?: (storeAPI: MiddlewareAPI<S>, action: any) => boolean
  /** Gets called after the state changes */
  afterHandler?: (storeAPI: MiddlewareAPI<S>, action: any) => void
}

/**
 * Helper method for creating a middleware that handles the given set of actions
 *
 * @param handlers      A set of middleware handlers (action, beforeHandler and afterHandler)
 * @returns The generated middleware function
 */


/**export function createMiddleware<S>(handlers: IMiddlewareHandler<S>[]): Middleware {
  return (storeAPI: MiddlewareAPI<S>) => next => (action: any = {type: "NONE"}) => {

    const actionHandler = Immutable.List(handlers).find(x => x.action.type == action.type);

    let shouldProceed = true;

    if (actionHandler && actionHandler.beforeHandler) {
      if (actionHandler.beforeHandler(storeAPI, action) === false) {
        shouldProceed = false;
      }
    }

    let result = storeAPI.getState();

    if (shouldProceed) {
      result = next(action);

      if (actionHandler && actionHandler.afterHandler) {
        actionHandler.afterHandler(storeAPI, action);
      }
    }
    return result;
  }

}*/
