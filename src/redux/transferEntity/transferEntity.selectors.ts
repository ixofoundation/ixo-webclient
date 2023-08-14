import { RootState } from 'redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { TTransferEntityState } from './transferEntity.types'
import { TEntityModel } from 'types/entities'

export const selectTransferEntity = (state: RootState): TTransferEntityState => state.transferEntity

export const selectTransferEntityBreadCrumbs = createSelector(
  selectTransferEntity,
  (transferEntity: TTransferEntityState): { text: string; link?: string }[] => transferEntity.breadCrumbs ?? [],
)

export const selectTransferEntityTitle = createSelector(
  selectTransferEntity,
  (transferEntity: TTransferEntityState): string => transferEntity.title ?? '',
)

export const selectTransferEntitySubtitle = createSelector(
  selectTransferEntity,
  (transferEntity: TTransferEntityState): string => transferEntity.subtitle ?? '',
)

export const selectTransferEntitySelectedEntity = createSelector(
  selectTransferEntity,
  (transferEntity: TTransferEntityState): TEntityModel | undefined => transferEntity.selectedEntity,
)

export const selectTransferEntityRecipientDid = createSelector(
  selectTransferEntity,
  (transferEntity: TTransferEntityState): string => transferEntity.recipientDid || '',
)
