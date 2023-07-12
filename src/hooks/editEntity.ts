import { TEntityModel } from 'api/blocksync/types/entities'
import { setEditedFieldAction, setEditEntityAction } from 'redux/editEntity/editEntity.actions'
import { selectEditEntity } from 'redux/editEntity/editEntity.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

export default function useEditEntity(): {
  editEntity: TEntityModel
  setEditedField: (key: string, value: any, merge?: boolean) => void
  setEditEntity: (editEntity: TEntityModel) => void
} {
  const dispatch = useAppDispatch()

  const editEntity: TEntityModel = useAppSelector(selectEditEntity)

  const setEditedField = (key: string, value: any, merge = false) => {
    dispatch(setEditedFieldAction({ key, data: value, merge }))
  }

  const setEditEntity = (editEntity: TEntityModel) => {
    dispatch(setEditEntityAction(editEntity))
  }

  return {
    editEntity,
    setEditedField,
    setEditEntity,
  }
}
