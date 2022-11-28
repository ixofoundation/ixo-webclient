import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import { isPageContent, PageContent } from 'common/api/blocksync-api/types/page-content'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import keysafe from 'common/keysafe/keysafe'
import { RootState } from 'common/redux/types'
import { getHeadlineClaimInfo } from 'common/utils/claims.utils'
import { keysafeRequestSigning } from 'common/utils/keysafe'
import * as Toast from 'common/utils/Toast'
import { fromBase64 } from 'js-base64'
import { BondActions } from 'modules/BondModules/bond/types'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import { Attestation } from 'modules/EntityClaims/types'
import moment from 'moment'
import { Dispatch } from 'redux'
import {
  checkIsLaunchpadFromApiListedEntityData,
  getBondDidFromApiListedEntityData,
  replaceLegacyPDSInEntity,
  replaceLegacyPDSInPageContent,
} from '../Entities.utils'
import { EntityType, ProjectStatus, PDS_URL, NodeType } from '../types'
import { selectCellNodeEndpoint } from './SelectedEntity.selectors'
import {
  ClearEntityAction,
  GetEntityAction,
  GetEntityClaimsAction,
  SelectedEntityActions,
  UpdateEntityAddressAction,
  UpdateProjectStatusAction,
} from './types'

export const clearEntity = (): ClearEntityAction => ({
  type: SelectedEntityActions.ClearEntity,
})

/**
 * @deprecated
 * @param did
 * @returns
 */
export const getEntity =
  (did: string) =>
  (dispatch: Dispatch, getState: () => RootState): GetEntityAction => {
    const { selectedEntity } = getState()

    if (selectedEntity && selectedEntity.did === did) {
      return null!
    }

    dispatch(clearEntity())

    const fetchEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(did)

    const fetchContent = (key: string, endpoint: string): Promise<ApiResource> => {
      return blocksyncApi.project.fetchPublic(key, endpoint) as Promise<ApiResource>
    }

    return dispatch({
      type: SelectedEntityActions.GetEntity,
      payload: fetchEntity
        .then((apiEntity: ApiListedEntity) => ({
          ...apiEntity,
          data: replaceLegacyPDSInEntity(apiEntity.data),
        }))
        .then((apiEntity: ApiListedEntity) => {
          const { nodes } = apiEntity.data
          let cellNodeEndpoint =
            nodes.items.find((item) => item['@type'] === NodeType.CellNode)?.serviceEndpoint ?? undefined
          if (!cellNodeEndpoint) {
            // TODO: exception handling for previously created entities as because they don't have the linked cellnode endpoints
            console.error('No CellNode service endpoints from blocksync!')
            cellNodeEndpoint = PDS_URL
          }
          if (!!cellNodeEndpoint && !cellNodeEndpoint.endsWith('/')) {
            cellNodeEndpoint += '/'
          }

          // FIXME: temporary hack to replace pds_pandora with cellnode-pandora
          cellNodeEndpoint = cellNodeEndpoint!.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth')

          return fetchContent(apiEntity.data.page.cid, cellNodeEndpoint)
            .then((resourceData: ApiResource) => {
              let content: PageContent | Attestation = JSON.parse(fromBase64(resourceData.data))

              if (isPageContent(content)) {
                content = replaceLegacyPDSInPageContent(content)
              }

              const linkedInvestment = apiEntity.data.linkedEntities.find((entity) => {
                return entity['@type'] === EntityType.Investment
              })

              let linkedInvestmentDid = linkedInvestment ? linkedInvestment.id : null

              if (apiEntity.data['@type'] === EntityType.Investment) {
                linkedInvestmentDid = apiEntity.projectDid
              }

              if (linkedInvestmentDid) {
                const fetchInvestment: Promise<ApiListedEntity> =
                  blocksyncApi.project.getProjectByProjectDid(linkedInvestmentDid)
                fetchInvestment.then((apiEntity: ApiListedEntity) => {
                  getBondDidFromApiListedEntityData(apiEntity.data).then((bondDid) => {
                    if (bondDid) {
                      dispatch({
                        type: BondActions.GetBondDid,
                        payload: bondDid,
                      })

                      return dispatch({
                        type: SelectedEntityActions.GetEntityBond,
                        bondDid: bondDid,
                      })
                    }
                    return null
                  })
                })
              }

              // isLaunchpad checking
              const isLaunchpad = checkIsLaunchpadFromApiListedEntityData(apiEntity.data.ddoTags)
              if (isLaunchpad) {
                getBondDidFromApiListedEntityData(apiEntity.data).then((bondDid) => {
                  if (bondDid) {
                    dispatch({
                      type: BondActions.GetBondDid,
                      payload: bondDid,
                    })

                    return dispatch({
                      type: SelectedEntityActions.GetEntityBond,
                      bondDid: bondDid,
                    })
                  }
                  return null
                })
              }

              const { claimToUse, successful, pending, rejected, disputed } = getHeadlineClaimInfo(apiEntity)

              if (!apiEntity.data.headlineMetric) {
                console.error('apiEntity.data.headlineMetric is undefined, so Dashboard would not be rendered')
              }

              if (claimToUse) {
                getClaimTemplate(claimToUse['@id'], cellNodeEndpoint)(dispatch, getState)
              }

              const entityClaims = apiEntity.data.entityClaims ?? {
                items: [],
                '@context': undefined,
              }

              return Promise.all(
                entityClaims.items.map((claim) =>
                  blocksyncApi.project.getProjectByProjectDid(claim['@id']).catch(() => undefined),
                ),
              )
                .then((entityClaimsData: ApiListedEntity[]) => {
                  entityClaims.items = entityClaims.items.map((item) => {
                    return {
                      ...item,
                      claimTypes:
                        entityClaimsData
                          .filter((v) => !!v)
                          .find((dataItem) => dataItem.projectDid === item['@id'])
                          ?.data.ddoTags.reduce((filtered, ddoTag) => {
                            // @ts-ignore
                            if (ddoTag.category === 'Claim Type') filtered = [...filtered, ...ddoTag.tags]
                            return filtered
                          }, []) ?? [],
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
                    serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
                    serviceProvidersPendingCount: apiEntity.data.agentStats.serviceProvidersPending,
                    evaluatorsCount: apiEntity.data.agentStats.evaluators,
                    evaluatorsPendingCount: apiEntity.data.agentStats.evaluatorsPending,
                    goal: claimToUse ? claimToUse.goal : undefined,
                    claimTemplateId: claimToUse ? claimToUse['@id'] : undefined,
                    requiredClaimsCount: claimToUse ? claimToUse.targetMax : 0,
                    pendingClaimsCount: pending,
                    successfulClaimsCount: successful,
                    rejectedClaimsCount: rejected,
                    disputedClaimsCount: disputed,
                    agents: apiEntity.data.agents,
                    sdgs: apiEntity.data.sdgs,
                    // bondDid: undefined,
                    entityClaims: entityClaims,
                    claims: apiEntity.data.claims,
                    linkedEntities: apiEntity.data.linkedEntities,
                    content,
                    nodeDid: apiEntity.data.nodeDid,
                    linkedResources: apiEntity.data.linkedResources,
                    nodes,
                  }
                })
                .catch((e) => {
                  console.error('SelectedEntity.action', e)
                })
            })
            .catch((e) => {
              console.error('SelectedEntity.action', 'fetchContent', e)
            })
        })
        .catch((e) => {
          console.error('SelectedEntity.action', 'fetchEntity', e)
          dispatch({
            type: SelectedEntityActions.GetEntityFailure,
            payload: 'Project not found!',
          })
          return undefined
        }),
    } as any)
  }

/**
 * @deprecated
 * @returns
 */
export const getEntityClaims =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GetEntityClaimsAction => {
    const { selectedEntity } = getState()
    const { did } = selectedEntity

    const fetchEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(did)
    return dispatch({
      type: SelectedEntityActions.GetEntityClaims,
      payload: fetchEntity.then((apiEntity: ApiListedEntity) => {
        return apiEntity.data.claims
      }),
    })
  }

/**
 * @deprecated
 * @param projectDid
 * @param status
 * @returns
 */
export const updateProjectStatus =
  (projectDid: string, status: ProjectStatus) =>
  (dispatch: Dispatch, getState: () => RootState): UpdateProjectStatusAction => {
    const statusData = {
      projectDid: projectDid,
      status: status,
    }

    const state = getState()
    const cellNodeEndpoint = selectCellNodeEndpoint(state)

    keysafe.requestSigning(
      JSON.stringify(statusData),
      (error: any, signature: any) => {
        if (!error) {
          blocksyncApi.project.updateProjectStatus(statusData, signature, cellNodeEndpoint!).then(() => {
            return dispatch({
              type: SelectedEntityActions.UpdateProjectStatus,
            })
          })
        }
      },
      'base64',
    )

    return null!
  }

/**
 * @deprecated
 * @param statusData
 * @param cellNodeEndpoint
 * @returns
 */
export const updateProjectStatusOne = async (statusData: any, cellNodeEndpoint: any): Promise<boolean> => {
  const { signature, error } = await keysafeRequestSigning(statusData)
  if (error) {
    Toast.errorToast(error)
    return false
  }
  const res = await blocksyncApi.project.updateProjectStatus(statusData, signature, cellNodeEndpoint)
  if (res.error) {
    const { message } = res.error
    Toast.errorToast(message)
    return false
  }
  Toast.successToast(`Successfully updated the status to ${statusData.status}`)
  return true
}

/**
 * @deprecated
 * @param projectDid
 * @param status
 * @param cellNodeEndpoint
 * @returns
 */
export const updateProjectStatusControlAction = async (
  projectDid: any,
  status: any,
  cellNodeEndpoint: any,
): Promise<boolean> => {
  let statusData = { projectDid, status }

  if (!statusData.status) {
    statusData = { projectDid, status: ProjectStatus.Created }
    const res = await updateProjectStatusOne(statusData, cellNodeEndpoint)
    if (!res) {
      return false
    }
  }

  if (statusData.status === ProjectStatus.Created) {
    statusData = { projectDid, status: ProjectStatus.Pending }
    const res = await updateProjectStatusOne(statusData, cellNodeEndpoint)
    if (!res) {
      return false
    }
  }

  if (statusData.status === ProjectStatus.Pending) {
    statusData = { projectDid, status: ProjectStatus.Funded }
    const res = await updateProjectStatusOne(statusData, cellNodeEndpoint)
    if (!res) {
      return false
    }
  }

  if (statusData.status === ProjectStatus.Funded) {
    statusData = { projectDid, status: ProjectStatus.Started }
    const res = await updateProjectStatusOne(statusData, cellNodeEndpoint)
    if (!res) {
      return false
    }
  }

  return true
}

export const updateEntityAddressAction = (address: string): UpdateEntityAddressAction => ({
  type: SelectedEntityActions.UpdateEntityAddress,
  payload: address,
})
