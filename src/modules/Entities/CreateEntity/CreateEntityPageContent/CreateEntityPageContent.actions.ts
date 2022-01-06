import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import {
  CreateEntityPageContentActions,
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
  AddLinkedResourcesSectionAction,
  UpdateLinkedResourcesAction,
  RemoveLinkedResourcesSectionAction,
} from './types'
import { FormData } from 'common/components/JsonForm/types'
import { PDS_URL } from '../../types'
import { RootState } from 'common/redux/types'
import { reorderObjectElement } from 'common/redux/utils'

export const updateHeaderContent =
  (formData: FormData) =>
  (
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
        type: CreateEntityPageContentActions.UploadHeaderContentImage,
        payload: blocksyncApi.project
          .createPublic(headerFileSrc, PDS_URL)
          .then((response: any) => ({
            headerFileSrc: `${PDS_URL}public/${response.result}`,
          })),
      })
    }

    if (logoFileSrc && logoFileSrc.startsWith('data:')) {
      return dispatch({
        type: CreateEntityPageContentActions.UploadHeaderContentLogo,
        payload: blocksyncApi.project
          .createPublic(logoFileSrc, PDS_URL)
          .then((response: any) => ({
            logoFileSrc: `${PDS_URL}public/${response.result}`,
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
        brand,
        location,
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

export const updateBodyContent =
  (id: string, formData: FormData) =>
  (
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

export const updateImageContent =
  (id: string, formData: FormData) =>
  (
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

export const updateProfileContent =
  (id: string, formData: FormData) =>
  (
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

export const addLinkedResourcesSection =
  (): AddLinkedResourcesSectionAction => ({
    type: CreateEntityPageContentActions.AddLinkedResourcesSection,
    payload: {
      id: uuidv4(),
    },
  })

export const removeLinkedResourcesSection = (
  id: string,
): RemoveLinkedResourcesSectionAction => ({
  type: CreateEntityPageContentActions.RemoveLinkedResourcesSection,
  payload: {
    id,
  },
})

export const updateLinkedResources = (
  id: string,
  formData: FormData,
): UpdateLinkedResourcesAction => {
  const {
    type,
    path,
    resourceFormat,
    displayName,
    displayDescription,
    endpoint,
    proof,
    encrypted,
  } = formData

  return {
    type: CreateEntityPageContentActions.UpdateLinkedResources,
    payload: {
      id,
      type,
      path,
      resourceFormat,
      displayName,
      displayDescription,
      endpoint,
      proof,
      encrypted,
    },
  }
}

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntityPageContentActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (
  identifier: string,
  errors: string[],
): ValidationErrorAction => ({
  type: CreateEntityPageContentActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityPageContent = (payload: any) => {
  return {
    type: CreateEntityPageContentActions.ImportEntityPageContent,
    payload,
  }
}

export const orderEntityPageContent =
  (srcId: string, dstId: string) =>
  (
    dispatch: Dispatch,
    getState: () => RootState,
  ): OrderEntityPageContentAction => {
    const { createEntityPageContent } = getState()

    return dispatch({
      type: CreateEntityPageContentActions.OrderEntityPageContent,
      payload: reorderObjectElement(srcId, dstId, {
        ...createEntityPageContent,
      }),
    })
  }
