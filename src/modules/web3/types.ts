export type Web3State = {
  web3: any
  error: Record<string, any>
}

export enum Web3Actions {
  ConnectWeb3 = 'ixo/Web3/CONNECT_WEB3',
  ResetWeb3Connection = 'ixo/Web3/RESET_WEB3_CONNECTION',
}

export interface ConnectWeb3Action {
  type: typeof Web3Actions.ConnectWeb3
  payload: {
    web3: any
    error: Record<string, any>
  }
}

export interface ResetWeb3ConnectionAction {
  type: typeof Web3Actions.ResetWeb3Connection
}

export type Web3ActionTypes = ConnectWeb3Action | ResetWeb3ConnectionAction
