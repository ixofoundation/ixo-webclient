import type { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { LinkedClaim, LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useEntityQuery } from 'generated/graphql'
import { getCosmwasmClient } from 'lib/cosmWasmClient/cosmWasmClient'
import { RPC_ENDPOINT } from 'lib/protocol'
import { useCallback, useMemo, useState } from 'react'
import { updateEntityAction } from 'redux/entities/entities.actions'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getCredentialSubject, getEntityProfile, getLinkedClaim, getPage } from 'services/entities'
import { EntityLinkedResourceConfig } from 'types/protocol'
import { getDaoContractInfo } from 'utils/dao'
import { getDAOGroupLinkedEntities } from 'utils/entities'

export const useEntityOverview = (did?: string) => {
  const entity = useAppSelector(getEntityById(did ?? ''))
  const [linkedFiles, setLinkedFiles] = useState<LinkedResource[]>([])
  const dispatch = useAppDispatch()

  const processEntityData = useCallback(
    async (data: any) => {
      if (!data.entity?.service || !data.entity.settings) return

      const { service, settings, linkedResource, linkedClaim, linkedEntity } = data.entity

      const [page, profile, creator, files, linkedClaims, cwClient] = await Promise.all([
        getPage({ service, setting: settings['Page'] }),
        getEntityProfile(settings['Profile'], service),
        getCredentialSubject({
          resource: linkedResource.find((resource: any) => resource.id === '{id}#creator'),
          service,
        }),
        Promise.resolve(
          linkedResource?.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type)),
        ),
        Promise.all(linkedClaim.map((claim: LinkedClaim) => getLinkedClaim({ claim, service }))),
        getCosmwasmClient(RPC_ENDPOINT ?? ''),
      ])

      const claim = linkedClaims.reduce((acc, item) => ({ ...acc, ...item }), {})

      const daoGroups = await processDAOGroups(linkedEntity, cwClient)

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
        }),
      )
    },
    [dispatch, entity],
  )

  const { refetch } = useEntityQuery({
    variables: { id: did! },
    onCompleted: processEntityData,
    skip: !did,
  })

  return useMemo(() => ({ ...entity, refetch, linkedFiles }), [entity, refetch, linkedFiles])
}

const processDAOGroups = async (linkedEntity: LinkedEntity[], cwClient: CosmWasmClient) => {
  const groups = await Promise.all(
    getDAOGroupLinkedEntities(linkedEntity)
      .map(async (item: LinkedEntity) => {
        const { id } = item
        const [, coreAddress] = id.split('#')
        if (!coreAddress) return null

        const daoContractInfo = await getDaoContractInfo({ coreAddress, cwClient })
        return { [daoContractInfo.coreAddress]: daoContractInfo }
      })
      .filter((item): item is Promise<{ [key: string]: any }> => item !== null),
  )
  return groups.reduce((acc, item) => ({ ...acc, ...item }), {})
}
