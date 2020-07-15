import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import {
  CreateEntityPageContentActions,
  UpdateHeaderAction,
  UploadHeaderImageAction,
  AddBodySectionAction,
  UpdateBodyContentAction,
  UploadBodyImageAction,
} from './types'

const PDS_URL = process.env.REACT_APP_PDS_URL

export const updateHeaderContent = (
  title: string,
  shortDescription: string,
  imageDescription: string,
  sdgs: string[],
  country: string,
): UpdateHeaderAction => ({
  type: CreateEntityPageContentActions.UpdateHeader,
  payload: {
    title,
    shortDescription,
    imageDescription,
    sdgs,
    country,
  },
})

export const uploadHeaderImage = (base64ImageData: string) => (
  dispatch: Dispatch,
): UploadHeaderImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadHeaderImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => response.result),
  })
}

export const addBodySection = (): AddBodySectionAction => ({
  type: CreateEntityPageContentActions.AddBodySection,
  payload: {
    id: uuidv4(),
  },
})

export const updateBodyContent = (
  id: string,
  title: string,
  content: string,
): UpdateBodyContentAction => ({
  type: CreateEntityPageContentActions.UpdateBody,
  payload: {
    id,
    title,
    content,
  },
})

export const uploadBodyImage = (id: string, base64ImageData: string) => (
  dispatch: Dispatch,
): UploadBodyImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadBodyImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}
