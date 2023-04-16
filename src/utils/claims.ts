import { Claim } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { ApiListedEntity, ApiEntity } from 'api/blocksync/types/entities'

export interface HeadlineClaimInfo {
  claimToUse?: ApiEntity['entityClaims']['items'][0]
  successful: number
  pending: number
  rejected: number
  disputed: number
}

export const getHeadlineClaimInfo = (apiEntity: ApiListedEntity): HeadlineClaimInfo => {
  const claimToUse =
    apiEntity.data.entityClaims && apiEntity.data.headlineMetric
      ? apiEntity.data.entityClaims.items.find(
          (template) => template['@id'] === apiEntity.data.headlineMetric.claimTemplateId,
        )
      : undefined

  let pending = 0
  let successful = 0
  let rejected = 0
  let disputed = 0

  if (apiEntity.data.headlineMetric?.claimTemplateId) {
    apiEntity.data.claims?.forEach((claim) => {
      if (claim.claimTemplateId === apiEntity.data.headlineMetric.claimTemplateId) {
        switch (claim.status) {
          case '0':
            pending += 1
            break
          case '1':
            successful += 1
            break
          case '2':
            rejected += 1
            break
          case '3':
            disputed += 1
            break
          default:
            break
        }
      }
    })
  }
  return { claimToUse, successful, pending, rejected, disputed }
}

export function claimAvailable(claim: Claim, blockHeight: number) {
  if ('at_height' in claim.release_at) {
    return blockHeight >= claim.release_at.at_height
  } else if ('at_time' in claim.release_at) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(claim.release_at.at_time)
  }

  // Unreachable.
  return false
}
