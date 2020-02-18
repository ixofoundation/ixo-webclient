import { QuoteAction } from './quote'
import { WalletAction } from './account'
import { BondAction } from './bond'

export interface Currency {
  amount?: number
  denom?: string
}

export type Action = QuoteAction | WalletAction | BondAction
