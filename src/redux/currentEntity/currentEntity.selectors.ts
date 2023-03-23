import { createSelector } from '@reduxjs/toolkit'
import { TEntityModel } from 'api/blocksync/types/entities'
import { RootState } from 'redux/store'

export const selectCurrentEntity = (state: RootState): TEntityModel => state.currentEntity

export const selectEntityType = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.type
})

export const selectEntityMetadata = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.metadata
})

export const selectEntityLinkedResource = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.linkedResource.concat(Object.values(entity))
})

export const selectEntityLinkedEntity = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.linkedEntity
})

export const selectEntityProfile = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.profile
})

export const selectEntityCreator = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.creator
})

export const selectEntityAdministrator = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.administrator
})

export const selectEntityPage = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.page
})

export const selectEntityTags = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.tags
})
