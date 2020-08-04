import { KeysafeState } from '../../modules/keysafe/types'
import { IxoState } from '../../modules/ixo/types'
import { BondState } from '../../modules/bond/types'
import { Currency } from '../../types/models'
import { AccountState } from '../../modules/Account/types'
import { BondBuyState } from '../../modules/BondBuy/types'
import { BondSellState } from '../../modules/BondSell/types'
import { BondSwapState } from '../../modules/BondSwap/types'
import { EntitiesState } from '../../modules/Entities/types'
import { FuelEntityState } from '../../modules/FuelEntity/types'
import { SubmitEntityClaimState } from '../../modules/SubmitEntityClaim/types'
import { CreateEntityPageContentState } from '../../modules/CreateEntityPageContent/types'
import { CreateClaimTemplateState } from '../../modules/CreateClaimTemplate/types'
import { Entity } from '../../modules/Entities/types'
import { CreateEntitySettingsState } from 'src/modules/CreateEntitySettings/types'
import { CreateEntityAdvancedState } from 'src/modules/CreateEntityAdvanced/types'

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
  entities: EntitiesState
  fuelEntity: FuelEntityState
  submitEntityClaim: SubmitEntityClaimState
  createClaimTemplate: CreateClaimTemplateState
  selectedEntity: Entity
  createEntityPageContent: CreateEntityPageContentState
  createEntitySettings: CreateEntitySettingsState
  createEntityAdvanced: CreateEntityAdvancedState
}
