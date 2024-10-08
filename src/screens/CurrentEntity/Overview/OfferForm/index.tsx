import { DeliverTxResponse } from '@cosmjs/stargate'
import { useWallet } from 'wallet-connector'
import { customQueries, ixo } from '@ixo/impactxclient-sdk'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { CellnodePublicResource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import { Skeleton } from '@mantine/core'
import { FlexBox } from 'components/CoreEntry/App.styles'
import ClaimApplicationError from 'components/ErrorPages/ClaimApplicationError'
import { Typography } from 'components/Typography'
import { useGetIid } from 'graphql/iid'
import { useAccount } from 'hooks/account'
import { useClaimApplicationForm } from 'hooks/claims/useClaimApplicationForm'
import { chainNetwork } from 'hooks/configs'
import { GetAddLinkedResourcePayload } from 'lib/protocol'
import React, { useCallback, useMemo } from 'react'
import { themeJson } from 'styles/surveyTheme'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { AgentRoles } from 'types/models'
import { errorToast, successToast } from 'utils/toast'

interface Props {
  claimCollectionId: string
  agentRole: AgentRoles
}

const OfferForm: React.FC<Props> = ({ claimCollectionId, agentRole }) => {
  const { signer } = useAccount()
  const { status, claimApplicationForm, error } = useClaimApplicationForm({ collectionId: claimCollectionId })
  const { data: iid } = useGetIid(signer.did)
  const offerSent = useMemo(() => {
    const linkedResource: LinkedResource[] = iid?.linkedResource ?? []
    return linkedResource.some(
      (v) =>
        v.id === `{id}#offer#${claimCollectionId}` &&
        v.type === 'DeedOffer' &&
        v.description.split('#')[0] === claimCollectionId,
    )
  }, [iid, claimCollectionId])
  const { execute, close } = useWallet()

  const handleSubmit = useCallback(
    async (answer: any): Promise<boolean> => {
      try {
        const data = JSON.stringify(answer)
        const uploadRes: CellnodePublicResource = await customQueries.cellnode.uploadPublicDoc(
          'application/ld+json',
          Buffer.from(data).toString('base64'),
          undefined,
          chainNetwork,
        )

        const linkedResource: LinkedResource = ixo.iid.v1beta1.LinkedResource.fromPartial({
          id: `{id}#offer#${claimCollectionId}`,
          type: 'DeedOffer',
          proof: uploadRes.key,
          right: '',
          encrypted: 'false',
          mediaType: 'application/ld+json',
          description: `${claimCollectionId}#${agentRole}`,
          serviceEndpoint: uploadRes.url,
        })
        const addLinkedResourcePayload = GetAddLinkedResourcePayload(signer.did, signer, linkedResource)

        const response = (await execute({
          data: addLinkedResourcePayload as any,
          transactionConfig: { sequence: 1 },
        })) as unknown as DeliverTxResponse

        if (response.code === 0) {
          close()
          successToast('Success', 'Successfully submitted!')
          return true
        }
        return false
      } catch (e: any) {
        console.error(e)
        errorToast('Failed', typeof e === 'string' ? e : e.message)
        return false
      }
    },
    [agentRole, claimCollectionId, signer, execute, close],
  )

  const survey = useMemo(() => {
    if (!claimApplicationForm) {
      return undefined
    }
    const survey = new Model(claimApplicationForm)
    survey.applyTheme(themeJson)
    survey.allowCompleteSurveyAutomatic = false

    function preventComplete(sender: any, options: any) {
      options.allowComplete = false
      postResults(sender)
    }

    async function postResults(sender: any) {
      survey.onCompleting.remove(preventComplete)

      survey.completeText = 'Submitting...'
      const response = await handleSubmit(sender.data)
      if (response) {
        sender.doComplete()
      } else {
        survey.completeText = 'Try again'
        survey.onCompleting.add(preventComplete)
      }
    }

    survey.onCompleting.add(preventComplete)
    survey.completeText = 'Submit'
    return survey
  }, [claimApplicationForm, handleSubmit])

  if (offerSent) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>Offer sent</Typography>
      </FlexBox>
    )
  }

  if (status === 'loading') return <Skeleton visible w={'100%'} height={200} />

  if (status === 'error') return <ClaimApplicationError error={error} />

  return (
    <FlexBox $direction='column' width='100%' $gap={7}>
      {survey && <Survey model={survey} />}
    </FlexBox>
  )
}

export default OfferForm
