import { Web3State, Web3ActionTypes, Web3Actions } from './types'

export const initialState: Web3State = {
  web3: null,
  error: {},
}

export const reducer = (
  state = initialState,
  action: Web3ActionTypes,
): Web3State => {
  switch (action.type) {
    case Web3Actions.ConnectWeb3:
      return {
        ...state,
        web3: action.payload.web3,
        error: action.payload.error,
      }
    case Web3Actions.ResetWeb3Connection:
      return initialState
  }

  return state
}
