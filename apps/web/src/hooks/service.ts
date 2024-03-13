import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import { NodeType, TEntityClaimModel, TEntityCreatorModel, TEntityDDOTagModel, TEntityPageModel } from 'types/entities'
import { chainNetwork } from './configs'
import { TSigner } from 'lib/protocol'
import { useWallet } from '@ixo-webclient/wallet-connector'

export function useService() {
  const { wallet } = useWallet()

  const signer: TSigner = {
    address: wallet?.address || '',
    did: wallet?.did || '',
    pubKey: wallet?.pubKey || new Uint8Array(),
    keyType: 'secp',
  }

  /**
   * @description auto choose service for uploading data
   * @usage in when saving Profile, Creator, Administrator, Page, Tag, etc
   *      default upload to the cellnode
   * @param data
   * @returns
   */
  const UploadDataToService = async (
    data: string,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource> => {
    let res: CellnodePublicResource | CellnodeWeb3Resource
    if (service.type === NodeType.CellNode && service.serviceEndpoint) {
      res = await customQueries.cellnode.uploadPublicDoc('application/ld+json', data, undefined, chainNetwork)
    } else {
      res = await customQueries.cellnode.uploadWeb3Doc(
        utils.common.generateId(12),
        'application/ld+json',
        data,
        undefined,
        chainNetwork,
      )
    }
    return res
  }

  const SaveProfile = async (
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
      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SaveProfile', res)
      return res
    } catch (e) {
      console.error('SaveProfile', e)
      return undefined
    }
  }

  const SaveCreator = async (
    creator: TEntityCreatorModel,
    service: Service,
  ): Promise<CellnodePublicResource | CellnodeWeb3Resource | undefined> => {
    try {
      if (!creator) {
        throw new Error('Payload is empty')
      }
      const payload = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/ixo/ns/context/v1',
          'https://w3id.org/ixo/ns/protocol/entity#creator',
          {
            '@version': 1,
            '@protected': true,
            id: '@id',
            type: '@type',
          },
        ],
        id: 'https://w3id.org/ixo/ns/credential-schemas/organization/v1',
        type: ['VerifiableCredential', 'CreatorCredential'],
        issuer: signer.did, // TODO: issuerDid ? maybe creatorDid inputted in form
        issuanceDate: new Date().toISOString(), // TODO: new Date(now) ?
        validFrom: new Date().toISOString(), // TODO: new Date(now) ?
        expirationDate: '', //  TODO: always empty ?
        credentialSubject: {
          id: process.env.REACT_APP_RELAYER_NODE,
          type: 'creator',
          displayName: creator.displayName,
          location: creator.location,
          email: creator.email,
          mission: creator.mission,
          website: creator.website,
          logo: creator.logo,
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
      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SaveCreator', res)
      return res
    } catch (e) {
      console.error('SaveCreator', e)
      return undefined
    }
  }

  const SaveAdministrator = async (
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
        issuer: signer.did, // TODO: issuerDid ? maybe creatorDid inputted in form
        issuanceDate: new Date().toISOString(), // TODO: new Date(now)?
        validFrom: new Date().toISOString(), // TODO: new Date(now)?
        expirationDate: '', //  TODO:
        credentialSubject: {
          id: process.env.REACT_APP_RELAYER_NODE,
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
      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SaveAdministrator', res)
      return res
    } catch (e) {
      console.error('SaveAdministrator', e)
      return undefined
    }
  }

  const SavePage = async (
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
      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SavePage', res)
      return res
    } catch (e) {
      console.error('SavePage', e)
      return undefined
    }
  }

  const SaveTags = async (
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
      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SaveTags', res)
      return res
    } catch (e) {
      console.error('SaveTags', e)
      return undefined
    }
  }

  const SaveQuestionJSON = async (
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
      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SaveQuestionJSON', res)
      return res
    } catch (e) {
      console.error('SaveQuestionJSON', e)
      return undefined
    }
  }

  const SaveClaim = async (
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
          headlineMetric: claim.isHeadlineMetric,
        }),
      )

      const res = await UploadDataToService(buff.toString('base64'), service)
      console.log('SaveClaim', res)
      return res
    } catch (e) {
      console.error('SaveClaim', e)
      return undefined
    }
  }

  return {
    SaveProfile,
    SaveCreator,
    SaveAdministrator,
    SavePage,
    SaveTags,
    SaveQuestionJSON,
    SaveClaim,
  }
}
