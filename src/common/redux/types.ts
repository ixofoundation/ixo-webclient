import { KeysafeState } from '../modules/keysafe/types'
import { LoginState } from '../../modules/login/types'
import { IxoState } from '../../common/modules/ixo/types'
import { QuoteState } from '../../modules/quote/types'
import { BondState } from '../../modules/bond/types'
import { Currency } from '../../types/models'
import { AccountState } from '../../modules/account/types'

export interface RootState {
  keySafe: KeysafeState
  ixo: IxoState
  login: LoginState
  web3: any
  activeQuote: QuoteState
  account: AccountState
  activeBond: BondState
  totalSupplies: Currency[]
}
