import { EntityType } from '../Entities/types'

export const PDS_URL = process.env.REACT_APP_PDS_URL

export interface CreateEntityState {
  step: number
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

export type EntityStepStrategyMap = {
  [TKey in EntityType]: {
    stepCount: number
    steps: {
      [stepNumber: number]: {
        container: any
        urls: string[]
        name: string
        previousStep: number
        nextStep: number
      }
    }
  }
}

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
    step: number
  }
}

export interface NewEntityAction {
  type: typeof CreateEntityActions.NewEntity
  payload: {
    entityType: EntityType
  }
}

export type CreateEntityActionTypes = GoToStepAction | NewEntityAction
