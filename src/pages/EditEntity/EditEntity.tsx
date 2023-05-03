import EditEntityLayout from 'pages/CreateEntity/CreateEntityLayout/CreateEntityLayout'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initialState } from 'redux/createEntity/createEntity.reducer'
import { TCreateEntityState } from 'redux/createEntity/createEntity.types'
import EditDAO from './EditDAO/EditDAO'
import { useAccount } from 'hooks/account'
import { apiEntityToEntity } from 'utils/entities'
import { useWalletManager } from '@gssuper/cosmodal'
import { BlockSyncService } from 'services/blocksync'

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
  const { connect } = useWalletManager()
  const { address, cosmWasmClient } = useAccount()
  const [value, setValue] = useState<TCreateEntityState>(initialState)

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
      if (!cosmWasmClient) {
        connect()
      } else {
        bsService.entity.getEntityById(entityId).then((entity: any) => {
          apiEntityToEntity({ entity, cosmWasmClient, address }, handleUpdatePartial)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  return (
    <EditEntityContext.Provider value={{ ...value, update: handleUpdate, updatePartial: handleUpdatePartial }}>
      <EditEntityLayout title={value.title} subtitle={value.subtitle} breadCrumbs={value.breadCrumbs}>
        {Component && address && cosmWasmClient && <Component />}
      </EditEntityLayout>
    </EditEntityContext.Provider>
  )
}

export default EditEntity
