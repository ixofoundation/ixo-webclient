import { createSelector } from 'reselect'
import { RootState } from '../../../common/redux/types'
import { CreateEntityState } from './types'
import { PageContent } from 'common/api/blocksync-api/types/page-content'
import { Attestation } from 'common/api/blocksync-api/types/attestation'
import * as pageContentSelectors from 'modules/EntityModules/CreateEntityPageContent/CreateEntityPageContent.selectors'
import * as attestationSelectors from 'modules/EntityModules/CreateEntityAttestation/CreateEntityAttestation.selectors'
import * as settingsSelectors from 'modules/EntityModules/CreateEntitySettings/CreateEntitySettings.selectors'

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
      body: bodyContentSections.map((bodySection) => ({
        title: bodySection.title,
        content: bodySection.content,
        image: bodySection.fileSrc,
      })),
      images: imageContentSections.map((imageSection) => ({
        title: imageSection.title,
        content: imageSection.content,
        image: imageSection.fileSrc,
        imageDescription: imageSection.imageDescription,
      })),
      profiles: profileContentSections.map((profileSection) => ({
        image: profileSection.fileSrc,
        name: profileSection.name,
        position: profileSection.position,
        linkedInUrl: profileSection.linkedInUrl,
        twitterUrl: profileSection.twitterUrl,
      })),
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
      embedded: embeddedContentSections.map((embeddedSection) => ({
        title: embeddedSection.title,
        urls: embeddedSection.urls,
      })),
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
      forms: questions.map((question) => ({
        schema: {
          title: question.title,
          description: question.description,
          type: 'object',
          required: question.required ? [question.id] : [],
          properties: {
            [question.id]: {
              type: question.type,
              title: question.label,
              enum: question.values,
              default: question.initialValue,
              items: {
                type: 'string',
                enum: question.itemValues,
                enumNames: question.itemLabels,
              },
              uniqueItems: true,
              minItems: question.minItems,
              maxItems: question.maxItems,
            },
          },
        },
        uiSchema: {
          [question.id]: {
            'ui:widget': question.control,
            'ui:placeholder': question.placeholder,
            'ui:images': question.itemImages,
            'ui:options': {
              inline: question.inline,
            },
          },
        },
      })),
    }
  },
)

export const selectEntityPayload = (pageContentId: string) =>
  createSelector(
    selectEntityType,
    pageContentSelectors.selectHeaderContent,
    settingsSelectors.selectStatus,
    settingsSelectors.selectVersion,
    settingsSelectors.selectPrivacy,
    settingsSelectors.selectTermsOfUse,
    settingsSelectors.selectRequiredCredentials,
    settingsSelectors.selectCreator,
    settingsSelectors.selectOwner,
    settingsSelectors.selectFilters,
    settingsSelectors.selectDisplayCredentials,
    (
      entityType,
      header,
      status,
      version,
      privacy,
      terms,
      requiredCredentials,
      creator,
      owner,
      filters,
      displayCredentials,
    ) => {
      return {
        ['@context']: 'https://schema.ixo.foundation/entity:2383r9riuew',
        ['@type']: entityType,
        versionNumber: process.env.REACT_APP_ENTITY_VERSION, // to check
        name: header.title,
        description: header.shortDescription,
        image: header.fileSrc,
        imageDescription: header.imageDescription,
        location: header.location,
        sdgs: header.sdgs,
        startDate: status.startDate,
        endDate: status.endDate,
        status: status.status,
        stage: status.startDate,
        relayerNode: process.env.REACT_APP_RELAYER_NODE,
        version: {
          // to check
          versionNumber: version.versionNumber,
          effectiveDate: version.effectiveDate,
          notes: version.notes,
        },
        terms: {
          // to check
          type: terms.type,
          paymentTemplateId: terms.paymentTemplateId,
        },
        privacy: {
          pageView: privacy.pageView,
          entityView: privacy.entityView,
          credentials: requiredCredentials.map((credential) => ({
            credential: credential.credential,
            issuer: credential.issuer,
          })),
        },
        page: {
          cid: pageContentId,
          version: process.env.REACT_APP_ENTITY_PAGE_VERSION,
        },
        creator: {
          id: creator.creatorId,
          displayName: creator.displayName,
          logo: creator.fileSrc,
          location: creator.location,
          email: creator.email,
          website: creator.website,
          mission: creator.mission,
          credentialId: creator.credential,
        },
        owner: {
          id: owner.ownerId,
          displayName: owner.displayName,
          logo: owner.fileSrc,
          location: owner.location,
          email: owner.email,
          website: owner.website,
          mission: owner.mission,
        },
        ddoTags: Object.keys(filters).map((category) => ({
          category,
          tags: Object.values(filters[category]),
        })),
        displayCredentials: {
          ['@context']: 'https://www.w3.org/2018/credentials/v1',
          items: displayCredentials.map((credential) => ({
            credential: credential.credential,
            badge: credential.badge,
          })),
        },
      }
    },
  )
