import { Dispatch } from 'redux'
import { GoToStepAction, CreateEntityActions, NewEntityAction } from './types'
import { EntityType } from 'modules/EntityModules/Entities/types'
import { RootState } from 'common/redux/types'

export const goToStep = (step: number): GoToStepAction => ({
  type: CreateEntityActions.GoToStep,
  payload: {
    step,
  },
})

export const newEntity = (entityType: EntityType) => (
  dispatch: Dispatch,
  getState: () => RootState,
): NewEntityAction => {
  const currentEntityType = getState().createEntity.entityType

  if (currentEntityType === entityType) {
    return null
  }

  return dispatch({
    type: CreateEntityActions.NewEntity,
    payload: {
      entityType,
    },
  })
}
