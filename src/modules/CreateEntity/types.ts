import { EntityType } from '../Entities/types'

export enum Step {
  PageContent = 1,
  Settings = 2,
  Advanced = 3,
}

export interface CreateEntityState {
  currentStep: Step
  entityType: EntityType
}

export enum CreateEntityActions {
  GoToStep = 'ixo/CreateEntity/GO_TO_STEP',
}
