import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { uploadToService } from "services/services"
import { TEntityDDOTagModel } from "types/entities"

export const saveTags = async (
    ddoTags: TEntityDDOTagModel[],
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      if (ddoTags.length === 0) {
        throw new Error('Payload is empty')
      }
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#tags',
        entityTags: ddoTags,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await uploadToService(buff.toString('base64'), service)
      console.log('SaveTags', res)
      return res
    } catch (e) {
      console.error('SaveTags', e)
      return undefined
    }
  }