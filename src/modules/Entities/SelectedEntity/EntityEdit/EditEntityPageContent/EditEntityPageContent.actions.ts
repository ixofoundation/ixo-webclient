import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import {
  EditEntityPageContentActions,
  AddBodySectionAction,
  UpdateImageContentAction,
  AddImageSectionAction,
  UploadImageContentImageAction,
  AddProfileSectionAction,
  UpdateSocialContentAction,
  AddEmbeddedSectionAction,
  UpdateEmbeddedContentAction,
  RemoveBodySectionAction,
  RemoveImageSectionAction,
  RemoveProfileSectionAction,
  RemoveEmbeddedSectionAction,
  UpdateHeaderContentAction,
  UploadHeaderImageAction,
  UploadHeaderLogoAction,
  UpdateBodyContentAction,
  UploadBodyContentImageAction,
  UpdateProfileContentAction,
  UploadProfileContentImageAction,
  ValidatedAction,
  ValidationErrorAction,
  OrderEntityPageContentAction,
} from './types'
import { FormData } from 'common/components/JsonForm/types'
import { PDS_URL } from '../../../types'
import { reorderObjectElement } from 'common/redux/utils'
import { RootState } from 'common/redux/types'

export const updateHeaderContent = (formData: FormData) => (
  dispatch: Dispatch,
):
  | UpdateHeaderContentAction
  | UploadHeaderImageAction
  | UploadHeaderLogoAction => {
  const {
    title,
    shortDescription,
    imageDescription,
    sdgs,
    brand,
    location,
    headerFileSrc,
    logoFileSrc,
  } = formData

  if (headerFileSrc && headerFileSrc.startsWith('data:')) {
    return dispatch({
      type: EditEntityPageContentActions.UploadHeaderContentImage,
      payload: blocksyncApi.project
        .createPublic(headerFileSrc, PDS_URL)
        .then((response: any) => ({
          headerFileSrc: `${PDS_URL}public/${response.result}`,
        })),
    })
  }

  if (logoFileSrc && logoFileSrc.startsWith('data:')) {
    return dispatch({
      type: EditEntityPageContentActions.UploadHeaderContentLogo,
      payload: blocksyncApi.project
        .createPublic(logoFileSrc, PDS_URL)
        .then((response: any) => ({
          logoFileSrc: `${PDS_URL}public/${response.result}`,
        })),
    })
  }

  return dispatch({
    type: EditEntityPageContentActions.UpdateHeaderContent,
    payload: {
      title,
      shortDescription,
      imageDescription,
      sdgs: sdgs.split('|'),
      brand,
      location,
    },
  })
}

export const addBodySection = (): AddBodySectionAction => ({
  type: EditEntityPageContentActions.AddBodySection,
  payload: {
    id: uuidv4(),
  },
})

export const removeBodySection = (id: string): RemoveBodySectionAction => ({
  type: EditEntityPageContentActions.RemoveBodySection,
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
      type: EditEntityPageContentActions.UploadBodyContentImage,
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
    type: EditEntityPageContentActions.UpdateBodyContent,
    payload: {
      id,
      title,
      content,
    },
  })
}

export const addImageSection = (): AddImageSectionAction => ({
  type: EditEntityPageContentActions.AddImageSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeImageSection = (id: string): RemoveImageSectionAction => ({
  type: EditEntityPageContentActions.RemoveImageSection,
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
      type: EditEntityPageContentActions.UploadImageContentImage,
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
    type: EditEntityPageContentActions.UpdateImageContent,
    payload: {
      id,
      title,
      content,
      imageDescription,
    },
  })
}

export const addProfileSection = (): AddProfileSectionAction => ({
  type: EditEntityPageContentActions.AddProfileSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeProfileSection = (
  id: string,
): RemoveProfileSectionAction => ({
  type: EditEntityPageContentActions.RemoveProfileSection,
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
      type: EditEntityPageContentActions.UploadProfileContentImage,
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
    type: EditEntityPageContentActions.UpdateProfileContent,
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
    type: EditEntityPageContentActions.UpdateSocialContent,
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
  type: EditEntityPageContentActions.AddEmbeddedSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeEmbeddedSection = (
  id: string,
): RemoveEmbeddedSectionAction => ({
  type: EditEntityPageContentActions.RemoveEmbeddedSection,
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
    type: EditEntityPageContentActions.UpdateEmbeddedContent,
    payload: {
      id,
      title,
      urls: urls.split('|'),
    },
  }
}

export const validated = (identifier: string): ValidatedAction => ({
  type: EditEntityPageContentActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (
  identifier: string,
  errors: string[],
): ValidationErrorAction => ({
  type: EditEntityPageContentActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityPageContent = (payload: any) => {
  return {
    type: EditEntityPageContentActions.ImportEntityPageContent,
    payload
  }
}

export const orderEntityPageContent = (srcId: string, dstId: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): OrderEntityPageContentAction => {
  const { editEntityPageContent } = getState()

  return dispatch({
    type: EditEntityPageContentActions.OrderEntityPageContent,
    payload: reorderObjectElement(srcId, dstId, {...editEntityPageContent}),
  })  
}