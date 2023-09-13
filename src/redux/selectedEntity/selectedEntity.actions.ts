import { RootState } from 'redux/store'
import { Dispatch } from 'redux'
import { ProjectStatus } from '../../types/entities'
import {
  ClearEntityAction,
  SelectedEntityActions,
  UpdateEntityBondDetailAction,
  UpdateEntityAddressAction,
  UpdateEntityTypeAction,
  UpdateProjectStatusAction,
} from './selectedEntity.types'
import { Bond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'

export const clearEntity = (): ClearEntityAction => ({
  type: SelectedEntityActions.ClearEntity,
})

/**
 * @deprecated
 * @param projectDid
 * @param status
 * @returns
 */
export const updateProjectStatus =
  (projectDid: string, status: ProjectStatus) =>
  (dispatch: Dispatch, getState: () => RootState): UpdateProjectStatusAction => {
    // const statusData = {
    //   projectDid: projectDid,
    //   status: status,
    // }

    // const state = getState()
    // const cellNodeEndpoint = selectCellNodeEndpoint(state)

    // keysafe.requestSigning(
    //   JSON.stringify(statusData),
    //   (error: any, signature: any) => {
    //     if (!error) {
    //       blocksyncApi.project.updateProjectStatus(statusData, signature, cellNodeEndpoint!).then(() => {
    //         return dispatch({
    //           type: SelectedEntityActions.UpdateProjectStatus,
    //         })
    //       })
    //     }
    //   },
    //   'base64',
    // )

    return null!
  }

export const updateEntityAddressAction = (address: string): UpdateEntityAddressAction => ({
  type: SelectedEntityActions.UpdateEntityAddress,
  payload: address,
})

export const updateEntityBondDetailAction = (bond: Bond): UpdateEntityBondDetailAction => ({
  type: SelectedEntityActions.UpdateEntityBondDetail,
  payload: bond,
})

export const updateEntityTypeAction = (type: string): UpdateEntityTypeAction => ({
  type: SelectedEntityActions.UpdateEntityType,
  payload: type,
})
