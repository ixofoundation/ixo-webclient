import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { uploadToService } from "services/services"
import { TEntityPageModel } from "types/entities"

export const savePage = async (
    page: TEntityPageModel,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      if (Object.values(page).filter(({ data }) => data).length === 0) {
        throw new Error('Payload is empty')
      }
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#page',
        page: Object.values(page),
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await uploadToService(buff.toString('base64'), service)
      console.log('SavePage', res)
      return res
    } catch (e) {
      console.error('SavePage', e)
      return undefined
    }
  }