import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useEntityQuery } from 'generated/graphql'
import { useState } from 'react'
import { cloneProtocol } from 'redux/createFlow/slice'
import { useAppDispatch } from 'redux/hooks'
import { getLinkedResource } from 'services'

export const useProtocolInheritance = ({ protocolId }: { protocolId: string }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  useEntityQuery({
    variables: {
      id: protocolId,
    },
    onCompleted: async ({ entity }) => {
      console.log({ entity })
      setLoading(true)
      const mergeLinkedResourcesAndSettings = entity?.linkedResource.concat(Object.values(entity.settings))
      const populatedResources = await Promise.all(
        mergeLinkedResourcesAndSettings.map(async (resource: LinkedResource) => {
          return {
            ...resource,
            data: await getLinkedResource({ resource, service: entity?.service }),
          }
        }),
      )
      console.log({
        type: entity?.type ?? '',
        linkedResource: populatedResources ?? [],
        startDate: entity?.startDate ?? '',
        endDate: entity?.endDate ?? '',
        entityStatus: entity?.status ?? 0,
        linkedClaim: entity?.linkedClaim ?? [],
        linkedEntity: entity?.linkedEntity ?? [],
        accordedRight: entity?.accordedRight ?? [],
        service: entity?.service ?? [],
        relayerNode: entity?.relayerNode ?? '',
        ownerAddress: entity?.owner ?? '',
        ownerDid: '',
        controller: entity?.controller ?? [],
        verification: entity?.verificationMethod ?? [],
        context: entity?.context ?? [],
      })

      dispatch(
        cloneProtocol({
          type: entity?.type ?? '',
          linkedResource: populatedResources ?? [],
          startDate: entity?.startDate ?? '',
          endDate: entity?.endDate ?? '',
          entityStatus: entity?.status ?? 0,
          linkedClaim: entity?.linkedClaim ?? [],
          linkedEntity: entity?.linkedEntity ?? [],
          accordedRight: entity?.accordedRight ?? [],
          service: entity?.service ?? [],
          relayerNode: entity?.relayerNode ?? '',
          ownerAddress: entity?.owner ?? '',
          ownerDid: '',
          controller: entity?.controller ?? [],
          verification: entity?.verificationMethod ?? [],
          context: entity?.context ?? [],
          daoController: '',
        }),
      )
      setLoading(false)
    },
    onError: () => {
      setLoading(false)
    },
  })

  return { loading }
}
