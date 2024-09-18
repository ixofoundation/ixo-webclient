import { Service } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { CellnodePublicResource, CellnodeWeb3Resource } from "@ixo/impactxclient-sdk/types/custom_queries/cellnode"
import { currentRelayerNode } from "constants/common"
import { uploadToService } from "services/services"
import { TEntityCreatorModel } from "types/entities"

export const saveAdministrator = async (
    issuer: string,
    administrator: TEntityCreatorModel,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      if (!administrator) {
        throw new Error('Payload is empty')
      }
      const payload = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/ixo/ns/context/v1',
          'https://w3id.org/ixo/ns/protocol/entity#administrator',
          {
            '@version': 1,
            '@protected': true,
            id: '@id',
            type: '@type',
          },
        ],
        id: 'https://w3id.org/ixo/ns/credential-schemas/organization/v1',
        type: ['VerifiableCredential', 'AdministratorCredential'],
        issuer: issuer, // TODO: issuerDid ? maybe creatorDid inputted in form
        issuanceDate: new Date().toISOString(), // TODO: new Date(now)?
        validFrom: new Date().toISOString(), // TODO: new Date(now)?
        expirationDate: '', //  TODO:
        credentialSubject: {
          id: currentRelayerNode,
          type: 'administrator',
          displayName: administrator.displayName,
          location: administrator.location,
          email: administrator.email,
          mission: administrator.mission,
          website: administrator.website,
          logo: administrator.logo,
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(), //   TODO:
          proofPurpose: 'assertionMethod',
          verificationMethod: 'did:ixo:entity:abc123#key-1', //   TODO:
          jws: '',
        },
      }
      const buff = Buffer.from(JSON.stringify(payload))
      const res = await uploadToService(buff.toString('base64'), service)
      console.log('SaveAdministrator', res)
      return res
    } catch (e) {
      console.error('SaveAdministrator', e)
      return undefined
    }
  }