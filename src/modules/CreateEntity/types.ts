import { EntityType } from '../Entities/types'

export const PDS_URL = process.env.REACT_APP_PDS_URL

export enum Step {
  PageContent = 1,
  // Attestation = 'Attestation',
  // Evaluation = 'Evaluation',
  Settings = 2,
  Advanced = 3,
}

export interface CreateEntityState {
  step: Step
  entityType: EntityType
}

export enum CreateEntityActions {
  GoToStep = 'ixo/CreateEntity/GO_TO_STEP',
  NewEntity = 'ixo/CreateEntity/NEW_ENTITY',
}

export interface FileContent {
  fileSrc: string
  uploading: boolean
}

export interface Validation {
  identifier: string
  validated: boolean
  errors: string[]
}

export type StepNameStrategyMap = {
  [TKey in Step]: {
    name: string
  }
}

/* export type EntityStepStrategyMap = {
  [TKey in EntityType]: {
    stepCount: string
  }
} */

export interface FormCardProps {
  ref: any
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
  handleSubmitted: () => void
  handleRemoveSection?: () => void
}

export interface GoToStepAction {
  type: typeof CreateEntityActions.GoToStep
  payload: {
    step: Step
  }
}

export interface NewEntityAction {
  type: typeof CreateEntityActions.NewEntity
  payload: {
    entityType: EntityType
  }
}

export type CreateEntityActionTypes = GoToStepAction | NewEntityAction
