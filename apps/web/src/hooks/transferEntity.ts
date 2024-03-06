import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  updateBreadCrumbsAction,
  updateRecipientDidAction,
  updateSubtitleAction,
  updateTitleAction,
} from 'redux/transferEntity/transferEntity.actions'
import {
  selectTransferEntityBreadCrumbs,
  selectTransferEntityRecipientDid,
  selectTransferEntitySubtitle,
  selectTransferEntityTitle,
} from 'redux/transferEntity/transferEntity.selectors'
import { chainNetwork } from './configs'
import { LinkedResource, VerificationMethod } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'
import { CheckIidDoc, CreateIidDocForGroup, GetAddLinkedResourcePayload, TransferEntityMessage, UpdateEntityMessage, fee } from 'lib/protocol'
import { useAccount } from './account'
import { useWallet } from '@ixo-webclient/wallet-connector'

export function useTransferEntityState() {
  const dispatch = useAppDispatch()
  const { signer } = useAccount()
  const { execute } = useWallet()

  const breadCrumbs: { text: string; link?: string }[] = useAppSelector(selectTransferEntityBreadCrumbs)
  const title: string = useAppSelector(selectTransferEntityTitle)
  const subtitle: string = useAppSelector(selectTransferEntitySubtitle)
  const recipientDid: string = useAppSelector(selectTransferEntityRecipientDid)

  const updateBreadCrumbs = (breadCrumbs: { text: string; link?: string }[]): void => {
    dispatch(updateBreadCrumbsAction(breadCrumbs))
  }
  const updateTitle = (title: string): void => {
    dispatch(updateTitleAction(title))
  }
  const updateSubtitle = (subtitle: string): void => {
    dispatch(updateSubtitleAction(subtitle))
  }
  const updateRecipientDid = (recipientDid: string): void => {
    dispatch(updateRecipientDidAction(recipientDid))
  }

  const handleTransfer = async ({ reEnableKeys, keys, entityId }: { reEnableKeys: boolean, keys: Array<VerificationMethod & { description?: string }>, entityId: string }) => {
    const getDocumentPayload = async ({ reEnableKeys, keys, entityId }: { reEnableKeys: boolean, keys: Array<VerificationMethod & { description?: string }>, entityId: string }) => {
      try {
        const payload = {
          reEnableKeys,
          keys,
        }
        const buff = Buffer.from(JSON.stringify(payload))
        const res = await customQueries.cellnode.uploadWeb3Doc(
          utils.common.generateId(12),
          'application/ld+json',
          buff.toString('base64'),
          undefined,
          chainNetwork,
        )

        const linkedResource: LinkedResource = {
          id: '{id}#verificationMethods',
          type: 'VerificationMethods',
          description: 'Verification Methods',
          mediaType: 'application/ld+json',
          serviceEndpoint: LinkedResourceServiceEndpointGenerator(res),
          proof: LinkedResourceProofGenerator(res),
          encrypted: 'false',
          right: '',
        }

        const addLinkedResourceMessagePayload = GetAddLinkedResourcePayload(entityId, signer, linkedResource)
        return addLinkedResourceMessagePayload.messages
      } catch (error) {
        console.error('getDocumentPayload', error)
        throw error
      }
    }
    const getStatusToTransferredPayload = async ({ entityId }: { entityId: string }) => {
      try {
        const transactionData = await UpdateEntityMessage(signer, { id: entityId, entityStatus: 2 })
        return transactionData.messages
      } catch (error) {
        console.error('getStatusToTransferredPayload', error)
        throw error
      }
    }

    const getSigningTransferPayload = async ({ entityId, recipientDid }: { entityId: string, recipientDid: string }) => {
      try {
        const signingTransferMessages = []
        if (!entityId || !recipientDid) {
          // eslint-disable-next-line no-throw-literal
          throw 'EntityId or RecipientDid is invalid'
        }
        if (!(await CheckIidDoc(recipientDid))) {
          const createIidDocForGroupPayload = CreateIidDocForGroup(signer, recipientDid)
          signingTransferMessages.push(...createIidDocForGroupPayload.messages)
        }
        const transactionData = TransferEntityMessage(signer, { id: entityId, recipientDid })
        signingTransferMessages.push(...transactionData.messages)

        return signingTransferMessages
      } catch (error) {
        console.error('getSigningTransferPayload', error)
        throw error
      }
    }

    if (!reEnableKeys) {
      const signingTransferPayload = await getSigningTransferPayload({ entityId, recipientDid })

      const transferPayload = [...signingTransferPayload]
      return await execute({ messages: transferPayload, fee: fee, memo: undefined })
    }

    const createDocumentPayload = await getDocumentPayload({ reEnableKeys, keys, entityId })
    const updateStatusToTransferredPayload = await getStatusToTransferredPayload({ entityId })
    const signingTransferPayload = await getSigningTransferPayload({ entityId, recipientDid })

    const transferPayload = [...createDocumentPayload, ...updateStatusToTransferredPayload, ...signingTransferPayload]
    return await execute({ messages: transferPayload, fee: fee, memo: undefined })
  }

  return {
    breadCrumbs,
    title,
    subtitle,
    recipientDid,
    updateBreadCrumbs,
    updateTitle,
    updateSubtitle,
    updateRecipientDid,
    handleTransfer
  }
}
