import { AccountState } from 'modules/Account/types'
import { BondBuyState } from 'modules/BondModules/BondBuy/types'
import { BondSellState } from 'modules/BondModules/BondSell/types'
import { BondSwapState } from 'modules/BondModules/BondSwap/types'
import { CreateEntityAdvancedState } from 'modules/Entities/CreateEntity/CreateEntityAdvanced/types'
import { CreateEntityAttestationState } from 'modules/Entities/CreateEntity/CreateEntityAttestation/types'
import { CreateEntityClaimsState } from 'modules/Entities/CreateEntity/CreateEntityClaims/types'
import { CreateEntityPageContentState } from 'modules/Entities/CreateEntity/CreateEntityPageContent/types'
import { CreateEntitySettingsState } from 'modules/Entities/CreateEntity/CreateEntitySettings/types'
import { CreateEntityTemplateState } from 'modules/Entities/CreateEntity/CreateTemplate/types'
import { CreateEntityState } from 'modules/Entities/CreateEntity/types'
import { EntitiesExplorerState } from 'modules/Entities/EntitiesExplorer/types'
import { FuelEntityState } from 'modules/Entities/FuelEntity/types'
import { EditEntityAdvancedState } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityAdvanced/types'
import { EditEntityAttestationState } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityAttestation/types'
import { EditEntityClaimsState } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityClaims/types'
import { EditEntityPageContentState } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntityPageContent/types'
import { EditEntitySettingsState } from 'modules/Entities/SelectedEntity/EntityEdit/EditEntitySettings/types'
import { EditEntityTemplateState } from 'modules/Entities/SelectedEntity/EntityEdit/EditTemplate/types'
import { EditEntityState } from 'modules/Entities/SelectedEntity/EntityEdit/types'
import { EntityExchangeState } from 'modules/Entities/SelectedEntity/EntityExchange/types'
import { EntityAgentsState } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/types'
import { EvaluateClaimState } from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/types'
import { Entity } from 'modules/Entities/SelectedEntity/types'
import { SubmitEntityClaimState } from 'modules/EntityClaims/SubmitEntityClaim/types'
import { ProjectType } from 'pages/bond/store/types'
import { Store } from 'redux'
import { Persistor } from 'redux-persist'
import { BondState } from '../../modules/BondModules/bond/types'
import { CreateSelectTemplateState } from '../../modules/Entities/CreateEntity/CreateSelectTemplate/types'
import { EconomyState } from 'modules/Entities/SelectedEntity/EntityEconomy/types'
import { Currency } from '../../types/models'
import { ConfigsState } from 'states/configs/configs.types'

export interface RootState {
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
  selectedEntity: Entity
  selectedEntityAgents: EntityAgentsState
  selectedEntityExchange: EntityExchangeState
  createEntity: CreateEntityState
  createEntityPageContent: CreateEntityPageContentState
  createEntityAttestation: CreateEntityAttestationState
  createEntitySettings: CreateEntitySettingsState
  createEntityAdvanced: CreateEntityAdvancedState
  createEntityClaims: CreateEntityClaimsState
  createEntityTemplate: CreateEntityTemplateState
  editEntity: EditEntityState
  editEntityPageContent: EditEntityPageContentState
  editEntityAttestation: EditEntityAttestationState
  editEntitySettings: EditEntitySettingsState
  editEntityAdvanced: EditEntityAdvancedState
  editEntityClaims: EditEntityClaimsState
  editEntityTemplate: EditEntityTemplateState
  projectState: ProjectType
  evaluateClaim: EvaluateClaimState
  createSelectTemplate: CreateSelectTemplateState
  economy: EconomyState
  configs: ConfigsState
  router: any
}

export interface ReduxStoreAndPersistor {
  store: Store<RootState>
  persistor: Persistor
}

export interface PreloadedState extends RootState, Persistor {}
