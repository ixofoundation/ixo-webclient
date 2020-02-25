import { Quote } from './quote'
import { Bond } from './bond'
import { Currency } from './../model'
import { Account } from './account'

export interface Store {
  activeBond: Bond
  totalSupplies: Currency[]
  account: Account
  activeQuote: Quote
  quotePending: boolean
  signPending: boolean
  transacting: boolean
}
