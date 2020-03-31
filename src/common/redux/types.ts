import { KeysafeState } from '../../modules/keysafe/types'
import { IxoState } from '../../modules/ixo/types'
import { QuoteState } from '../../modules/quote/types'
import { BondState } from '../../modules/bond/types'
import { Currency } from '../../types/models'
import { AccountState } from '../../modules/account/types'
import { BondBuyState } from 'src/modules/BondBuy/types'

export interface RootState {
  keySafe: KeysafeState
  ixo: IxoState
  web3: any
  activeQuote: QuoteState
  bondBuy: BondBuyState
  account: AccountState
  bondAccountOrders: any[]
  activeBond: BondState
  tokenSupply: Currency[]
}
