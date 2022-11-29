import { AccountState } from 'redux/account/account.types'
import { CreateEntityAdvancedState } from 'redux/createEntityAdvanced/createEntityAdvanced.types'
import { CreateEntityAttestationState } from 'redux/createEntityAttestation/createEntityAttestation.types'
import { CreateEntityClaimsState } from 'redux/createEntityClaims/createEntityClaims.types'
import { CreateEntityPageContentState } from 'redux/createEntityPageContent/createEntityPageContent.types'
import { CreateEntitySettingsState } from 'redux/createEntitySettings/createEntitySettings.types'
import { CreateEntityTemplateState } from 'redux/createTemplate/createTemplate.types'
import { CreateEntityState } from 'redux/createEntityOld/createEntity.types'
import { EntitiesExplorerState } from 'redux/entitiesExplorer/entitiesExplorer.types'
import { FuelEntityState } from 'redux/fuelEntity/fuelEntity.types'
import { EditEntityAdvancedState } from 'redux/editEntityAdvanced/editEntityAdvanced.types'
import { EditEntityAttestationState } from 'redux/editEntityAttestation/editEntityAttestation.types'
import { EditEntityClaimsState } from 'redux/editEntityClaims/editEntityClaims.types'
import { EditEntityPageContentState } from 'redux/editEntityPageContent/editEntityPageContent.types'
import { EditEntitySettingsState } from 'redux/editEntitySettings/editEntitySettings.types'
import { EditEntityTemplateState } from 'redux/editEntityTemplate/editTemplates.types'
import { EditEntityState } from 'redux/editEntity/editEntity.types'
import { EntityExchangeState } from 'redux/selectedEntityExchange/entityExchange.types'
import { EntityAgentsState } from 'redux/selectedEntityAgents/entityAgents.types'
import { EvaluateClaimState } from 'redux/evaluateClaim/evaluateClaim.types'
import { Entity } from 'redux/selectedEntity/selectedEntity.types'
import { SubmitEntityClaimState } from 'redux/submitEntityClaim/submitEntityClaim.types'
import { ProjectType } from 'redux/project/project.types'
import { Store } from 'redux'
import { Persistor } from 'redux-persist'
import { BondState } from 'redux/bond/bond.types'
import { CreateSelectTemplateState } from 'redux/createSelectTemplate/createSelectTemplate.types'
import { EconomyState } from 'redux/entityEconomy/entityEconomy.types'
import { ConfigsState } from 'redux/configs/configs.types'
import { TCreateEntityState } from 'redux/createEntity/createEntity.types'

export interface RootState {
  account: AccountState
  activeBond: BondState
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
  newEntity: TCreateEntityState
  router: any
}

export interface ReduxStoreAndPersistor {
  store: Store<RootState>
  persistor: Persistor
}

export interface PreloadedState extends RootState, Persistor {}
