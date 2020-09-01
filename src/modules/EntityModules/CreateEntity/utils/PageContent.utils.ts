import { RootState } from 'common/redux/types'
import * as pageContentSelectors from 'modules/EntityModules/CreateEntityPageContent/CreateEntityPageContent.selectors'
import {
  Header,
  BodySection,
  Image,
  Profile,
  Social,
  EmbeddedSchema,
  PageContent,
} from '../../../../common/api/blocksync-api/types/page-content'

export const generateHeader = (state: RootState): Header => {
  const {
    fileSrc: image,
    title,
    shortDescription,
    organisation,
    location,
    sdgs,
    imageDescription,
  } = pageContentSelectors.selectHeaderContent(state)

  return {
    image,
    title,
    shortDescription,
    organisation,
    location,
    sdgs,
    imageDescription,
  }
}

export const generateBody = (state: RootState): BodySection[] => {
  return pageContentSelectors
    .selectBodyContentSections(state)
    .map((bodySection) => {
      const { fileSrc: image, title, content } = bodySection

      return {
        title,
        content,
        image,
      }
    })
}

export const generateImages = (state: RootState): Image[] => {
  return pageContentSelectors
    .selectImageContentSections(state)
    .map((imageSection) => {
      const { fileSrc: image, title, content, imageDescription } = imageSection

      return {
        title,
        content,
        image,
        imageDescription,
      }
    })
}

export const generateProfiles = (state: RootState): Profile[] => {
  return pageContentSelectors
    .selectProfileContentSections(state)
    .map((profileSection) => {
      const {
        fileSrc: image,
        name,
        position,
        linkedInUrl,
        twitterUrl,
      } = profileSection

      return {
        image,
        name,
        position,
        linkedInUrl,
        twitterUrl,
      }
    })
}

export const generateSocial = (state: RootState): Social => {
  const {
    linkedInUrl,
    facebookUrl,
    twitterUrl,
    discourseUrl,
    instagramUrl,
    telegramUrl,
    githubUrl,
    otherUrl,
  } = pageContentSelectors.selectSocialContent(state)

  return {
    linkedInUrl,
    facebookUrl,
    twitterUrl,
    discourseUrl,
    instagramUrl,
    telegramUrl,
    githubUrl,
    otherUrl,
  }
}

export const generateEmbedded = (state: RootState): EmbeddedSchema[] => {
  return pageContentSelectors
    .selectEmbeddedContentSections(state)
    .map((embeddedSection) => {
      const { title, urls } = embeddedSection

      return {
        title,
        urls,
      }
    })
}

export const generatePageContentPayload = (state: RootState): PageContent => {
  return {
    header: generateHeader(state),
    body: generateBody(state),
    images: generateImages(state),
    profiles: generateProfiles(state),
    social: generateSocial(state),
    embedded: generateEmbedded(state),
  }
}
