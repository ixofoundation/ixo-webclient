import { Action } from './actions';
import * as Immutable from 'immutable';

interface ActionReducer<S> {
	action: Action;
	handler: (state: S, action: any) => S;
}

/**
 * Helper method for creating a reducer that handles the given set of actions
 *
 * @param initialState  Initial state of the store (or part of the store)
 * @param reducers      A set of reducers (action and handler)
 * @returns The generated reducer function
 */
export function createReducer<S>(initialState: S, reducers: ActionReducer<S>[]): (S: any, Action: any) => S {
	return (state: S = initialState, action: Action = {type: 'NONE'}) => {
		var reducer = Immutable.List(reducers).find(x => x.action.type === action.type);
		if (reducer) {
			return reducer.handler(state, action);
		} else {
			return state;
		}
	};
}
