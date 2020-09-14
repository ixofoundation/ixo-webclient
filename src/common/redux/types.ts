import { Store } from 'redux'
import { Persistor } from 'redux-persist'
import { KeysafeState } from '../../modules/keysafe/types'
import { IxoState } from '../../modules/ixo/types'
import { BondState } from '../../modules/BondModules/bond/types'
import { Currency } from '../../types/models'
import { AccountState } from 'modules/Account/types'
import { BondBuyState } from 'modules/BondModules/BondBuy/types'
import { BondSellState } from 'modules/BondModules/BondSell/types'
import { BondSwapState } from 'modules/BondModules/BondSwap/types'
import { EntitiesExplorerState } from 'modules/Entities/EntitiesExplorer/types'
import { FuelEntityState } from 'modules/Entities/FuelEntity/types'
import { SubmitEntityClaimState } from 'modules/EntityClaims/SubmitEntityClaim/types'
import { CreateEntityPageContentState } from 'modules/Entities/CreateEntity/CreateEntityPageContent/types'
import { CreateEntityAttestationState } from 'modules/Entities/CreateEntity/CreateEntityAttestation/types'
import { CreateEntityState } from 'modules/Entities/CreateEntity/types'
import { CreateEntitySettingsState } from 'modules/Entities/CreateEntity/CreateEntitySettings/types'
import { CreateEntityAdvancedState } from 'modules/Entities/CreateEntity/CreateEntityAdvanced/types'
import { CreateEntityClaimsState } from 'modules/Entities/CreateEntity/CreateEntityClaims/types'
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
  entities: EntitiesExplorerState
  fuelEntity: FuelEntityState
  submitEntityClaim: SubmitEntityClaimState
  selectedEntity: any // TODO!
  createEntity: CreateEntityState
  createEntityPageContent: CreateEntityPageContentState
  createEntityAttestation: CreateEntityAttestationState
  createEntitySettings: CreateEntitySettingsState
  createEntityAdvanced: CreateEntityAdvancedState
  createEntityClaims: CreateEntityClaimsState
  projectState: ProjectType
  router: any
}

export interface ReduxStoreAndPersistor {
  store: Store<RootState>
  persistor: Persistor
}

export interface PreloadedState extends RootState, Persistor {}
