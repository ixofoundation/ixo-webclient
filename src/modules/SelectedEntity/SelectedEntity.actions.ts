import { Dispatch } from 'redux'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import { mapApiEntityToEntity } from '../Entities/Entities.utils'
import {
  SelectedEntityActions,
  GetEntityAction,
  ClearEntityAction,
} from './types'
import { RootState } from 'common/redux/types'

export const clearEntity = (): ClearEntityAction => ({
  type: SelectedEntityActions.ClearEntity,
})

export const getEntity = (entityDid: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetEntityAction => {
  const { selectedEntity } = getState()

  if (selectedEntity && selectedEntity.did === entityDid) {
    return null
  }

  dispatch(clearEntity())

  return dispatch({
    type: SelectedEntityActions.GetEntity,
    payload: blocksyncApi.project
      .getProjectByProjectDid(entityDid)
      .then(response => mapApiEntityToEntity(response)),
  })
}
