import { Dispatch } from 'redux'
import {
  GoToStepAction,
  EditEntityActions,
  NewEntityAction,
  EditEntitySuccessAction,
  EditEntityFailureAction,
} from './editEntity.types'
import { encode as base64Encode } from 'js-base64'
import blocksyncApi from 'api/blocksync/blocksync'
import keysafe from 'lib/keysafe/keysafe'
import { EntityType } from '../../types/entities'
import { RootState } from 'redux/types'
import * as editEntitySelectors from './editEntity.selectors'
import { editEntityMap } from './strategy-map'

export const goToStep = (step: number): GoToStepAction => ({
  type: EditEntityActions.GoToStep,
  payload: {
    step,
  },
})

export const newEntity =
  (entityType: EntityType, forceNew = false) =>
  (dispatch: Dispatch, getState: () => RootState): NewEntityAction => {
    const state = getState()
    const { did: entityDid } = state.selectedEntity
    const { entityType: currentEntityType, edited } = state.editEntity

    if (currentEntityType === entityType && !edited && !forceNew) {
      return null!
    }

    return dispatch({
      type: EditEntityActions.NewEntity,
      payload: {
        entityType,
        entityDid,
      },
    })
  }

export const editEntity =
  () =>
  (dispatch: Dispatch, getState: () => RootState): EditEntitySuccessAction | EditEntityFailureAction => {
    dispatch({
      type: EditEntityActions.EditEntityStart,
    })

    const state = getState()
    const entityType = state.editEntity.entityType
    const projectDid = state.selectedEntity.did
    const createdOn = new Date()
    // const createdBy = state.selectedEntity.creatorDid
    const createdBy = state.account.userInfo.didDoc.did
    const nodeDid = state.selectedEntity.nodeDid

    const cellNodeEndpoint = editEntitySelectors.selectCellNodeEndpoint(state)

    // the page content data
    // the page content data
    const pageData = `data:application/json;base64,${base64Encode(
      JSON.stringify(editEntityMap[entityType].selectPageContentApiPayload(state)),
    )}`

    const uploadPageContent = blocksyncApi.project.createPublic(pageData, cellNodeEndpoint)

    Promise.all([uploadPageContent])
      .then((responses: any[]) => {
        // the entity data with the page content resource id
        const pageContentId = responses[0].result

        const entityData = {
          projectDid,
          data: {
            createdOn,
            createdBy,
            nodeDid,
            ...editEntitySelectors.selectEntityApiPayload(entityType, pageContentId)(state),
          },
        }

        keysafe.requestSigning(
          JSON.stringify(entityData),
          (signError: any, signature: any): any => {
            if (signError) {
              return dispatch({
                type: EditEntityActions.EditEntityFailure,
                payload: {
                  error: signError,
                },
              })
            }
            blocksyncApi.project
              .updateProjectDoc(entityData, signature, cellNodeEndpoint)
              .then((res: any) => {
                if (res.error) {
                  return dispatch({
                    type: EditEntityActions.EditEntityFailure,
                    payload: {
                      error: res.error.message,
                    },
                  })
                } else {
                  return setTimeout(() => {
                    dispatch({
                      type: EditEntityActions.EditEntitySuccess,
                    })
                  }, 10000)
                }
              })
              .catch((error) => {
                return dispatch({
                  type: EditEntityActions.EditEntityFailure,
                  payload: {
                    error: error.message,
                  },
                })
              })
          },
          'base64',
        )
      })
      .catch((error) => {
        return dispatch({
          type: EditEntityActions.EditEntityFailure,
          payload: {
            error: error.message,
          },
        })
      })

    return null!
  }
