import { v4 as uuidv4 } from 'uuid'
import { LinkedEntity, LinkedResource, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import EditEntityLayout from 'pages/CreateEntity/CreateEntityLayout/CreateEntityLayout'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initialState } from 'redux/createEntity/createEntity.reducer'
import { TCreateEntityState } from 'redux/createEntity/createEntity.types'
import { BlockSyncService } from 'services/blocksync'
import { NodeType } from 'types/entities'
import EditDAO from './EditDAO/EditDAO'
import { useAccount } from 'hooks/account'
import { TEntityServiceModel } from 'types/protocol'

const bsService = new BlockSyncService()

export const EditEntityContext = createContext<
  {
    update: (entity: TCreateEntityState) => void
    updatePartial: (key: string, value: any, merge?: boolean) => void
  } & TCreateEntityState
>({
  ...initialState,
  update: () => '',
  updatePartial: () => '',
})

const EditEntity: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { address, cosmWasmClient } = useAccount()
  const [value, setValue] = useState<TCreateEntityState>(initialState)

  console.log(1111, { value })

  const handleUpdate = useCallback((entity: TCreateEntityState) => {
    setValue(entity)
  }, [])

  const handleUpdatePartial = useCallback((key: string, value: any, merge = false) => {
    setValue((pre) => ({ ...pre, [key]: merge ? { ...pre[key], ...value } : value }))
  }, [])

  const Component = useMemo(() => {
    if (value.entityType === 'dao') {
      return EditDAO
    }
    return undefined
  }, [value.entityType])

  useEffect(() => {
    if (entityId) {
      bsService.entity.getEntityById(entityId).then((entity: any) => {
        console.log('getEntityById', { entity })

        const { type, settings, linkedResource, service, linkedEntity } = entity
        linkedResource.concat(Object.values(settings)).forEach((item: LinkedResource) => {
          let url = ''
          const [identifier, key] = item.serviceEndpoint.split(':')
          const usedService: Service | undefined = service.find((item: any) => item.id === `{id}#${identifier}`)

          if (usedService && usedService.type === NodeType.Ipfs) {
            url = `https://${key}.ipfs.w3s.link`
          } else if (usedService && usedService.type === NodeType.CellNode) {
            url = `${usedService.serviceEndpoint}${key}`
          }

          if (item.proof && url) {
            switch (item.id) {
              case '{id}#profile': {
                fetch(url)
                  .then((response) => response.json())
                  .then((profile) => {
                    console.log({ profile })
                    handleUpdatePartial('metadata', profile)
                  })
                  .catch(() => undefined)
                break
              }
              case '{id}#creator': {
                fetch(url)
                  .then((response) => response.json())
                  .then((response) => response.credentialSubject)
                  .then((creator) => {
                    console.log({ creator })
                    handleUpdatePartial('creator', creator)
                  })
                  .catch(() => undefined)
                break
              }
              case '{id}#administrator': {
                fetch(url)
                  .then((response) => response.json())
                  .then((response) => response.credentialSubject)
                  .then((administrator) => {
                    console.log({ administrator })
                    handleUpdatePartial('administrator', administrator)
                  })
                  .catch(() => undefined)
                break
              }
              case '{id}#page': {
                fetch(url)
                  .then((response) => response.json())
                  .then((response) => response.page)
                  .then((page) => {
                    console.log({ page })
                    handleUpdatePartial('page', page)
                  })
                  .catch(() => undefined)
                break
              }
              case '{id}#tags': {
                fetch(url)
                  .then((response) => response.json())
                  .then((response) => response.ddoTags)
                  .then((tags) => {
                    console.log({ tags })
                    handleUpdatePartial('ddoTags', tags)
                  })
                  .catch(() => undefined)
                break
              }
              default:
                break
            }
          }
        })

        handleUpdatePartial('entityType', type)
        handleUpdatePartial(
          'linkedEntity',
          Object.fromEntries(linkedEntity.map((item: LinkedEntity) => [uuidv4(), item])),
        )
        handleUpdatePartial(
          'service',
          service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
        )
      })
    }
  }, [entityId, handleUpdatePartial])

  useEffect(() => {
    if (!address) {
      console.error('EditEntity', { address })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <EditEntityContext.Provider value={{ ...value, update: handleUpdate, updatePartial: handleUpdatePartial }}>
      <EditEntityLayout title={value.title} subtitle={value.subtitle} breadCrumbs={value.breadCrumbs}>
        {Component && address && cosmWasmClient && <Component />}
      </EditEntityLayout>
    </EditEntityContext.Provider>
  )
}

export default EditEntity
