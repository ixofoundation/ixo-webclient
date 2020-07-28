import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { CreateEntitySettingsState } from './types'

export const selectSettings = (state: RootState): CreateEntitySettingsState =>
  state.createEntitySettings

export const selectOwner = createSelector(
  selectSettings,
  settings => settings.owner,
)

export const selectCreator = createSelector(
  selectSettings,
  settings => settings.creator,
)

export const selectStatus = createSelector(
  selectSettings,
  settings => settings.status,
)

export const selectPrivacy = createSelector(
  selectSettings,
  settings => settings.privacy,
)

export const selectRequiredCredentials = createSelector(
  selectSettings,
  settings => Object.values(settings.requiredCredentials),
)

export const selectFilters = createSelector(selectSettings, settings =>
  Object.values(settings.filters),
)

export const selectDisplayCredentials = createSelector(
  selectSettings,
  settings => Object.values(settings.displayCredentials),
)
