import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { CurrentEntity } from './currentEntity.types'

export const selectCurrentEntity = (state: RootState): CurrentEntity => state.currentEntity

export const selectEntityType = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.type
})

export const selectEntityLinkedResource = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.linkedResource
})

export const selectEntityLinkedEntity = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.linkedEntity
})

export const selectEntityProfile = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.profile
})

export const selectEntityCreator = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.creator
})

export const selectEntityAdministrator = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.administrator
})

export const selectEntityPage = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.page
})

export const selectEntityTags = createSelector(selectCurrentEntity, (entity: CurrentEntity) => {
  return entity.tags
})
