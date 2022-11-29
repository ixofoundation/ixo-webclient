import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { Entity } from './types'
import { Agent, EntityType, NodeType } from '../types'
import { selectUserDid } from 'modules/Account/Account.selectors'
import { AgentRole } from 'modules/Account/types'
import { AgentStatus } from './EntityImpact/EntityAgents/types'

export const selectSelectedEntity = (state: RootState): Entity => state.selectedEntity

export const selectEntityDid = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity?.did ?? ''
})

export const selectEntityAddress = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity?.address ?? ''
})

export const selectEntityType = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.type : null
})

export const selectEntityName = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.name : null
})

export const selectEntityDescription = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.description : null
})

export const selectEntityCreator = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.creatorDid : null
})

export const selectEntityDateCreated = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.dateCreated : null
})

export const selectEntityCreatorName = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.creatorName : null
})

export const selectEntityCreatorLogo = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.creatorLogo : null
})

export const selectEntityCreatorWebsite = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.creatorWebsite : null
})

export const selectEntityCreatorMission = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.creatorMission : null
})

export const selectEntityClaims = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.entityClaims : null
})

export const selectPaymentClaims = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity
    ? entity.claims.filter((claim) =>
        entity.entityClaims.items
          .find((item: any) => item['@id'] === claim.claimTemplateId)
          .claimTypes.includes('Payment'),
      )
    : []
})

export const selectEntityStatus = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity?.status ?? ''
})

export const selectEntityImage = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.image : null
})

export const selectEntityLogo = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.logo : null
})

export const selectEntityLocation = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.location : null
})

export const selectEntitySdgs = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.sdgs : []
})

export const selectEntityBondDid = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity?.bondDid ?? ''
})

export const selectEntityDdoTags = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.ddoTags : []
})

export const selectEntityAgents = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.agents : []
})

export const selectEntityClaimTemplateId = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity ? entity.claimTemplateId : undefined
})

export const entityIsLoading = createSelector(selectSelectedEntity, (entity: Entity) => {
  return !entity || !entity.type
})

export const selectEntityLoadingError = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity?.error
})

export const selectEntityAnalytics = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity && entity.embeddedAnalytics ? entity.embeddedAnalytics : []
})

export const selectEntityLinkedEntities = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity && entity.linkedEntities ? entity.linkedEntities : []
})

export const selectEntityInvestmentDid = createSelector(selectSelectedEntity, (entity: Entity) => {
  if (entity && entity.linkedEntities) {
    const linkedInvestment = entity.linkedEntities.find((entity) => {
      return entity['@type'] === EntityType.Investment
    })

    if (linkedInvestment) {
      return linkedInvestment.id
    }
  }

  return null
})

export const selectCellNodeEndpoint = createSelector(selectSelectedEntity, (entity: Entity) => {
  try {
    const { nodes } = entity
    // console.log({ nodes })
    const serviceEndpoint = nodes.items
      .find((item) => item['@type'] === NodeType.CellNode)
      ?.serviceEndpoint.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth') // FIXME: temporary hack to replace pds_pandora with cellnode-pandora

    if (serviceEndpoint!.endsWith('/')) {
      return serviceEndpoint
    }
    return serviceEndpoint + '/'
  } catch (e) {
    console.log('selectCellNodeEndpoint', e)
    return undefined
  }
})

export const selectEntityGoal = createSelector(selectSelectedEntity, (entity: Entity) => {
  return entity.goal
})

export const selectIsApprovedSA = createSelector(
  selectEntityAgents,
  selectUserDid,
  (agents: Agent[], userDid: string) => {
    return agents.some(
      (agent) =>
        agent.did === userDid && agent.role === AgentRole.ServiceProvider && agent.status === AgentStatus.Approved,
    )
  },
)

export const selectIsApprovedIA = createSelector(
  selectEntityAgents,
  selectUserDid,
  (agents: Agent[], userDid: string) => {
    return agents.some(
      (agent) => agent.did === userDid && agent.role === AgentRole.Investor && agent.status === AgentStatus.Approved,
    )
  },
)

export const selectUserRole = createSelector(
  selectEntityAgents,
  selectUserDid,
  selectEntityCreator,
  (agents: Agent[], userDid: string, creatorDid: string | null) => {
    if (creatorDid && userDid && creatorDid === userDid) {
      return AgentRole.Owner
    }
    return agents.find((agent) => agent.did === userDid)?.role ?? undefined
  },
)
