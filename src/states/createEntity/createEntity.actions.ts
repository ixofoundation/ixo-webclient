import {
  ECreateEntityActions,
  GotoStepAction,
  UpdateEntityTypeAction,
} from './createEntity.types'

export const updateEntityTypeAction = (
  entityType: string,
): UpdateEntityTypeAction => ({
  type: ECreateEntityActions.UpdateEntityType,
  payload: entityType,
})

export const gotoStepAction = (no: number): GotoStepAction => ({
  type: ECreateEntityActions.GotoStep,
  payload: no,
})
