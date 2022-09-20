import { EntityType } from '../../types'
import { RootState } from 'common/redux/types'

export interface EditEntityState {
  step: number
  entityType: EntityType
  editing: boolean
  edited: boolean
  error: string
  entityDid: string
}

export enum EditEntityActions {
  GoToStep = 'ixo/EditEntity/GO_TO_STEP',
  NewEntity = 'ixo/EditEntity/NEW_ENTITY',
  EditEntity = 'ixo/EditEntity/EDIT_ENTITY',
  EditEntityStart = 'ixo/EditEntity/EDIT_ENTITY_START',
  EditEntitySuccess = 'ixo/EditEntity/EDIT_ENTITY_SUCCESS',
  EditEntityFailure = 'ixo/EditEntity/EDIT_ENTITY_FAILURE',
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
        url: string
        name: string
        previousStep: number
        nextStep: number
      }
    }
    selectPageContentApiPayload: (state: RootState) => any
    selectHeaderInfoApiPayload: (state: RootState) => any
    selectClaimsApiPayload: (state: RootState) => any
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
  type: typeof EditEntityActions.GoToStep
  payload: {
    step: number
  }
}

export interface NewEntityAction {
  type: typeof EditEntityActions.NewEntity
  payload: {
    entityType: EntityType
    entityDid: string
  }
}

export interface EditEntityAction {
  type: typeof EditEntityActions.EditEntity
  payload: Promise<any>
}

export interface EditEntityStartAction {
  type: typeof EditEntityActions.EditEntityStart
}

export interface EditEntitySuccessAction {
  type: typeof EditEntityActions.EditEntitySuccess
}

export interface EditEntityFailureAction {
  type: typeof EditEntityActions.EditEntityFailure
  payload: {
    error
  }
}

export type EditEntityActionTypes =
  | GoToStepAction
  | NewEntityAction
  | EditEntityAction
  | EditEntityStartAction
  | EditEntitySuccessAction
  | EditEntityFailureAction
