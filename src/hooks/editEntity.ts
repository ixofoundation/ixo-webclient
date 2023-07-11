import { setEditedFieldAction } from 'redux/editEntity/editEntity.actions'
import { selectEditEntity } from 'redux/editEntity/editEntity.selectors'
import { EditEntityState } from 'redux/editEntity/editEntity.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

export default function useEditEntity(): {
  editEntity: EditEntityState
  setEditedField: (key: string, value: any) => void
} {
  const dispatch = useAppDispatch()

  const editEntity: EditEntityState = useAppSelector(selectEditEntity)

  const setEditedField = (key: string, value: any) => {
    dispatch(setEditedFieldAction({ key, data: value, merge: typeof value === 'object' }))
  }

  return {
    editEntity,
    setEditedField,
  }
}
