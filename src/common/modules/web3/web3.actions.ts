import { createAction } from '../../redux/redux.utils'
import { Web3Result, WEB3_RESULT } from './types'
import * as Web3 from 'web3'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

export function connectWeb3() {
  return (dispatch): void => {
    // @ts-ignore
    const { web3 }: Web3 = window
    if (window.ethereum) {
      // Modern dapp browsers...
      // @ts-ignore
      window.web3 = new Web3(ethereum)
      try {
        // Acccounts now exposed
        dispatch(
          createAction<Web3Result>(WEB3_RESULT.type, {
            web3: window.web3,
            error: {},
          }),
        )
      } catch (error) {
        // User denied account access...
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      // @ts-ignore
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      dispatch(
        createAction<Web3Result>(WEB3_RESULT.type, {
          web3: window.web3,
          error: {},
        }),
      )
    } else {
      dispatch(
        createAction<Web3Result>(WEB3_RESULT.type, {
          web3: null,
          error: { error: 'Please install MetaMask' },
        }),
      )
    }
  }
}

export function resetWeb3Connection() {
  return (dispatch): void => {
    dispatch(
      createAction<Web3Result>(WEB3_RESULT.type, {
        web3: null,
        error: {},
      }),
    )
  }
}
