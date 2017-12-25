import {IAction} from './actions';
import * as Immutable from 'immutable';

interface IActionReducer<S> {
    action: IAction
    handler: (state: S, action: any) => S
}

/**
 * Helper method for creating a reducer that handles the given set of actions
 *
 * @param initialState  Initial state of the store (or part of the store)
 * @param reducers      A set of reducers (action and handler)
 * @returns The generated reducer function
 */
export function createReducer<S>(initialState: S, reducers: IActionReducer<S>[]) : (S, Action) => S {
    return (state : S = initialState, action: IAction = {type: 'NONE'}) => {
        var reducer = Immutable.List(reducers).find(x => x.action.type == action.type);
        if (reducer) {
              return reducer.handler(state, action);
        } else {
              return state;
        }
    }
}
