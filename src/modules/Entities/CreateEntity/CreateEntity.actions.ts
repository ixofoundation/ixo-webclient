import { Dispatch } from 'redux'
import { encode as base64Encode } from 'js-base64'
import {
  GoToStepAction,
  CreateEntityActions,
  NewEntityAction,
  CreateEntitySuccessAction,
  CreateEntityFailureAction,
  ClearEntityAction,
  UpdateSelectedTemplateTypeAction,
} from './types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { EntityType } from '../types'
import { RootState } from 'common/redux/types'
import * as createEntitySelectors from './CreateEntity.selectors'
import { createEntityMap } from './strategy-map'

export const goToStep = (step: number): GoToStepAction => ({
  type: CreateEntityActions.GoToStep,
  payload: {
    step,
  },
})

export const newEntity =
  (entityType: EntityType, forceNew = false) =>
  (dispatch: Dispatch, getState: () => RootState): NewEntityAction => {
    const state = getState()
    const { entityType: currentEntityType, created } = state.createEntity

    if (currentEntityType === entityType && !created && !forceNew) {
      return null!
    }

    return dispatch({
      type: CreateEntityActions.NewEntity,
      payload: {
        entityType,
      },
    })
  }

export const createEntity =
  () =>
  (dispatch: Dispatch, getState: () => RootState): CreateEntitySuccessAction | CreateEntityFailureAction => {
    dispatch({
      type: CreateEntityActions.CreateEntityStart,
    })

    const state = getState()
    const entityType = state.createEntity.entityType

    // node endpoints
    const cellNodeEndpoint = createEntitySelectors.selectCellNodeEndpoint(state)
    // the page content data
    const pageData = `data:application/json;base64,${base64Encode(
      JSON.stringify(createEntityMap[entityType].selectPageContentApiPayload(state)),
    )}`

    const uploadPageContent = blocksyncApi.project.createPublic(pageData, cellNodeEndpoint)

    uploadPageContent
      .then((response: any) => {
        // the entity data with the page content resource id
        const pageContentId = response.result

        const entityData = JSON.stringify(
          createEntitySelectors.selectEntityApiPayload(entityType, pageContentId)(state),
        )

        keysafe.requestSigning(
          entityData,
          (signError: any, signature: any): any => {
            if (signError) {
              return dispatch({
                type: CreateEntityActions.CreateEntityFailure,
                payload: {
                  error: signError,
                },
              })
            }

            blocksyncApi.project
              .createProject(JSON.parse(entityData), signature, cellNodeEndpoint)
              .then((res: any) => {
                if (res.error) {
                  return dispatch({
                    type: CreateEntityActions.CreateEntityFailure,
                    payload: {
                      error: res.error.message,
                    },
                  })
                } else {
                  return setTimeout(() => {
                    dispatch({
                      type: CreateEntityActions.CreateEntitySuccess,
                    })
                  }, 10000)
                }
              })
              .catch((error) => {
                return dispatch({
                  type: CreateEntityActions.CreateEntityFailure,
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
          type: CreateEntityActions.CreateEntityFailure,
          payload: {
            error: error.message,
          },
        })
      })

    return null!
  }

export const clearEntity =
  () =>
  (dispatch: Dispatch): ClearEntityAction => {
    return dispatch({
      type: CreateEntityActions.ClearEntity,
    })
  }
export const updateSelectedTemplateType =
  (type: string) =>
  (dispatch: Dispatch): UpdateSelectedTemplateTypeAction => {
    return dispatch({
      type: CreateEntityActions.UpdateSelectedTemplateType,
      payload: type,
    })
  }
