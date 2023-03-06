import { CurrentEntityActions, CurrentEntity, UpdateEntityAction } from './currentEntity.types'

export const updateEntityAction = (data: CurrentEntity): UpdateEntityAction => ({
  type: CurrentEntityActions.UpdateEntity,
  payload: data,
})
