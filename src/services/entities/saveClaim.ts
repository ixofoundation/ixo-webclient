import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { uploadToService } from "services/services"
import { TEntityClaimModel } from "types/entities"

export const saveClaim = async (
    claim: TEntityClaimModel,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const buff = Buffer.from(
        JSON.stringify({
          '@context': {
            ixo: 'https://w3id.org/ixo/vocab/v1',
            web3: 'https://ipfs.io/ipfs/',
            id: '@id',
            type: '@type',
            '@protected': true,
          },
          id: '{id}#claims',
          type: 'ixo:Claims',
          entityClaims: [claim],
        }),
      )

      const res = await uploadToService(buff.toString('base64'), service)
      console.log('SaveClaim', res)
      return res
    } catch (e) {
      console.error('SaveClaim', e)
      return undefined
    }
  }