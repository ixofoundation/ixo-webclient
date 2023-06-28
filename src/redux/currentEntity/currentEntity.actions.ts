import { TEntityModel } from 'api/blocksync/types/entities'
import { CurrentEntityActions, UpdateEntityAction, UpdateEntityResourceAction } from './currentEntity.types'

export const updateEntityAction = (data: TEntityModel): UpdateEntityAction => ({
  type: CurrentEntityActions.UpdateEntity,
  payload: data,
})

export const updateEntityResourceAction = ({
  key,
  data,
  merge,
}: {
  key: string
  data: any
  merge: boolean
}): UpdateEntityResourceAction => ({
  type: CurrentEntityActions.UpdateEntityResource,
  payload: { key, data, merge },
})
