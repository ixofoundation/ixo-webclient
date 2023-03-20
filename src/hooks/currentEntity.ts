// import { QueryEntityResponse } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/query'
import { LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { TEntityModel } from 'api/blocksync/types/entities'
// import { GetEntity } from 'lib/protocol'
import {
  updateEntityAction,
  updateEntityAdministratorAction,
  updateEntityCreatorAction,
  updateEntityPageAction,
  updateEntityProfileAction,
  updateEntityTagsAction,
} from 'redux/currentEntity/currentEntity.actions'
import {
  selectEntityLinkedResource,
  selectEntityProfile,
  selectEntityCreator,
  selectEntityType,
  selectEntityAdministrator,
  selectEntityPage,
  selectEntityTags,
  selectEntityLinkedEntity,
} from 'redux/currentEntity/currentEntity.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { BlockSyncService } from 'services/blocksync'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityProfileModel,
} from 'types/protocol'
import { cellNodeChainMapping, chainNetwork } from './configs'

const bsService = new BlockSyncService()

export default function useCurrentEntity(): {
  entityType: string
  linkedResource: LinkedResource[]
  linkedEntity: LinkedEntity[]
  profile: TEntityProfileModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  page: TEntityPageModel
  tags: TEntityDDOTagModel[]
  updateEntity: (data: TEntityModel) => void
  updateEntityProfile: (profile: TEntityProfileModel) => void
  updateEntityCreator: (creator: TEntityCreatorModel) => void
  updateEntityAdministrator: (administrator: TEntityAdministratorModel) => void
  updateEntityPage: (page: TEntityPageModel) => void
  updateEntityTags: (tags: TEntityDDOTagModel[]) => void
  getEntityByDid: (did: string) => Promise<boolean>
} {
  const dispatch = useAppDispatch()
  const entitites: { [id: string]: TEntityModel } = useAppSelector((state) => state.entities.entities2)
  const entityType: string = useAppSelector(selectEntityType)!
  const linkedResource: LinkedResource[] = useAppSelector(selectEntityLinkedResource)!
  const linkedEntity: LinkedEntity[] = useAppSelector(selectEntityLinkedEntity)!
  const profile: TEntityProfileModel = useAppSelector(selectEntityProfile)!
  const creator: TEntityCreatorModel = useAppSelector(selectEntityCreator)!
  const administrator: TEntityAdministratorModel = useAppSelector(selectEntityAdministrator)!
  const page: TEntityPageModel = useAppSelector(selectEntityPage)!
  const tags: TEntityDDOTagModel[] = useAppSelector(selectEntityTags)!

  const updateEntity = (data: TEntityModel) => {
    dispatch(updateEntityAction(data))
  }

  const updateEntityProfile = (profile: TEntityProfileModel) => {
    dispatch(updateEntityProfileAction(profile))
  }
  const updateEntityCreator = (creator: TEntityCreatorModel) => {
    dispatch(updateEntityCreatorAction(creator))
  }
  const updateEntityAdministrator = (administrator: TEntityAdministratorModel) => {
    dispatch(updateEntityAdministratorAction(administrator))
  }
  const updateEntityPage = (page: TEntityPageModel) => {
    dispatch(updateEntityPageAction(page))
  }
  const updateEntityTags = (tags: TEntityDDOTagModel[]) => {
    dispatch(updateEntityTagsAction(tags))
  }

  const getEntityByDid = async (did: string): Promise<boolean> => {
    /**
     * find entity in entities state and avoid refetch from api
     */
    if (entitites && entitites[did]) {
      updateEntity(entitites[did])
      return true
    }
    return await bsService.entity.getEntityById(did).then((entity: any) => {
      const { settings, linkedResource } = entity
      linkedResource.concat(Object.values(settings)).forEach((item: LinkedResource) => {
        switch (item.id) {
          case '{id}#profile': {
            fetch(item.serviceEndpoint)
              .then((response) => response.json())
              .then((profile) => {
                updateEntityProfile(profile)
              })
              .catch(() => undefined)
            break
          }
          case '{id}#creator': {
            const [, ...paths] = item.serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.credentialSubject)
              .then((creator) => {
                updateEntityCreator(creator)
              })
              .catch(() => undefined)
            break
          }
          case '{id}#administrator': {
            const [, ...paths] = item.serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.credentialSubject)
              .then((administrator) => {
                updateEntityAdministrator(administrator)
              })
              .catch(() => undefined)
            break
          }
          case '{id}#page': {
            const [, ...paths] = item.serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.page)
              .then((page) => {
                updateEntityPage(page)
              })
              .catch(() => undefined)
            break
          }
          case '{id}#tags': {
            const [, ...paths] = item.serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((tags) => {
                updateEntityTags(tags)
              })
              .catch(() => undefined)
            break
          }
          default:
            break
        }
      })

      updateEntity(entity)
      return true
    })
  }

  return {
    entityType,
    linkedResource,
    linkedEntity,
    profile,
    creator,
    administrator,
    page,
    tags,
    getEntityByDid,
    updateEntity,
    updateEntityProfile,
    updateEntityCreator,
    updateEntityAdministrator,
    updateEntityPage,
    updateEntityTags,
  }
}
