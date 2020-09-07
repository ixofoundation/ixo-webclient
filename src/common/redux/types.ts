import { KeysafeState } from '../../modules/keysafe/types'
import { IxoState } from '../../modules/ixo/types'
import { BondState } from '../../modules/BondModules/bond/types'
import { Currency } from '../../types/models'
import { AccountState } from 'modules/Account/types'
import { BondBuyState } from 'modules/BondModules/BondBuy/types'
import { BondSellState } from 'modules/BondModules/BondSell/types'
import { BondSwapState } from 'modules/BondModules/BondSwap/types'
import { EntitiesState } from 'modules/EntityModules/Entities/types'
import { FuelEntityState } from 'modules/EntityModules/FuelEntity/types'
import { SubmitEntityClaimState } from 'modules/EntityModules/SubmitEntityClaim/types'
import { Entity } from 'modules/EntityModules/Entities/types'
import { CreateEntityPageContentState } from 'modules/EntityModules/CreateEntityPageContent/types'
import { CreateEntityAttestationState } from 'modules/EntityModules/CreateEntityAttestation/types'
import { CreateEntityState } from 'modules/EntityModules/CreateEntity/types'
import { CreateEntitySettingsState } from 'modules/EntityModules/CreateEntitySettings/types'
import { CreateEntityAdvancedState } from 'modules/EntityModules/CreateEntityAdvanced/types'
import { CreateEntityClaimsState } from 'modules/EntityModules/CreateEntityClaims/types'
import { ProjectType } from 'pages/bond/store/types'
export interface RootState {
  keySafe: KeysafeState
  ixo: IxoState
  web3: any
  bondBuy: BondBuyState
  bondSell: BondSellState
  bondSwap: BondSwapState
  account: AccountState
  bondAccounts: any[]
  bondAccountOrders: any[]
  activeBond: BondState
  tokenSupply: Currency[]
  entities: EntitiesState
  fuelEntity: FuelEntityState
  submitEntityClaim: SubmitEntityClaimState
  selectedEntity: Entity
  createEntity: CreateEntityState
  createEntityPageContent: CreateEntityPageContentState
  createEntityAttestation: CreateEntityAttestationState
  createEntitySettings: CreateEntitySettingsState
  createEntityAdvanced: CreateEntityAdvancedState
  createEntityClaims: CreateEntityClaimsState
  projectState: ProjectType
  router: any
}
