import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import { uploadToService } from 'services/services'

export const saveTokenMetadata = async (
  token: any,
  service: Service,
): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
  try {
    const payload = {
      ...token,
    }
    const buff = Buffer.from(JSON.stringify(payload))
    const res = await uploadToService(buff.toString('base64'), service)
    console.log('SaveTokenMetadata', res)
    return res
  } catch (e) {
    console.error('SaveTokenMetadata', e)
    return undefined
  }
}
