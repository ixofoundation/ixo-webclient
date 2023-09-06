import { ApiListedEntity } from 'api/blocksync/types/entities'
import { isPageContent, PageContent } from 'api/blocksync/types/pageContent'
import { ApiResource } from 'api/blocksync/types/resource'
import { RootState } from 'redux/store'
import { getHeadlineClaimInfo } from 'utils/claims'
import { fromBase64 } from 'js-base64'
import { BondActions } from 'redux/bond/bond.types'
import { getClaimTemplate } from 'redux/submitEntityClaim/submitEntityClaim.actions'
import { Attestation } from 'types/entityClaims'
import moment from 'moment'
import { Dispatch } from 'redux'
import {
  checkIsLaunchpadFromApiListedEntityData,
  getBondDidFromApiListedEntityData,
  replaceLegacyPDSInEntity,
  replaceLegacyPDSInPageContent,
} from '../../utils/entities'
import { EntityType, ProjectStatus, PDS_URL, NodeType } from '../../types/entities'
import {
  ClearEntityAction,
  GetEntityAction,
  GetEntityClaimsAction,
  SelectedEntityActions,
  UpdateEntityBondDetailAction,
  UpdateEntityAddressAction,
  UpdateEntityTypeAction,
  UpdateProjectStatusAction,
} from './selectedEntity.types'
import { Bond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'
import { BlockSyncService } from 'services/blocksync'

const bsService = new BlockSyncService()

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

    const fetchEntity: Promise<ApiListedEntity> = bsService.project.getProjectByProjectDid(did)

    const fetchContent = (key: string, endpoint: string): Promise<ApiResource> => {
      return bsService.project.fetchPublic(key, endpoint) as Promise<ApiResource>
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
                  bsService.project.getProjectByProjectDid(linkedInvestmentDid)
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
                  bsService.project.getProjectByProjectDid(claim['@id']).catch(() => undefined),
                ),
              )
                .then((entityClaimsData: ApiListedEntity[]) => {
                  entityClaims.items = entityClaims.items.map((item) => {
                    return {
                      ...item,
                      claimTypes:
                        entityClaimsData
                          .filter((v) => !!v)
                          .find((dataItem) => dataItem?.projectDid === item['@id'])
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

    const fetchEntity: Promise<ApiListedEntity> = bsService.project.getProjectByProjectDid(did)
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
    // const statusData = {
    //   projectDid: projectDid,
    //   status: status,
    // }

    // const state = getState()
    // const cellNodeEndpoint = selectCellNodeEndpoint(state)

    // keysafe.requestSigning(
    //   JSON.stringify(statusData),
    //   (error: any, signature: any) => {
    //     if (!error) {
    //       blocksyncApi.project.updateProjectStatus(statusData, signature, cellNodeEndpoint!).then(() => {
    //         return dispatch({
    //           type: SelectedEntityActions.UpdateProjectStatus,
    //         })
    //       })
    //     }
    //   },
    //   'base64',
    // )

    return null!
  }

export const updateEntityAddressAction = (address: string): UpdateEntityAddressAction => ({
  type: SelectedEntityActions.UpdateEntityAddress,
  payload: address,
})

export const updateEntityBondDetailAction = (bond: Bond): UpdateEntityBondDetailAction => ({
  type: SelectedEntityActions.UpdateEntityBondDetail,
  payload: bond,
})

export const updateEntityTypeAction = (type: string): UpdateEntityTypeAction => ({
  type: SelectedEntityActions.UpdateEntityType,
  payload: type,
})
