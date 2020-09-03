import { EntityType } from '../Entities/types'
import { RootState } from 'common/redux/types'

export const PDS_URL = process.env.REACT_APP_PDS_URL

export interface CreateEntityState {
  step: number
  entityType: EntityType
  creating: boolean
  error: string
}

export enum CreateEntityActions {
  GoToStep = 'ixo/CreateEntity/GO_TO_STEP',
  NewEntity = 'ixo/CreateEntity/NEW_ENTITY',
  CreateEntity = 'ixo/CreateEntity/CREATE_ENTITY',
  CreateEntityPending = 'ixo/CreateEntity/CREATE_ENTITY_PENDING',
  CreateEntitySuccess = 'ixo/CreateEntity/CREATE_ENTITY_FULFILLED',
  CreateEntityFailure = 'ixo/CreateEntity/CREATE_REJECTED',
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
    selectPageContent: (state: RootState) => any
    selectHeaderInfo: (
      state: RootState,
    ) => {
      name: string
      description: string
      image: string
      imageDescription: string
      location: string
      sdgs: string[]
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

export interface CreateEntityAction {
  type: typeof CreateEntityActions.CreateEntity
  payload: Promise<any>
}

export type CreateEntityActionTypes =
  | GoToStepAction
  | NewEntityAction
  | CreateEntityAction
