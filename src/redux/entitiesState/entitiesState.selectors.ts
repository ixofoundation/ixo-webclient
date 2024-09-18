import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'

export const selectEntitiesState = (state: RootState) => state.entitiesState

export const getEntityFromStoreById = (id: string) =>
  createSelector(selectEntitiesState, (entitiesState) => {
    return entitiesState.entitiesStore.find((entity) => entity.id === id)
  })
