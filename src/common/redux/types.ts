import { KeysafeState } from '../modules/keysafe/types'
import { LoginState } from '../../modules/login/types'
import { IxoState } from '../../common/modules/ixo/types'

export interface RootState {
  keySafe: KeysafeState
  ixo: IxoState
  login: LoginState
  web3: any
  activeQuote: any
  quotePending: any
  signPending: any
  transacting: any
  account: any
  balances: any
  activeBond: any
  totalSupplies: any
}
