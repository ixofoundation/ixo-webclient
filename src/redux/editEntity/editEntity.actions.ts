import { TEntityModel } from 'types/entities'
import { EditEntityActions, SetEditedFieldAction } from './editEntity.types'

export const setEditedFieldAction = ({
  key,
  data,
  merge,
}: {
  key: string
  data: any
  merge: boolean
}): SetEditedFieldAction => ({
  type: EditEntityActions.SetEditedField,
  payload: { key, data, merge },
})

export const setEditEntityAction = (editEntity: TEntityModel) => ({
  type: EditEntityActions.SetEditEntity,
  payload: editEntity,
})
