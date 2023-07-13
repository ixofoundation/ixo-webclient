import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { EditEntityState } from './editEntity.types'
import * as pageContentSelectors from '../../components/Entities/SelectedEntity/EntityEdit/EditEntityPageContent/EditEntityPageContent.selectors'
import * as attestationSelectors from '../editEntityAttestation/editEntityAttestation.selectors'
import * as settingsSelectors from '../editEntitySettings/editEntitySettings.selectors'
import * as advancedSelectors from '../editEntityAdvanced/editEntityAdvanced.selectors'
import * as claimsSelectors from '../editEntityClaims/editEntityClaims.selectors'
import { ApiEntity } from 'api/blocksync/types/entities'
import { serverDateFormat } from 'utils/formatters'
import { editEntityMap } from './strategy-map'
import { EntityType, NodeType } from '../../types/entities'
// import { PageContent } from '../../SelectedEntity/types'
import { Attestation } from 'types/entityClaims'

import * as _ from 'lodash'

export const selectEditEntity = (state: RootState): EditEntityState => state.editEntityOld

export const selectStep = createSelector(selectEditEntity, (editEntity: EditEntityState) => editEntity.step)

export const selectEntityType = createSelector(selectEditEntity, (editEntity: EditEntityState) => editEntity.entityType)

export const selectEditing = createSelector(selectEditEntity, (editEntity: EditEntityState) => editEntity.editing)

export const selectEdited = createSelector(selectEditEntity, (editEntity: EditEntityState) => editEntity.edited)

export const selectError = createSelector(selectEditEntity, (editEntity: EditEntityState) => editEntity.error)

export const selectIsFinal = createSelector(
  selectEditing,
  selectEdited,
  selectError,
  (editing, edited, error) => editing || edited || error,
)

export const selectPageContentApiPayload = createSelector(
  pageContentSelectors.selectPageContent,
  pageContentSelectors.selectHeaderContent,
  pageContentSelectors.selectBodyContentSections,
  pageContentSelectors.selectImageContentSections,
  pageContentSelectors.selectProfileContentSections,
  pageContentSelectors.selectSocialContent,
  pageContentSelectors.selectEmbeddedContentSections,
  (
    pageContent,
    headerContent,
    bodyContentSections,
    imageContentSections,
    profileContentSections,
    socialContent,
    embeddedContentSections,
  ): any => {
    const response = Object.keys(pageContent).map((objKey) => {
      switch (objKey) {
        case 'header':
          return {
            prop: 'header',
            value: {
              image: headerContent.headerFileSrc,
              title: headerContent.title,
              shortDescription: headerContent.shortDescription,
              brand: headerContent.brand,
              location: headerContent.location,
              sdgs: headerContent.sdgs,
              imageDescription: headerContent.imageDescription,
              logo: headerContent.logoFileSrc,
            },
          }
        case 'body':
          return {
            prop: 'body',
            value: bodyContentSections.map((bodySection) => ({
              title: bodySection.title,
              content: bodySection.content,
              image: bodySection.fileSrc,
            })),
          }
        case 'images':
          return {
            prop: 'images',
            value: imageContentSections.map((imageSection) => ({
              title: imageSection.title,
              content: imageSection.content,
              image: imageSection.fileSrc,
              imageDescription: imageSection.imageDescription,
            })),
          }
        case 'profiles':
          return {
            prop: 'profiles',
            value: profileContentSections.map((profileSection) => ({
              image: profileSection.fileSrc,
              name: profileSection.name,
              position: profileSection.position,
              linkedInUrl: profileSection.linkedInUrl,
              twitterUrl: profileSection.twitterUrl,
            })),
          }
        case 'social':
          return {
            prop: 'social',
            value: {
              linkedInUrl: socialContent.linkedInUrl,
              facebookUrl: socialContent.facebookUrl,
              twitterUrl: socialContent.twitterUrl,
              discourseUrl: socialContent.discourseUrl,
              instagramUrl: socialContent.instagramUrl,
              telegramUrl: socialContent.telegramUrl,
              githubUrl: socialContent.githubUrl,
              otherUrl: socialContent.otherUrl,
            },
          }
        case 'embedded':
          return {
            prop: 'embedded',
            value: embeddedContentSections.map((embeddedSection) => ({
              title: embeddedSection.title,
              urls: embeddedSection.urls,
            })),
          }
        default:
          return {}
      }
    })
    return _.mapValues(_.keyBy(response, 'prop'), 'value')
  },
)

export const selectAttestationApiPayload = createSelector(
  attestationSelectors.selectClaimInfo,
  attestationSelectors.selectQuestions,
  (claimInfoSection, questions): Attestation => {
    return {
      claimInfo: {
        type: claimInfoSection.type,
        title: claimInfoSection.title,
        shortDescription: claimInfoSection.shortDescription,
      },
      forms: questions.map((question) => ({
        '@type': question.attributeType,
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

export const selectClaimsForEntityApiPayload = createSelector(claimsSelectors.selectEntityClaims, (claims) => {
  return {
    entityClaims: {
      '@context': 'https://schema.ixo.world/claims:3r08webu2eou',
      items: claims.map((claim) => {
        return {
          '@id': claim.template.templateId,
          visibility: claim.template.isPrivate ? 'Private' : 'Public',
          title: claim.template.title,
          description: claim.template.description,
          targetMin: claim.template.minTargetClaims,
          targetMax: claim.template.maxTargetClaims,
          startDate: serverDateFormat(claim.template.submissionStartDate),
          endDate: serverDateFormat(claim.template.submissionEndDate),
          goal: claim.template.goal,
          agents: claim.agentRoles.map((agent) => ({
            role: agent.role,
            autoApprove: agent.autoApprove,
            credential: agent.credential,
          })),
          claimEvaluation: claim.evaluations.map((evaluation) => ({
            '@context': evaluation.context,
            '@id': evaluation.contextLink,
            methodology: evaluation.evaluationMethodology,
            attributes: evaluation.evaluationAttributes,
          })),
          claimApproval: claim.approvalCriteria.map((approvalCriterion) => ({
            '@context': approvalCriterion.context,
            '@id': approvalCriterion.contextLink,
            criteria: approvalCriterion.approvalAttributes,
          })),
          claimEnrichment: claim.enrichments.map((enrichment) => ({
            '@context': enrichment.context,
            '@id': enrichment.contextLink,
            resources: enrichment.resources,
          })),
        }
      }),
    },
  }
})

export const selectAttestationHeaderForEntityApiPayload = createSelector(
  attestationSelectors.selectClaimInfo,
  (claimInfo) => {
    return {
      name: claimInfo.title,
      description: claimInfo.shortDescription,
      image: undefined,
      imageDescription: undefined,
      location: undefined,
      sdgs: undefined,
    }
  },
)

export const selectPageContentHeaderForEntityApiPayload = createSelector(
  pageContentSelectors.selectHeaderContent,
  (header) => {
    return {
      name: header.title,
      description: header.shortDescription,
      image: header.headerFileSrc,
      imageDescription: header.imageDescription,
      brand: header.brand,
      logo: header.logoFileSrc,
      location: header.location,
      sdgs: header.sdgs,
    }
  },
)

export const selectCellNodeEndpoint = createSelector(advancedSelectors.selectNodes, (nodes): string => {
  try {
    let serviceEndpoint = nodes.find((node) => node.type === NodeType.CellNode)!.serviceEndpoint

    if (!serviceEndpoint!.endsWith('/')) {
      serviceEndpoint += '/'
    }

    return serviceEndpoint!.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth')
  } catch (e) {
    console.log('selectCellNodeEndpoint', e)
    return undefined!
  }
})

// TODO - possibly get entityType from selectEntityType selector as it already exists in state.
// The challenge is we need it for the editEntityMap func
export const selectEntityApiPayload = (entityType: EntityType, pageContentId: string): any =>
  createSelector(
    () => ({ '@type': entityType }),
    createSelector(editEntityMap[entityType].selectHeaderInfoApiPayload, (headerInfo) => headerInfo),
    createSelector(
      settingsSelectors.selectStatus,
      settingsSelectors.selectVersion,
      settingsSelectors.selectPrivacy,
      settingsSelectors.selectTermsOfUse,
      settingsSelectors.selectRequiredCredentials,
      settingsSelectors.selectCreator,
      settingsSelectors.selectOwner,
      settingsSelectors.selectFilters,
      settingsSelectors.selectDisplayCredentials,
      settingsSelectors.selectHeadlineTemplateId,
      settingsSelectors.selectEmbeddedAnalytics,
      (
        status,
        version,
        privacy,
        terms,
        requiredCredentials,
        creator,
        owner,
        filters,
        displayCredentials,
        headlineTemplateId,
        embeddedAnalytics,
      ) => {
        return {
          '@context': 'https://schema.ixo.foundation/entity:2383r9riuew',
          entitySchemaVersion: process.env.REACT_APP_ENTITY_VERSION,
          relayerNode: process.env.REACT_APP_RELAYER_NODE,
          startDate: serverDateFormat(status.startDate),
          endDate: serverDateFormat(status.endDate),
          status: status.status ? status.status : 'Created',
          stage: status.stage,
          version: {
            versionNumber: version.versionNumber,
            effectiveDate: serverDateFormat(version.effectiveDate),
            notes: version.notes,
          },
          terms: undefined,
          privacy: undefined,
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
            '@context': 'https://www.w3.org/2018/credentials/v1',
            items: displayCredentials.map((credential) => ({
              credential: credential.credential,
              badge: credential.badge,
            })),
          },
          headlineMetric: {
            claimTemplateId: headlineTemplateId,
          },
          embeddedAnalytics: embeddedAnalytics.map((analytic) => ({
            title: analytic.title,
            urls: analytic.urls,
          })),
        }
      },
    ),
    () => ({
      page: {
        cid: pageContentId,
        version: process.env.REACT_APP_ENTITY_PAGE_VERSION,
      },
    }),
    createSelector(editEntityMap[entityType].selectClaimsApiPayload, (claims) => claims),
    createSelector(
      advancedSelectors.selectLinkedEntities,
      advancedSelectors.selectPayments,
      advancedSelectors.selectStaking,
      advancedSelectors.selectNodes,
      advancedSelectors.selectLiquidity,
      advancedSelectors.selectKeys,
      advancedSelectors.selectServices,
      advancedSelectors.selectDataResources,
      advancedSelectors.selectLinkedResources,
      (linkedEntities, payments, staking, nodes, liquidity, keys, services, dataResources, linkedResources) => {
        return {
          linkedEntities: linkedEntities.map((linkedEntity) => ({
            '@type': linkedEntity.type,
            id: linkedEntity.entityId,
          })),
          fees: {
            '@context': 'https://schema.ixo.world/fees/ipfs3r08webu2eou',
            items: payments.map((payment) => ({
              '@type': payment.type,
              id: payment.paymentId,
            })),
          },
          stake: undefined,
          nodes: {
            '@context': 'https://schema.ixo.world/nodes/ipfs3r08webu2eou',
            items: nodes.map((node) => ({
              '@type': node.type,
              id: node.nodeId,
              serviceEndpoint: node.serviceEndpoint,
            })),
          },
          funding: undefined,
          liquidity: {
            '@context': 'https://schema.ixo.world/liquidity/ipfs3r08webu2eou',
            items: liquidity.map((elem) => ({
              '@type': elem.source,
              id: elem.liquidityId,
            })),
          },
          keys: undefined,
          service: services.map((service) => ({
            '@type': service.type,
            id: service.serviceId,
            serviceEndpoint: service.serviceEndpoint,
            description: service.shortDescription,
            publicKey: service.publicKey,
            properties: service.properties,
          })),
          linkedResources: linkedResources.map((linkedResource) => ({
            name: linkedResource.name,
            description: linkedResource.description,
            '@type': linkedResource.type,
            path: linkedResource.path,
          })),
          data: undefined,
        }
      },
    ),
    (entityType, header, settings, page, claims, advanced): ApiEntity => {
      return {
        ...entityType,
        ...header,
        ...settings,
        ...page,
        ...claims,
        ...advanced,
      }
    },
  )
