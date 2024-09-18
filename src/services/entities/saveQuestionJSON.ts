import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { uploadToService } from "services/services"

export const saveQuestionJSON = async (
    questionJSON: any,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      if (questionJSON.pages.length === 0) {
        throw new Error('No Questions')
      }

      const payload = {
        '@context': {
          ixo: 'https://w3id.org/ixo/ns/protocol/',
          '@id': '@type',
          type: '@type',
          '@protected': true,
        },
        type: 'ixo:entity#surveyTemplate',
        question: questionJSON,
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await uploadToService(buff.toString('base64'), service)
      console.log('SaveQuestionJSON', res)
      return res
    } catch (e) {
      console.error('SaveQuestionJSON', e)
      return undefined
    }
  }