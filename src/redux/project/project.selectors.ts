import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { ProjectType } from './project.types'
export const selectProject = (state: RootState): ProjectType => state.projectState

export const selectAccounts = createSelector(
  selectProject,
  (projectState: ProjectType) => projectState.accountsInfo.accounts,
)

export const selectAccountLoadingState = createSelector(
  selectProject,
  (projectState: ProjectType) => projectState.accountsInfo.loading,
)

export const selectProjectAddress = createSelector(
  selectProject,
  (projectState: ProjectType) => projectState.accountsInfo.address,
)
