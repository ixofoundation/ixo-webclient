// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3')
import {
  ConnectWeb3Action,
  ResetWeb3ConnectionAction,
  Web3Actions,
} from './types'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

export const connectWeb3 = (): ConnectWeb3Action => {
  let error
  let web3

  const { web3: web3Window } = window
  if (window.ethereum) {
    // Modern dapp browsers...
    window.web3 = new Web3(window.ethereum)
    try {
      // Accounts now exposed
      web3 = window.web3
      error = {}
    } catch (error) {
      // User denied account access...
    }
  } else if (window.web3) {
    // Legacy dapp browsers...
    window.web3 = new Web3(web3Window.currentProvider)
    // Accounts always exposed
    web3 = window.web3
    error = {}
  } else {
    web3 = null
    error = { error: 'Please install MetaMask' }
  }

  return {
    type: Web3Actions.ConnectWeb3,
    payload: {
      web3,
      error,
    },
  }
}

export const resetWeb3Connection = (): ResetWeb3ConnectionAction => ({
  type: Web3Actions.ResetWeb3Connection,
})
