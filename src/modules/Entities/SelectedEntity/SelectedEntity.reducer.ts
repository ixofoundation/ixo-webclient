import { ExplorerEntity } from '../EntitiesExplorer/types'
import { SelectedEntityActions, SelectedEntityActionTypes } from './types'

export const initialState: ExplorerEntity = null

export const reducer = (
  state = initialState,
  action: SelectedEntityActionTypes,
): any => {
  switch (action.type) {
    case SelectedEntityActions.GetEntitySuccess:
      return action.payload
    case SelectedEntityActions.ClearEntity:
      return null
  }

  return state
}
