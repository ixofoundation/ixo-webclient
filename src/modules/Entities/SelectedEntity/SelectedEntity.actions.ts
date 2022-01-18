import Axios from 'axios'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { PageContent } from 'common/api/blocksync-api/types/page-content'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import keysafe from 'common/keysafe/keysafe'
import { RootState } from 'common/redux/types'
import * as Toast from 'common/utils/Toast'
import { fromBase64 } from 'js-base64'
import { get } from 'lodash'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import { Attestation } from 'modules/EntityClaims/types'
import moment from 'moment'
import { Dispatch } from 'redux'
import { EntityType, FundSource, PDS_URL, ProjectStatus } from '../types'
import {
  ClearEntityAction,
  GetEntityAction,
  SelectedEntityActions,
  UpdateProjectStatusAction,
} from './types'

export const clearEntity = (): ClearEntityAction => ({
  type: SelectedEntityActions.ClearEntity,
})

export const getEntity = (did: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): GetEntityAction => {
  const { selectedEntity } = getState()

  if (selectedEntity && selectedEntity.did === did) {
    return null
  }

  dispatch(clearEntity())

  const fetchEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(
    did,
  )

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  return dispatch({
    type: SelectedEntityActions.GetEntity,
    payload: fetchEntity.then((apiEntity: ApiListedEntity) => {
      return fetchContent(apiEntity.data.page.cid).then(
        (resourceData: ApiResource) => {
          const content: PageContent | Attestation = JSON.parse(
            fromBase64(resourceData.data),
          )

          // TODO - in future we will get all claims
          const claimToUse = apiEntity.data.entityClaims
            ? apiEntity.data.entityClaims.items[0]
            : undefined

          const linkedInvestment = apiEntity.data.linkedEntities.find(
            (entity) => {
              return entity['@type'] === EntityType.Investment
            },
          )

          let linkedInvestmentDid = linkedInvestment
            ? linkedInvestment.id
            : null

          if (apiEntity.data['@type'] === EntityType.Investment) {
            linkedInvestmentDid = apiEntity.projectDid
          }

          if (linkedInvestmentDid) {
            const fetchInvestment: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(
              linkedInvestmentDid,
            )
            fetchInvestment.then((apiEntity: ApiListedEntity) => {
              const alphaBonds = apiEntity.data.funding.items.filter(
                (fund) => fund['@type'] === FundSource.Alphabond,
              )

              return Promise.all(
                alphaBonds.map((alphaBond) => {
                  return Axios.get(
                    `${process.env.REACT_APP_GAIA_URL}/bonds/${alphaBond.id}`,
                    {
                      transformResponse: [
                        (response: string): any => {
                          const parsedResponse = JSON.parse(response)

                          return get(
                            parsedResponse,
                            'result.value',
                            parsedResponse,
                          )
                        },
                      ],
                    },
                  )
                }),
              ).then((bondDetails) => {
                const bondToShow = bondDetails
                  .map((bondDetail) => bondDetail.data)
                  .find((bond) => bond.function_type !== 'swapper_function')

                if (bondToShow) {
                  return dispatch({
                    type: SelectedEntityActions.GetEntityBond,
                    bondDid: bondToShow.bond_did,
                  })
                }

                return null
              })
            })
          }

          // @todo this might not need if claim template type field is populated on entityClaims field of entity
          if (claimToUse) {
            getClaimTemplate(claimToUse['@id'])(dispatch, getState)
          }

          let requiredImpactClaimsCount = 0
          let pendingImpactClaimsCount = 0
          let successfulImpactClaimsCount = 0
          let rejectedImpactClaimsCount = 0

          if (claimToUse) {
            return Promise.all(
              apiEntity.data.entityClaims.items.map((claim) =>
                blocksyncApi.project.getProjectByProjectDid(claim['@id']),
              ),
            ).then((entityClaimsData: ApiListedEntity[]) => {
              const impactClaimIds = entityClaimsData
                .filter((claimData: ApiListedEntity) =>
                  claimData.data.ddoTags.some(
                    (ddoTag) =>
                      ddoTag.category === 'Claim Type' &&
                      ddoTag.tags.some((tag) => tag === 'Impact'),
                  ),
                )
                .map((claimData) => claimData.projectDid)

              const impactClaims = apiEntity.data.entityClaims.items.filter(
                (claim) => impactClaimIds.includes(claim['@id']),
              )

              requiredImpactClaimsCount = impactClaims.reduce(
                (a, b) => a + b.targetMax,
                0,
              )

              apiEntity.data.claims.forEach((claim) => {
                if (impactClaimIds.includes(claim.claimTemplateId)) {
                  switch (claim.status) {
                    case '0':
                      pendingImpactClaimsCount += 1
                      break
                    case '1':
                      successfulImpactClaimsCount += 1
                      break
                    case '2':
                      rejectedImpactClaimsCount += 1
                      break
                    case '3':
                    default:
                      break
                  }
                }
              })
              return {
                did: apiEntity.projectDid,
                type: apiEntity.data['@type'],
                ddoTags: apiEntity.data.ddoTags,
                creatorDid: apiEntity.data.createdBy,
                status: apiEntity.status,
                name: apiEntity.data.name,
                description: apiEntity.data.description,
                dateCreated: moment(apiEntity.data.createdOn),
                creatorName: apiEntity.data.creator.displayName,
                creatorLogo: apiEntity.data.creator.logo,
                creatorMission: apiEntity.data.creator.mission,
                creatorWebsite: apiEntity.data.creator.website,
                location: apiEntity.data.location,
                image: apiEntity.data.image,
                logo: apiEntity.data.logo,
                embeddedAnalytics: apiEntity.data.embeddedAnalytics,
                serviceProvidersCount:
                  apiEntity.data.agentStats.serviceProviders,
                serviceProvidersPendingCount:
                  apiEntity.data.agentStats.serviceProvidersPending,
                evaluatorsCount: apiEntity.data.agentStats.evaluators,
                evaluatorsPendingCount:
                  apiEntity.data.agentStats.evaluatorsPending,
                goal: claimToUse ? claimToUse.goal : undefined,
                claimTemplateId: claimToUse ? claimToUse['@id'] : undefined,
                requiredClaimsCount: requiredImpactClaimsCount,
                pendingClaimsCount: pendingImpactClaimsCount,
                successfulClaimsCount: successfulImpactClaimsCount,
                rejectedClaimsCount: rejectedImpactClaimsCount,
                agents: apiEntity.data.agents,
                sdgs: apiEntity.data.sdgs,
                bondDid: undefined,
                entityClaims: apiEntity.data.entityClaims,
                claims: apiEntity.data.claims,
                linkedEntities: apiEntity.data.linkedEntities,
                content,
                nodeDid: apiEntity.data.nodeDid,
              }
            })
          } else {
            return {
              did: apiEntity.projectDid,
              type: apiEntity.data['@type'],
              ddoTags: apiEntity.data.ddoTags,
              creatorDid: apiEntity.data.createdBy,
              status: apiEntity.status,
              name: apiEntity.data.name,
              description: apiEntity.data.description,
              dateCreated: moment(apiEntity.data.createdOn),
              creatorName: apiEntity.data.creator.displayName,
              creatorLogo: apiEntity.data.creator.logo,
              creatorMission: apiEntity.data.creator.mission,
              creatorWebsite: apiEntity.data.creator.website,
              location: apiEntity.data.location,
              image: apiEntity.data.image,
              logo: apiEntity.data.logo,
              embeddedAnalytics: apiEntity.data.embeddedAnalytics,
              serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
              serviceProvidersPendingCount:
                apiEntity.data.agentStats.serviceProvidersPending,
              evaluatorsCount: apiEntity.data.agentStats.evaluators,
              evaluatorsPendingCount:
                apiEntity.data.agentStats.evaluatorsPending,
              goal: claimToUse ? claimToUse.goal : undefined,
              claimTemplateId: claimToUse ? claimToUse['@id'] : undefined,
              requiredClaimsCount: requiredImpactClaimsCount,
              pendingClaimsCount: pendingImpactClaimsCount,
              successfulClaimsCount: successfulImpactClaimsCount,
              rejectedClaimsCount: rejectedImpactClaimsCount,
              agents: apiEntity.data.agents,
              sdgs: apiEntity.data.sdgs,
              bondDid: undefined,
              entityClaims: apiEntity.data.entityClaims,
              claims: apiEntity.data.claims,
              linkedEntities: apiEntity.data.linkedEntities,
              content,
              nodeDid: apiEntity.data.nodeDid,
            }
          }
        },
      )
    }),
  })
}

export const updateProjectStatus = (
  projectDid: string,
  status: ProjectStatus,
) => (dispatch: Dispatch): UpdateProjectStatusAction => {
  const statusData = {
    projectDid: projectDid,
    status: status,
  }

  keysafe.requestSigning(
    JSON.stringify(statusData),
    (error: any, signature: any) => {
      if (!error) {
        blocksyncApi.project
          .updateProjectStatus(statusData, signature, PDS_URL)
          .then(() => {
            return dispatch({
              type: SelectedEntityActions.UpdateProjectStatus,
            })
          })
      }
    },
    'base64',
  )

  return null
}

export const updateProjectStatusToStarted = (projectDid: string) => async (
  dispatch: Dispatch,
): Promise<UpdateProjectStatusAction> => {
  let statusData = {
    projectDid: projectDid,
    status: ProjectStatus.Pending,
  }

  keysafe.requestSigning(
    JSON.stringify(statusData),
    (error: any, signature: any) => {
      if (!error) {
        blocksyncApi.project
          .updateProjectStatus(statusData, signature, PDS_URL)
          .then(() => {
            statusData = {
              projectDid: projectDid,
              status: ProjectStatus.Funded,
            }

            keysafe.requestSigning(
              JSON.stringify(statusData),
              (error: any, signature: any) => {
                if (!error) {
                  blocksyncApi.project
                    .updateProjectStatus(statusData, signature, PDS_URL)
                    .then(() => {
                      statusData = {
                        projectDid: projectDid,
                        status: ProjectStatus.Started,
                      }

                      keysafe.requestSigning(
                        JSON.stringify(statusData),
                        (error: any, signature: any) => {
                          if (!error) {
                            blocksyncApi.project
                              .updateProjectStatus(
                                statusData,
                                signature,
                                PDS_URL,
                              )
                              .then((res) => {
                                if (res.error) {
                                  Toast.errorToast(
                                    `Error: Please send some IXO tokens to the project`,
                                  )

                                  return dispatch({
                                    type:
                                      SelectedEntityActions.UpdateProjectStatus,
                                  })
                                }

                                Toast.successToast(
                                  `Successfully updated the status to STARTED`,
                                )
                                return dispatch({
                                  type:
                                    SelectedEntityActions.UpdateProjectStatus,
                                })
                              })
                          }
                        },
                        'base64',
                      )
                    })
                }
              },
              'base64',
            )
          })
      }
    },
    'base64',
  )

  return null
}
