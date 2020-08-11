import {
  GoToStepAction,
  CreateEntityActions,
  Step,
  SetEntityTypeAction,
} from './types'
import { EntityType } from 'modules/Entities/types'

export const goToStep = (step: Step): GoToStepAction => ({
  type: CreateEntityActions.GoToStep,
  payload: {
    step,
  },
})

export const setEntityType = (entityType: EntityType): SetEntityTypeAction => ({
  type: CreateEntityActions.SetEntityType,
  payload: {
    entityType,
  },
})
