import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/App/App.styles'
import { useSigner } from 'hooks/account'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { MsgExecAgentSubmit } from 'lib/protocol'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { TEntityClaimModel } from 'types/entities'
import { serviceEndpointToUrl } from 'utils/entities'
import { errorToast, successToast } from 'utils/toast'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { customQueries } from '@ixo/impactxclient-sdk'
import { selectEntityClaim } from 'redux/currentEntity/currentEntity.selectors'
import { useGetClaimCollectionByEntityIdAndClaimTemplateId } from 'graphql/claims'
import { useGetEntityById } from 'graphql/entities'
import { CellnodePublicResource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'
import { chainNetwork } from 'hooks/configs'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { DeliverTxResponse } from '@cosmjs/stargate'

interface Props {
  claimId: string
}

const ClaimForm: React.FC<Props> = ({ claimId }) => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const signer = useSigner()
  
  const claim: { [id: string]: TEntityClaimModel } = useAppSelector(selectEntityClaim)

  const { execute } = useWallet()
 
  const adminAddress = useCurrentEntityAdminAccount()
  const selectedClaim: TEntityClaimModel = claim[claimId]

  const [templateEntityId] = (selectedClaim?.template?.id ?? '').split('#')
  const { data: templateEntity } = useGetEntityById(templateEntityId)

  const claimCollection = useGetClaimCollectionByEntityIdAndClaimTemplateId({ entityId, protocolId: templateEntityId })
  const [questionFormData, setQuestionFormData] = useState<any[]>([])

  useEffect(() => {
    if (templateEntity && (templateEntity?.linkedResource ?? []).length > 0) {
      const claimSchemaLinkedResources: LinkedResource[] = templateEntity.linkedResource.filter(
        (item: LinkedResource) => item.type === 'surveyTemplate',
      )

      ;(async () => {
        const responses = await Promise.all(
          claimSchemaLinkedResources.map((item) => {
            const url = serviceEndpointToUrl(item.serviceEndpoint, templateEntity.service)
            return fetch(url)
              .then((response) => response.json())
              .then((response) => {
                return response
              })
          }),
        )
        setQuestionFormData(responses.map((response) => response.question))
      })()
    }
    return () => {
      setQuestionFormData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(templateEntity?.linkedResource ?? [])])

  const handleSubmit = useCallback(
    async (answer: any): Promise<boolean> => {
      try {
        const collectionId = claimCollection?.id

        const data = JSON.stringify(answer)
        const res: CellnodePublicResource = await customQueries.cellnode.uploadPublicDoc(
          'application/ld+json',
          Buffer.from(data).toString('base64'),
          undefined,
          chainNetwork,
        )
        const claimId = res.key

        const execAgentSubmitPayload = await MsgExecAgentSubmit(signer, {
          claimId,
          collectionId,
          adminAddress,
        })

        const response = await execute(execAgentSubmitPayload) as unknown as DeliverTxResponse
        if (response.code !== 0) {
          throw response.rawLog
        }

        successToast('Success', 'Submit successfully')
        return true
      } catch (e: any) {
        console.error(e)
        errorToast('Failed', typeof e === 'string' ? e : e.message)
        return false
      }
    },
    [adminAddress, claimCollection?.id, signer, execute],
  )

  const survey = useMemo(() => {
    if (!questionFormData[0]) {
      return undefined
    }
    const survey = new Model(questionFormData[0])
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
  }, [questionFormData])

  return (
    <FlexBox width='100%'>
      <FlexBox $direction='column' width='100%' $gap={7}>
        {survey && <Survey model={survey} />}
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimForm
