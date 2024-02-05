import { FlexBox } from 'components/App/App.styles'
import React, { useCallback, useMemo } from 'react'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { useGetOfferFormByClaimCollectionId } from 'graphql/entities'
import { errorToast, successToast } from 'utils/toast'
import { CellnodePublicResource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import { customQueries, ixo } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'
import { useAccount } from 'hooks/account'
import { AddLinkedResource } from 'lib/protocol'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useGetIid } from 'graphql/iid'
import { Typography } from 'components/Typography'
import { AgentRoles } from 'types/models'

interface Props {
  claimCollectionId: string
  agentRole: AgentRoles
}

const OfferForm: React.FC<Props> = ({ claimCollectionId, agentRole }) => {
  const { signingClient, signer } = useAccount()
  const offerQuestionForm = useGetOfferFormByClaimCollectionId(claimCollectionId)
  const { data: iid } = useGetIid(signer.did)
  const offerSent = useMemo(() => {
    const linkedResource: LinkedResource[] = iid?.linkedResource ?? []
    return linkedResource.some((v) => v.description.split('#')[0] === claimCollectionId)
  }, [iid, claimCollectionId])

  const handleSubmit = useCallback(
    async (answer: any): Promise<boolean> => {
      try {
        const data = JSON.stringify(answer)
        const uploadRes: CellnodePublicResource = await customQueries.cellnode.uploadPublicDoc(
          'application/ld+json',
          data,
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
        const res = await AddLinkedResource(signingClient, signer, { entityId: signer.did, linkedResource })
        if (res.code !== 0) {
          throw res.rawLog
        }

        successToast('Success', 'Submit successfully')
        return true
      } catch (e: any) {
        console.error(e)
        errorToast('Failed', typeof e === 'string' ? e : e.message)
        return false
      }
    },
    [agentRole, claimCollectionId, signer, signingClient],
  )

  const survey = useMemo(() => {
    if (!offerQuestionForm) {
      return undefined
    }
    const survey = new Model(offerQuestionForm)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerQuestionForm])

  if (offerSent) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>Offer sent</Typography>
      </FlexBox>
    )
  }

  return (
    <FlexBox $direction='column' width='100%' $gap={7}>
      {survey && <Survey model={survey} />}
    </FlexBox>
  )
}

export default OfferForm
