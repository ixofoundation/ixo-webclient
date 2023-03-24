import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { CurrentDao } from './currentDao.types'

export const selectCurrentDao = (state: RootState): CurrentDao => state.currentDao

export const selectDaoGroups = createSelector(selectCurrentDao, (currentDao: CurrentDao) => {
  return currentDao
})

export const selectDaoGroupByAddress = (coreAddress: string) =>
  createSelector(selectCurrentDao, (currentDao: CurrentDao) => {
    return currentDao[coreAddress]
  })
