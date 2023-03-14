import { QueryEntityResponse } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/query'
import { LinkedEntity, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { GetEntity } from 'lib/protocol'
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
import { CurrentEntity } from 'redux/currentEntity/currentEntity.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageModel,
  TEntityProfileModel,
} from 'types/protocol'

export default function useCurrentEntity(): {
  entityType: string
  linkedResource: LinkedResource[]
  linkedEntity: LinkedEntity[]
  profile: TEntityProfileModel
  creator: TEntityCreatorModel
  administrator: TEntityAdministratorModel
  page: TEntityPageModel
  tags: TEntityDDOTagModel[]
  updateEntity: (data: CurrentEntity) => void
  updateEntityProfile: (profile: TEntityProfileModel) => void
  updateEntityCreator: (creator: TEntityCreatorModel) => void
  updateEntityAdministrator: (administrator: TEntityAdministratorModel) => void
  updateEntityPage: (page: TEntityPageModel) => void
  updateEntityTags: (tags: TEntityDDOTagModel[]) => void
  getEntityByDid: (did: string) => Promise<boolean>
} {
  const dispatch = useAppDispatch()
  const entityType: string = useAppSelector(selectEntityType)!
  const linkedResource: LinkedResource[] = useAppSelector(selectEntityLinkedResource)!
  const linkedEntity: LinkedEntity[] = useAppSelector(selectEntityLinkedEntity)!
  const profile: TEntityProfileModel = useAppSelector(selectEntityProfile)!
  const creator: TEntityCreatorModel = useAppSelector(selectEntityCreator)!
  const administrator: TEntityAdministratorModel = useAppSelector(selectEntityAdministrator)!
  const page: TEntityPageModel = useAppSelector(selectEntityPage)!
  const tags: TEntityDDOTagModel[] = useAppSelector(selectEntityTags)!

  const updateEntity = (data: CurrentEntity) => {
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
    return await GetEntity({ id: did }).then((response: QueryEntityResponse) => {
      try {
        console.log('getEntityByDid', response)
        const { entity, iidDocument } = response
        if (!entity || !iidDocument) {
          throw new Error('Incorrect response type')
        }
        const { type, id: did, status, relayerNode, credentials, entityVerified, metadata } = entity

        const {
          context,
          controller,
          service,
          verificationMethod,
          authentication,
          assertionMethod,
          keyAgreement,
          capabilityInvocation,
          capabilityDelegation,
          linkedResource,
          linkedClaim,
          accordedRight,
          linkedEntity,
          alsoKnownAs,
        } = iidDocument

        const data: CurrentEntity = {
          did,
          type,
          status,
          relayerNode,
          credentials,
          entityVerified,
          metadata,
          context,
          controller,
          service,
          verificationMethod,
          authentication,
          assertionMethod,
          keyAgreement,
          capabilityInvocation,
          capabilityDelegation,
          linkedResource,
          linkedClaim,
          accordedRight,
          linkedEntity,
          alsoKnownAs,
        }
        updateEntity(data)
        return true
      } catch (e) {
        console.error('getEntityByDid', e)
        throw new Error(JSON.stringify(e))
      }
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
