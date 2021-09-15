import { Dispatch } from 'redux'
import moment from 'moment'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import {
  SelectedEntityActions,
  GetEntityAction,
  ClearEntityAction,
  UpdateProjectStatusAction
} from './types'
import { RootState } from 'common/redux/types'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { PDS_URL, FundSource, EntityType } from '../types'
import { PageContent } from 'common/api/blocksync-api/types/page-content'
import { Attestation } from 'modules/EntityClaims/types'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import { fromBase64 } from 'js-base64'
import { ProjectStatus } from '../types'
import keysafe from 'common/keysafe/keysafe'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as Toast from 'common/utils/Toast'
import Axios from "axios";
import { get } from 'lodash'

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

          const linkedInvestment = apiEntity.data.linkedEntities.find((entity) => {
            return entity['@type'] === EntityType.Investment
          })

          let linkedInvestmentDid = linkedInvestment ? linkedInvestment.id : null

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

                          return get(parsedResponse, 'result.value', parsedResponse);
                        },
                      ],
                    }
                  )
                })
              ).then(bondDetails => {
                const bondToShow = bondDetails.map(bondDetail => bondDetail.data).find(bond => (bond.function_type !== 'swapper_function'))

                if (bondToShow) {
                  return dispatch({
                    type: SelectedEntityActions.GetEntityBond,
                    bondDid: bondToShow.bond_did
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

          return {
            did: apiEntity.projectDid,
            type: apiEntity.data['@type'],
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
            evaluatorsPendingCount: apiEntity.data.agentStats.evaluatorsPending,
            goal: claimToUse ? claimToUse.goal : undefined,
            claimTemplateId: claimToUse ? claimToUse['@id'] : undefined,
            requiredClaimsCount: claimToUse ? claimToUse.targetMax : undefined,
            pendingClaimsCount: claimToUse
              ? apiEntity.data.claims.filter((claim) => claim.status === '0')
                  .length
              : undefined,
            successfulClaimsCount: claimToUse
              ? apiEntity.data.claimStats.currentSuccessful
              : undefined,
            rejectedClaimsCount: claimToUse
              ? apiEntity.data.claimStats.currentRejected
              : undefined,
            agents: apiEntity.data.agents,
            sdgs: apiEntity.data.sdgs,
            bondDid: undefined,
            entityClaims: apiEntity.data.entityClaims,
            claims: apiEntity.data.claims,
            linkedEntities: apiEntity.data.linkedEntities,
            content,
          }
        },
      )
    }),
  })
}

export const updateProjectStatus = (
  projectDid: string,
  status: ProjectStatus
) => (
  dispatch: Dispatch
): UpdateProjectStatusAction => {
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
          .then(res => {
            return dispatch({
              type: SelectedEntityActions.UpdateProjectStatus
            })
          })
      }
    },
    'base64',
  )

  return null
}


export const updateProjectStatusToStarted = (
  projectDid: string
) => async (
  dispatch: Dispatch
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
          .then(res => {
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
                    .then(res => {
                      statusData = {
                        projectDid: projectDid,
                        status: ProjectStatus.Started,
                      }

                      keysafe.requestSigning(
                        JSON.stringify(statusData),
                        (error: any, signature: any) => {
                          if (!error) {
                            blocksyncApi.project
                              .updateProjectStatus(statusData, signature, PDS_URL)
                              .then(res => {
                                if (res.error) {
                                  Toast.errorToast(`Error: Please send some IXO tokens to the project`)

                                  return dispatch({
                                    type: SelectedEntityActions.UpdateProjectStatus
                                  })
                                }

                                Toast.successToast(`Successfully updated the status to STARTED`)
                                return dispatch({
                                  type: SelectedEntityActions.UpdateProjectStatus
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