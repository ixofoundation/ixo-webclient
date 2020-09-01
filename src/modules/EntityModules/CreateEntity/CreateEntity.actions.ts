import { Dispatch } from 'redux'
import {
  GoToStepAction,
  CreateEntityActions,
  NewEntityAction,
  CreateEntityAction,
} from './types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { EntityType } from 'modules/EntityModules/Entities/types'
import { RootState } from 'common/redux/types'
import { PDS_URL } from 'modules/EntityModules/CreateEntity/types'
import { errorToast, successToast } from 'common/utils/Toast'
import * as pageContentUtils from './utils/PageContent.utils'

export const goToStep = (step: number): GoToStepAction => ({
  type: CreateEntityActions.GoToStep,
  payload: {
    step,
  },
})

export const newEntity = (entityType: EntityType) => (
  dispatch: Dispatch,
  getState: () => RootState,
): NewEntityAction => {
  const currentEntityType = getState().createEntity.entityType

  if (currentEntityType === entityType) {
    return null
  }

  return dispatch({
    type: CreateEntityActions.NewEntity,
    payload: {
      entityType,
    },
  })
}

export const createEntity = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): CreateEntityAction => {
  const state = getState()

  const uploadPageContent = blocksyncApi.project.createPublic(
    pageContentUtils.generatePageContentPayload(state),
    PDS_URL,
  )

  dispatch({
    type: CreateEntityActions.CreateEntity,
    payload: Promise.all([uploadPageContent])
      .then((responses: any[]) => {
        const pageContentId = responses[0].result

        keysafe.requestSigning(
          projectObj,
          (error: any, signature: any) => {
            blocksyncApi.project
              .createProject(JSON.parse(projectObj), signature, PDS_URL)
              .then((res: any) => {
                if (res.error) {
                  errorToast(res.error.message)
                } else {
                  successToast('Entity created successfully')
                }
              })
              .catch((error) => {
                errorToast(`Error: ${error.message}`)
              })
          },
          'base64',
        )
      })
      .catch(() => {
        errorToast('Entity creation failed. Please try again.')
      }),
  })

  return null
}
