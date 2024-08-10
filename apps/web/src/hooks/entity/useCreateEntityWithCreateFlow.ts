import { useWallet } from '@ixo-webclient/wallet-connector'
import { customMessages, utils } from '@ixo/impactxclient-sdk'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { fee } from 'lib/protocol'
import { initialCellnodeService, initialIpfsService } from 'redux/createEntity/createEntity.reducer'
import { useAppSelector } from 'redux/hooks'
import { uploadToService } from 'services'
import { hexToUint8Array } from 'utils/encoding'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'

export const useCreateEntityWithCreateFlow = () => {
  const { execute, wallet } = useWallet()
  const entity = useAppSelector((state) => state.createFlow)

  const uploadLinkedResources = async (linkedResources: (LinkedResource & { data?: any })[]) => {
    const linkedResourcesToUpload = linkedResources.filter(
      (linkedResource) => !linkedResource.proof || linkedResource.proof === '',
    )

    if (linkedResourcesToUpload.length === 0) {
      return linkedResources.map(({ data, ...rest }) => rest)
    }

    const uploadedResources = await Promise.all(
      linkedResourcesToUpload.map(async (linkedResource) => {
        const service = linkedResource.serviceEndpoint?.includes('cellnode')
          ? initialCellnodeService
          : initialIpfsService

        const buff = Buffer.from(JSON.stringify(linkedResource.data))

        const resource = await uploadToService(buff.toString('base64'), service)

        return {
          ...linkedResource,
          serviceEndpoint: LinkedResourceServiceEndpointGenerator(resource!, service),
          proof: LinkedResourceProofGenerator(resource!, service),
        }
      }),
    )

    const updatedLinkedResources = linkedResources.map((resource) => {
      const uploadedResource = uploadedResources.find((uploaded) => uploaded.id === resource.id)
      return uploadedResource || resource
    })

    return updatedLinkedResources.map(({ data, ...rest }) => rest)
  }

  const determineEntityType = (type: string) => {
    if (
      type === 'protocol/project' ||
      type === 'protocol/oracle' ||
      type === 'protocol/dao' ||
      type === 'protocol/investment' ||
      type === 'protocol/asset'
    ) {
      return type.split('/').pop()
    }

    return type
  }

  const signCreateEntityTransaction = async () => {
    if (!wallet) {
      throw new Error('Wallet is not connected')
    }
    console.log({ resources: entity.linkedResource })

    console.log({ entityOnSign: { ...entity, linkedResource: await uploadLinkedResources(entity.linkedResource) } })
    console.log(wallet)

    const hexPubKey = hexToUint8Array(wallet.pubKey as unknown as string)

    const message = {
      typeUrl: '/ixo.entity.v1beta1.MsgCreateEntity',
      value: {
        ...entity,
        verification: [
          ...customMessages.iid.createIidVerificationMethods({
            did: wallet.did,
            pubkey: hexPubKey,
            address: wallet.address,
            controller: wallet.did,
            type: 'secp',
          }),
        ],
        ownerDid: wallet.did,
        controller: [wallet.did],
        startDate: entity.startDate ? utils.proto.toTimestamp(new Date(entity.startDate)) : undefined,
        endDate: entity.endDate ? utils.proto.toTimestamp(new Date(entity.endDate)) : undefined,
        entityType: determineEntityType(entity.type),
        linkedResource: await uploadLinkedResources(entity.linkedResource),
      },
    }

    const transactionResponse = await execute({
      data: { messages: [message], fee: fee, memo: '' },
    })

    return transactionResponse
  }

  return { signCreateEntityTransaction }
}
