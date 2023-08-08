import { RootState } from 'redux/store'
import { TEntityModel } from 'types/entities'

export const selectEditEntity = (state: RootState): TEntityModel => state.editEntity
