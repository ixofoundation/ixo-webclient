import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import {
  CreateEntityPageContentActions,
  UpdateHeaderContentAction,
  UploadHeaderImageAction,
  AddBodySectionAction,
  UpdateBodyContentAction,
  UploadBodyContentImageAction,
  UpdateImageContentAction,
  AddImageSectionAction,
  UploadImageContentImageAction,
  AddVideoSectionAction,
  UpdateVideoContentAction,
  UploadVideoContentVideoAction,
  AddProfileSectionAction,
  UpdateProfileContentAction,
  UploadProfileContentImageAction,
  UpdateSocialContentAction,
} from './types'

const PDS_URL = process.env.REACT_APP_PDS_URL

export const updateHeaderContent = (
  title: string,
  shortDescription: string,
  imageDescription: string,
  sdgs: string[],
  country: string,
): UpdateHeaderContentAction => ({
  type: CreateEntityPageContentActions.UpdateHeaderContent,
  payload: {
    title,
    shortDescription,
    imageDescription,
    sdgs,
    country,
  },
})

export const uploadHeaderContentImage = (base64ImageData: string) => (
  dispatch: Dispatch,
): UploadHeaderImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadHeaderContentImage,
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
  type: CreateEntityPageContentActions.UpdateBodyContent,
  payload: {
    id,
    title,
    content,
  },
})

export const uploadBodyContentImage = (id: string, base64ImageData: string) => (
  dispatch: Dispatch,
): UploadBodyContentImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadBodyContentImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const addImageSection = (): AddImageSectionAction => ({
  type: CreateEntityPageContentActions.AddImageSection,
  payload: {
    id: uuidv4(),
  },
})

export const updateImageContent = (
  id: string,
  title: string,
  content: string,
  imageDescription: string,
): UpdateImageContentAction => ({
  type: CreateEntityPageContentActions.UpdateImageContent,
  payload: {
    id,
    title,
    content,
    imageDescription,
  },
})

export const uploadImageContentImage = (
  id: string,
  base64ImageData: string,
) => (dispatch: Dispatch): UploadImageContentImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadImageContentImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const addVideoSection = (): AddVideoSectionAction => ({
  type: CreateEntityPageContentActions.AddVideoSection,
  payload: {
    id: uuidv4(),
  },
})

export const updateVideoContent = (
  id: string,
  title: string,
  content: string,
): UpdateVideoContentAction => ({
  type: CreateEntityPageContentActions.UpdateVideoContent,
  payload: {
    id,
    title,
    content,
  },
})

export const uploadVideoContentVideo = (
  id: string,
  base64VideoData: string,
) => (dispatch: Dispatch): UploadVideoContentVideoAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadVideoContentVideo,
    payload: blocksyncApi.project
      .createPublic(base64VideoData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const addProfileSection = (): AddProfileSectionAction => ({
  type: CreateEntityPageContentActions.AddProfileSection,
  payload: {
    id: uuidv4(),
  },
})

export const updateProfileContent = (
  id: string,
  name: string,
  position: string,
  linkedInUrl: string,
  twitterUrl: string,
): UpdateProfileContentAction => ({
  type: CreateEntityPageContentActions.UpdateProfileContent,
  payload: {
    id,
    name,
    position,
    linkedInUrl,
    twitterUrl,
  },
})

export const uploadProfileContentImage = (
  id: string,
  base64ImageData: string,
) => (dispatch: Dispatch): UploadProfileContentImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadProfileContentImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const updateSocialContent = (
  linkedInUrl: string,
  facebookInUrl: string,
  twitterInUrl: string,
  discourseInUrl: string,
  instagramUrl: string,
  telegramUrl: string,
  githubUrl: string,
  otherUrl: string,
): UpdateSocialContentAction => ({
  type: CreateEntityPageContentActions.UpdateSocialContent,
  payload: {
    linkedInUrl,
    facebookInUrl,
    twitterInUrl,
    discourseInUrl,
    instagramUrl,
    telegramUrl,
    githubUrl,
    otherUrl,
  },
})
