import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { uploadToService } from "services/services"

export const saveProfile = async (
    profile: any,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        id: 'ixo:entity#profile',
        type: 'profile',
        orgName: profile?.orgName,
        name: profile?.name,
        image: profile?.image,
        logo: profile?.logo,
        brand: profile?.brand,
        location: profile?.location,
        description: profile?.description,
        attributes: profile?.attributes,
        metrics: profile?.metrics,

        category: profile?.category,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await uploadToService(buff.toString('base64'), service)
      console.log('SaveProfile', res)
      return res
    } catch (e) {
      console.error('SaveProfile', e)
      return undefined
    }
  }