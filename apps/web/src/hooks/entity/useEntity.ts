import { LinkedClaim, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityQuery, useEntityQuery } from 'generated/graphql'
import { getCosmwasmClient } from 'lib/cosmWasmClient/cosmWasmClient'
import { RPC_ENDPOINT } from 'lib/protocol'
import { useState } from 'react'
import { updateEntityAction } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getCredentialSubject, getEntityProfile, getLinkedClaim, getPage, getTags } from 'services/entities'
import { EntityLinkedResourceConfig } from 'types/protocol'
import { getDaoContractInfo } from 'utils/dao'
import { getDAOGroupLinkedEntities } from 'utils/entities'

export const useEntity = (did: string) => {
  const entity = useAppSelector(getEntityById(did))
  const [linkedFiles, setLinkedFiles] = useState([])
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const updateOnCompleted = async (data: EntityQuery) => {
    if (data.entity?.service && data.entity.settings) {
      const service = data.entity.service
      const page = await getPage({ service, setting: data.entity.settings['Page'] })
      const profile = await getEntityProfile(data.entity.settings['Profile'], service)
      const creatorResource = data.entity.linkedResource.find((resource: any) => resource.id === '{id}#creator')
      const creator = await getCredentialSubject({ resource: creatorResource, service })
      const administratorResource = data.entity.linkedResource.find(
        (resource: any) => resource.id === '{id}#administrator',
      )
      const administrator = await getCredentialSubject({ resource: administratorResource, service })
      const files = data.entity?.linkedResource?.filter((item: LinkedResource) =>
        Object.keys(EntityLinkedResourceConfig).includes(item.type),
      )
      const linkedClaims = await Promise.all(
        data.entity.linkedClaim.map((claim: LinkedClaim) => getLinkedClaim({ claim, service })),
      )
      const tags = await getTags({ service, setting: data.entity.settings['Tags'] })
      const claim = linkedClaims.reduce((acc, item) => ({ ...acc, ...item }), {})

      const cwClient = await getCosmwasmClient(RPC_ENDPOINT ?? '')

      const groups = await Promise.all(
        getDAOGroupLinkedEntities(data.entity.linkedEntity).map(async (item: LinkedEntity) => {
          const { id } = item
          const [, coreAddress] = id.split('#')
          const daoContractInfo = await getDaoContractInfo({ coreAddress, cwClient })

          return { [daoContractInfo.coreAddress]: daoContractInfo }
        }),
      )

      const daoGroups = groups.reduce((acc, item) => ({ ...acc, ...item }), {}) as any

      setLinkedFiles(files)

      dispatch(
        updateEntityAction({
          ...data.entity,
          ...entity,
          ...page,
          profile,
          creator,
          claim,
          daoGroups,
          tags,
          administrator,
        }),
      )
    }
  }

  const { refetch: refetchEntityQuery } = useEntityQuery({
    variables: { id: did },
    //  set a poll interval for every 30 seconds
    pollInterval: 30000,
    onCompleted: async (data) => {
      await updateOnCompleted(data)
    },
  })

  const refetch = async () => {
    setLoading(true)
    const data = await refetchEntityQuery({ id: did })
    await updateOnCompleted(data.data)
    setLoading(false)
  }

  return { ...entity, refetch, linkedFiles, loading }
}
