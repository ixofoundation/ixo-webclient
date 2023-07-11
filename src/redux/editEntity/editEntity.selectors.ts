import { TEntityModel } from 'api/blocksync/types/entities'
import { RootState } from 'redux/store'

export const selectEditEntity = (state: RootState): Partial<TEntityModel> => state.editEntity
