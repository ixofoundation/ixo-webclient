import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import {
  CreateEntityPageContentActions,
  AddBodySectionAction,
  UpdateImageContentAction,
  AddImageSectionAction,
  UploadImageContentImageAction,
  AddVideoSectionAction,
  AddProfileSectionAction,
  UpdateSocialContentAction,
  AddEmbeddedSectionAction,
  UpdateEmbeddedContentAction,
  RemoveBodySectionAction,
  RemoveImageSectionAction,
  RemoveVideoSectionAction,
  RemoveProfileSectionAction,
  RemoveEmbeddedSectionAction,
  UpdateHeaderContentAction,
  UploadHeaderImageAction,
  UpdateBodyContentAction,
  UploadBodyContentImageAction,
  UpdateProfileContentAction,
  UploadProfileContentImageAction,
} from './types'
import { FormData } from 'src/common/components/JsonForm/types'

const PDS_URL = process.env.REACT_APP_PDS_URL

export const updateHeaderContent = (formData: FormData) => (
  dispatch: Dispatch,
): UpdateHeaderContentAction | UploadHeaderImageAction => {
  const {
    title,
    shortDescription,
    imageDescription,
    sdgs,
    company,
    country,
    fileSrc,
  } = formData

  if (fileSrc && fileSrc.startsWith('data:')) {
    return dispatch({
      type: CreateEntityPageContentActions.UploadHeaderContentImage,
      payload: blocksyncApi.project
        .createPublic(fileSrc, PDS_URL)
        .then((response: any) => ({
          fileSrc: `${PDS_URL}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: CreateEntityPageContentActions.UpdateHeaderContent,
    payload: {
      title,
      shortDescription,
      imageDescription,
      sdgs: sdgs.split('|'),
      company,
      country,
    },
  })
}

export const addBodySection = (): AddBodySectionAction => ({
  type: CreateEntityPageContentActions.AddBodySection,
  payload: {
    id: uuidv4(),
  },
})

export const removeBodySection = (id: string): RemoveBodySectionAction => ({
  type: CreateEntityPageContentActions.RemoveBodySection,
  payload: {
    id,
  },
})

export const updateBodyContent = (id: string, formData: FormData) => (
  dispatch: Dispatch,
): UpdateBodyContentAction | UploadBodyContentImageAction => {
  const { title, content, fileSrc } = formData

  if (fileSrc && fileSrc.startsWith('data:')) {
    return dispatch({
      type: CreateEntityPageContentActions.UploadBodyContentImage,
      meta: { id },
      payload: blocksyncApi.project
        .createPublic(fileSrc, PDS_URL)
        .then((response: any) => ({
          id,
          fileSrc: `${PDS_URL}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: CreateEntityPageContentActions.UpdateBodyContent,
    payload: {
      id,
      title,
      content,
    },
  })
}

export const addImageSection = (): AddImageSectionAction => ({
  type: CreateEntityPageContentActions.AddImageSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeImageSection = (id: string): RemoveImageSectionAction => ({
  type: CreateEntityPageContentActions.RemoveImageSection,
  payload: {
    id,
  },
})

export const updateImageContent = (id: string, formData: FormData) => (
  dispatch: Dispatch,
): UpdateImageContentAction | UploadImageContentImageAction => {
  const { title, content, imageDescription, fileSrc } = formData

  if (fileSrc && fileSrc.startsWith('data:')) {
    return dispatch({
      type: CreateEntityPageContentActions.UploadImageContentImage,
      meta: { id },
      payload: blocksyncApi.project
        .createPublic(fileSrc, PDS_URL)
        .then((response: any) => ({
          id,
          fileSrc: `${PDS_URL}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: CreateEntityPageContentActions.UpdateImageContent,
    payload: {
      id,
      title,
      content,
      imageDescription,
    },
  })
}

export const addVideoSection = (): AddVideoSectionAction => ({
  type: CreateEntityPageContentActions.AddVideoSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeVideoSection = (id: string): RemoveVideoSectionAction => ({
  type: CreateEntityPageContentActions.RemoveVideoSection,
  payload: {
    id,
  },
})

export const addProfileSection = (): AddProfileSectionAction => ({
  type: CreateEntityPageContentActions.AddProfileSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeProfileSection = (
  id: string,
): RemoveProfileSectionAction => ({
  type: CreateEntityPageContentActions.RemoveProfileSection,
  payload: {
    id,
  },
})

export const updateProfileContent = (id: string, formData: FormData) => (
  dispatch: Dispatch,
): UpdateProfileContentAction | UploadProfileContentImageAction => {
  const { name, position, linkedInUrl, twitterUrl, fileSrc } = formData

  if (fileSrc && fileSrc.startsWith('data:')) {
    return dispatch({
      type: CreateEntityPageContentActions.UploadProfileContentImage,
      meta: { id },
      payload: blocksyncApi.project
        .createPublic(fileSrc, PDS_URL)
        .then((response: any) => ({
          id,
          fileSrc: `${PDS_URL}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: CreateEntityPageContentActions.UpdateProfileContent,
    payload: {
      id,
      name,
      position,
      linkedInUrl,
      twitterUrl,
    },
  })
}

export const updateSocialContent = (
  formData: FormData,
): UpdateSocialContentAction => {
  const {
    linkedInUrl,
    facebookUrl,
    twitterUrl,
    discourseUrl,
    instagramUrl,
    telegramUrl,
    githubUrl,
    otherUrl,
  } = formData

  return {
    type: CreateEntityPageContentActions.UpdateSocialContent,
    payload: {
      linkedInUrl,
      facebookUrl,
      twitterUrl,
      discourseUrl,
      instagramUrl,
      telegramUrl,
      githubUrl,
      otherUrl,
    },
  }
}

export const addEmbeddedSection = (): AddEmbeddedSectionAction => ({
  type: CreateEntityPageContentActions.AddEmbeddedSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeEmbeddedSection = (
  id: string,
): RemoveEmbeddedSectionAction => ({
  type: CreateEntityPageContentActions.RemoveEmbeddedSection,
  payload: {
    id,
  },
})

export const updateEmbeddedContent = (
  id: string,
  formData: FormData,
): UpdateEmbeddedContentAction => {
  const { title, urls } = formData

  return {
    type: CreateEntityPageContentActions.UpdateEmbeddedContent,
    payload: {
      id,
      title,
      urls: urls.split('|'),
    },
  }
}

// TODO when we have video processing
/* export const updateVideoContent = (
  id: string,
  formData: FormData,
): UpdateVideoContentAction => {
  const { title, content } = formData

  return {
    type: CreateEntityPageContentActions.UpdateVideoContent,
    payload: {
      id,
      title,
      content,
    },
  }
}

export const uploadVideoContentVideo = (
  id: string,
  base64VideoData: string,
) => (dispatch: Dispatch): UploadVideoContentVideoAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadVideoContentVideo,
    meta: { id },
    payload: blocksyncApi.project
      .createPublic(base64VideoData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
} */
