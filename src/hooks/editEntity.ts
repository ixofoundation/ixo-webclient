import { EncodeObject } from '@cosmjs/proto-signing'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { TEntityModel } from 'api/blocksync/types/entities'
import BigNumber from 'bignumber.js'
import {
  fee,
  GetAddLinkedEntityMsgs,
  GetAddLinkedResourceMsgs,
  GetDeleteLinkedEntityMsgs,
  GetDeleteLinkedResourceMsgs,
  GetReplaceLinkedResourceMsgs,
  GetUpdateStartAndEndDateMsgs,
} from 'lib/protocol'
import { setEditedFieldAction, setEditEntityAction } from 'redux/editEntity/editEntity.actions'
import { selectEditEntity } from 'redux/editEntity/editEntity.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'
import { useAccount } from './account'
import { useCreateEntity } from './createEntity'
import useCurrentEntity from './currentEntity'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import { ixo, utils } from '@ixo/impactxclient-sdk'
import { EntityLinkedResourceConfig, TDAOGroupModel } from 'types/protocol'

export default function useEditEntity(): {
  editEntity: TEntityModel
  setEditedField: (key: string, value: any, merge?: boolean) => void
  setEditEntity: (editEntity: TEntityModel) => void
  ExecuteEditEntity: () => Promise<DeliverTxResponse>
} {
  const dispatch = useAppDispatch()

  const { signer, signingClient } = useAccount()
  const editEntity: TEntityModel = useAppSelector(selectEditEntity)
  const { currentEntity } = useCurrentEntity()
  const { SaveProfile, SaveAdministrator, SavePage, SaveTags } = useCreateEntity()
  const cellnodeService = editEntity?.service && editEntity?.service[0]

  const setEditedField = (key: string, value: any, merge = false) => {
    dispatch(setEditedFieldAction({ key, data: value, merge }))
  }

  const setEditEntity = (editEntity: TEntityModel) => {
    dispatch(setEditEntityAction(editEntity))
  }

  const getEditedStartAndEndDateMsgs = async (): Promise<readonly EncodeObject[]> => {
    if (
      JSON.stringify({ startDate: editEntity.startDate, endDate: editEntity.endDate }) ===
      JSON.stringify({ startDate: currentEntity.startDate, endDate: currentEntity.endDate })
    ) {
      return []
    }

    const messages: readonly EncodeObject[] = GetUpdateStartAndEndDateMsgs({
      id: editEntity.id,
      startDate: editEntity.startDate
        ? utils.proto.toTimestamp(new Date(editEntity.startDate as unknown as string))
        : undefined,
      endDate: editEntity.endDate
        ? utils.proto.toTimestamp(new Date(editEntity.endDate as unknown as string))
        : undefined,
      controllerDid: signer.did,
      controllerAddress: signer.address,
    })
    return messages
  }

  const getEditedProfileMsgs = async (): Promise<readonly EncodeObject[]> => {
    if (JSON.stringify(editEntity.profile) === JSON.stringify(currentEntity.profile)) {
      return []
    }

    const res = await SaveProfile(editEntity.profile)
    if (!res) {
      throw new Error('Save Profile failed!')
    }

    const newLinkedResource: LinkedResource = {
      id: '{id}#profile',
      type: 'Settings',
      description: 'Profile',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(res, cellnodeService),
      proof: LinkedResourceProofGenerator(res, cellnodeService),
      encrypted: 'false',
      right: '',
    }

    const messages: readonly EncodeObject[] = GetReplaceLinkedResourceMsgs(editEntity.id, signer, newLinkedResource)
    return messages
  }

  const getEditedAdministratorMsgs = async (): Promise<readonly EncodeObject[]> => {
    if (JSON.stringify(editEntity.administrator) === JSON.stringify(currentEntity.administrator)) {
      return []
    }

    const res = await SaveAdministrator(editEntity.administrator!)
    if (!res) {
      throw new Error('Save Administrator failed!')
    }

    const newLinkedResource: LinkedResource = {
      id: '{id}#administrator',
      type: 'VerifiableCredential',
      description: 'Administrator',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(res, cellnodeService),
      proof: LinkedResourceProofGenerator(res, cellnodeService),
      encrypted: 'false',
      right: '',
    }

    const messages: readonly EncodeObject[] = GetReplaceLinkedResourceMsgs(editEntity.id, signer, newLinkedResource)
    return messages
  }

  const getEditedPageMsgs = async (): Promise<readonly EncodeObject[]> => {
    if (JSON.stringify(editEntity.page) === JSON.stringify(currentEntity.page)) {
      return []
    }

    const res = await SavePage(Object.fromEntries((editEntity.page ?? []).map((v) => [v.id, v])))
    if (!res) {
      throw new Error('Save Page Content failed!')
    }

    const newLinkedResource: LinkedResource = {
      id: '{id}#page',
      type: 'Settings',
      description: 'Page',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(res, cellnodeService),
      proof: LinkedResourceProofGenerator(res, cellnodeService),
      encrypted: 'false',
      right: '',
    }

    const messages: readonly EncodeObject[] = GetReplaceLinkedResourceMsgs(editEntity.id, signer, newLinkedResource)
    return messages
  }

  const getEditedTagsMsgs = async (): Promise<readonly EncodeObject[]> => {
    if (JSON.stringify(editEntity.tags) === JSON.stringify(currentEntity.tags)) {
      return []
    }

    const res = await SaveTags(editEntity.tags ?? [])
    if (!res) {
      throw new Error('Save Tags failed!')
    }

    const newLinkedResource: LinkedResource = {
      id: '{id}#tags',
      type: 'Settings',
      description: 'Tags',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(res, cellnodeService),
      proof: LinkedResourceProofGenerator(res, cellnodeService),
      encrypted: 'false',
      right: '',
    }

    const messages: readonly EncodeObject[] = GetReplaceLinkedResourceMsgs(editEntity.id, signer, newLinkedResource)
    return messages
  }

  const getEditedLinkedFilesMsgs = async (): Promise<readonly EncodeObject[]> => {
    const editedLinkedFiles = editEntity.linkedResource.filter((item: LinkedResource) =>
      Object.keys(EntityLinkedResourceConfig).includes(item.type),
    )
    const currentLinkedFiles = currentEntity.linkedResource.filter((item: LinkedResource) =>
      Object.keys(EntityLinkedResourceConfig).includes(item.type),
    )
    if (JSON.stringify(editedLinkedFiles) === JSON.stringify(currentLinkedFiles)) {
      return []
    }

    const diffLinkedFiles = [
      ...editedLinkedFiles.filter(
        (item: LinkedResource) =>
          !currentLinkedFiles.map((item: LinkedResource) => JSON.stringify(item)).includes(JSON.stringify(item)),
      ),
      ...currentLinkedFiles
        .filter(
          (item: LinkedResource) =>
            !editedLinkedFiles.map((item: LinkedResource) => JSON.stringify(item)).includes(JSON.stringify(item)),
        )
        .filter((item: LinkedResource) => !editedLinkedFiles.some((v) => v.id === item.id)),
    ]

    const messages: readonly EncodeObject[] = diffLinkedFiles.reduce(
      (acc: EncodeObject[], cur: LinkedResource) => [
        ...acc,
        ...(currentLinkedFiles.some((item: LinkedResource) => item.id === cur.id)
          ? editedLinkedFiles.some((item: LinkedResource) => item.id === cur.id)
            ? GetReplaceLinkedResourceMsgs(editEntity.id, signer, cur)
            : GetDeleteLinkedResourceMsgs(editEntity.id, signer, cur)
          : GetAddLinkedResourceMsgs(editEntity.id, signer, cur)),
      ],
      [],
    )

    return messages
  }

  const getEditedGroupsMsgs = async (): Promise<readonly EncodeObject[]> => {
    const editedGroups = Object.values(editEntity.daoGroups ?? {})
    const currentGroups = Object.values(currentEntity.daoGroups ?? {})
    if (JSON.stringify(editedGroups) === JSON.stringify(currentGroups)) {
      return []
    }

    const addedGroups = editedGroups.filter(
      (item: TDAOGroupModel) =>
        !currentGroups.map((item: TDAOGroupModel) => JSON.stringify(item)).includes(JSON.stringify(item)),
    )

    const deletedGroups = currentGroups.filter(
      (item: TDAOGroupModel) =>
        !editedGroups.map((item: TDAOGroupModel) => JSON.stringify(item)).includes(JSON.stringify(item)),
    )

    const messages: readonly EncodeObject[] = [
      ...addedGroups.reduce(
        (acc: EncodeObject[], cur: TDAOGroupModel) => [
          ...acc,
          ...GetAddLinkedEntityMsgs(
            editEntity.id,
            signer,
            ixo.iid.v1beta1.LinkedEntity.fromPartial({
              id: `{id}#${cur.coreAddress}`,
              type: 'Group',
              relationship: 'subsidiary',
              service: '',
            }),
          ),
        ],
        [],
      ),
      ...deletedGroups.reduce(
        (acc: EncodeObject[], cur: TDAOGroupModel) => [
          ...acc,
          ...GetDeleteLinkedEntityMsgs(
            editEntity.id,
            signer,
            ixo.iid.v1beta1.LinkedEntity.fromPartial({
              id: `{id}#${cur.coreAddress}`,
              type: 'Group',
              relationship: 'subsidiary',
              service: '',
            }),
          ),
        ],
        [],
      ),
    ]

    return messages
  }

  const getEditedMsgs = async (): Promise<readonly EncodeObject[]> => {
    return [
      ...(await getEditedStartAndEndDateMsgs()),
      ...(await getEditedProfileMsgs()),
      ...(await getEditedAdministratorMsgs()),
      ...(await getEditedPageMsgs()),
      ...(await getEditedTagsMsgs()),
      ...(await getEditedLinkedFilesMsgs()),
      ...(await getEditedGroupsMsgs()),
    ]
  }

  const ExecuteEditEntity = async (): Promise<DeliverTxResponse> => {
    const messages = await getEditedMsgs()

    if (messages.length === 0) {
      throw new Error('Nothing to update')
    }

    console.log('ExecuteEditEntity', { messages })

    const updatedFee = { ...fee, gas: new BigNumber(fee.gas).times(messages.length).toString() }
    const response = await signingClient.signAndBroadcast(signer.address, messages, updatedFee)

    console.log('ExecuteEditEntity', { response })

    return response
  }

  return {
    editEntity,
    setEditedField,
    setEditEntity,
    ExecuteEditEntity,
  }
}
