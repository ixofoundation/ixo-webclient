import { KeysafeState } from '../../modules/keysafe/types'
import { IxoState } from '../../modules/ixo/types'
import { BondState } from '../../modules/bond/types'
import { Currency } from '../../types/models'
import { AccountState } from '../../modules/account/types'
import { BondBuyState } from 'src/modules/BondBuy/types'
import { BondSellState } from 'src/modules/BondSell/types'
import { BondSwapState } from 'src/modules/BondSwap/types'
import { ProjectsState } from '../../modules/Projects/types'

export interface RootState {
  keySafe: KeysafeState
  ixo: IxoState
  web3: any
  bondBuy: BondBuyState
  bondSell: BondSellState
  bondSwap: BondSwapState
  account: AccountState
  bondAccountOrders: any[]
  activeBond: BondState
  tokenSupply: Currency[]
  projects: ProjectsState
}
