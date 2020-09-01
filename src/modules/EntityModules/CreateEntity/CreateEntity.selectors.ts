import { createSelector } from 'reselect'
import { RootState } from '../../../common/redux/types'
import { CreateEntityState } from './types'
import { PageContent } from 'common/api/blocksync-api/types/page-content'
import * as pageContentSelectors from 'modules/EntityModules/CreateEntityPageContent/CreateEntityPageContent.selectors'
import * as attestationSelectors from 'modules/EntityModules/CreateEntityAttestation/CreateEntityAttestation.selectors'
import { Attestation } from 'common/api/blocksync-api/types/attestation'

export const selectCreateEntity = (state: RootState): CreateEntityState =>
  state.createEntity

export const selectStep = createSelector(
  selectCreateEntity,
  (createEntity: CreateEntityState) => createEntity.step,
)

export const selectEntityType = createSelector(
  selectCreateEntity,
  (createEntity: CreateEntityState) => createEntity.entityType,
)

export const selectPageContentApiPayload = createSelector(
  pageContentSelectors.selectHeaderContent,
  pageContentSelectors.selectBodyContentSections,
  pageContentSelectors.selectImageContentSections,
  pageContentSelectors.selectProfileContentSections,
  pageContentSelectors.selectSocialContent,
  pageContentSelectors.selectEmbeddedContentSections,
  (
    headerContent,
    bodyContentSections,
    imageContentSections,
    profileContentSections,
    socialContent,
    embeddedContentSections,
  ): PageContent => {
    return {
      header: {
        image: headerContent.fileSrc,
        title: headerContent.title,
        shortDescription: headerContent.shortDescription,
        organisation: headerContent.organisation,
        location: headerContent.location,
        sdgs: headerContent.sdgs,
        imageDescription: headerContent.imageDescription,
      },
      body: bodyContentSections.map((bodySection) => {
        const { fileSrc: image, title, content } = bodySection

        return {
          title,
          content,
          image,
        }
      }),
      images: imageContentSections.map((imageSection) => {
        const {
          fileSrc: image,
          title,
          content,
          imageDescription,
        } = imageSection

        return {
          title,
          content,
          image,
          imageDescription,
        }
      }),
      profiles: profileContentSections.map((profileSection) => {
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
      }),
      social: {
        linkedInUrl: socialContent.linkedInUrl,
        facebookUrl: socialContent.facebookUrl,
        twitterUrl: socialContent.twitterUrl,
        discourseUrl: socialContent.discourseUrl,
        instagramUrl: socialContent.instagramUrl,
        telegramUrl: socialContent.telegramUrl,
        githubUrl: socialContent.githubUrl,
        otherUrl: socialContent.otherUrl,
      },
      embedded: embeddedContentSections.map((embeddedSection) => {
        const { title, urls } = embeddedSection

        return {
          title,
          urls,
        }
      }),
    }
  },
)

export const selectAttestationApiPayload = createSelector(
  attestationSelectors.selectClaimInfo,
  attestationSelectors.selectQuestions,
  (claimInfoSection, questions): Attestation => {
    return {
      claimInfo: {
        title: claimInfoSection.title,
        shortDescription: claimInfoSection.shortDescription,
      },
      forms: questions.map((question) => {
        const {
          id,
          title,
          description,
          required,
          type,
          label,
          values,
          initialValue,
          itemValues,
          itemLabels,
          minItems,
          maxItems,
          control,
          placeholder,
          itemImages,
          inline,
        } = question

        return {
          schema: {
            title,
            description,
            type: 'object',
            required: required ? [id] : [],
            properties: {
              [id]: {
                type,
                title: label,
                enum: values,
                default: initialValue,
                items: {
                  type: 'string',
                  enum: itemValues,
                  enumNames: itemLabels,
                },
                uniqueItems: true,
                minItems,
                maxItems,
              },
            },
          },
          uiSchema: {
            [id]: {
              'ui:widget': control,
              'ui:placeholder': placeholder,
              'ui:images': itemImages,
              'ui:options': {
                inline,
              },
            },
          },
        }
      }),
    }
  },
)
