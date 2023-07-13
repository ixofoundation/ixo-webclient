import { TEntityModel } from 'api/blocksync/types/entities'
import { RootState } from 'redux/store'

export const selectEditEntity = (state: RootState): TEntityModel => state.editEntity
