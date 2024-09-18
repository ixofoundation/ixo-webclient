

import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import { saveClaim } from './saveClaim'
import { NodeType, PDS_URL, TEntityClaimModel } from 'types/entities'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'
import { LinkedClaim } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

export type TransformEntityStateToLinkedClaimsProps = {
  claim: { [id: string]: TEntityClaimModel }
  claimProtocols: any[]
}

export const transformEntityStateToLinkedClaims = async ({ claim, claimProtocols }: TransformEntityStateToLinkedClaimsProps): Promise<LinkedClaim[]> => {
  const cellnodeService = {
    id: '{id}#cellnode',
    type: NodeType.CellNode,
    serviceEndpoint: PDS_URL!,
  }

  const linkedClaims: LinkedClaim[] = await Promise.all(
    Object.values(claim).map(async (item) => {
      const res: CellnodePublicResource | CellnodeWeb3Resource | undefined = await saveClaim(item, cellnodeService)
      const claimProtocol = claimProtocols.find((protocol) => item.template?.id.includes(protocol.id))

      return {
        type: claimProtocol?.profile?.category || '',
        id: `{id}#${item.id}`,
        description: claimProtocol?.profile?.description || '',
        serviceEndpoint: LinkedResourceServiceEndpointGenerator(res!, cellnodeService),
        proof: LinkedResourceProofGenerator(res!, cellnodeService),
        encrypted: 'false',
        right: '',
      }
    }),
  )

  return linkedClaims
}
