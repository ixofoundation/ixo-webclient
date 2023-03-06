import { QueryEntityResponse } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/query'
import { GetEntity } from 'lib/protocol'
import { updateEntityAction } from 'redux/currentEntity/currentEntity.actions'
import { selectEntityType } from 'redux/currentEntity/currentEntity.selectors'
import { CurrentEntity } from 'redux/currentEntity/currentEntity.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

export default function useCurrentEntity(): {
  entityType: string
  updateEntity: (data: CurrentEntity) => void
  getEntityByDid: (did: string) => void
} {
  const dispatch = useAppDispatch()
  const entityType: string = useAppSelector(selectEntityType)!

  const updateEntity = (data: CurrentEntity) => {
    dispatch(updateEntityAction(data))
  }

  const getEntityByDid = (did: string) => {
    GetEntity({ id: did }).then((response: QueryEntityResponse | undefined) => {
      try {
        if (response) {
          const { entity, iidDocument } = response
          if (entity && iidDocument) {
            const entityType = entity.type

            const data: CurrentEntity = {
              entityType,
            }
            updateEntity(data)
          }
        }
      } catch (e) {
        console.error('getEntityByDid', e)
      }
    })
  }

  return {
    entityType,
    updateEntity,
    getEntityByDid,
  }
}
