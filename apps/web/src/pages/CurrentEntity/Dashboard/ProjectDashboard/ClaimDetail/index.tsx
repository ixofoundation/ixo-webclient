import { DeliverTxResponse } from '@cosmjs/stargate'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { customQueries, ixo } from '@ixo/impactxclient-sdk'
import { EvaluationStatus } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/App/App.styles'
import { DisplaySurvey } from 'components/Survey'
import { useGetClaim, useGetClaimTemplateEntityByClaimId } from 'graphql/claims'
import { useAccount } from 'hooks/account'
import { chainNetwork } from 'hooks/configs'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { MsgExecAgentEvaluate } from 'lib/protocol'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { serviceEndpointToUrl } from 'utils/entities'
import { errorToast, successToast } from 'utils/toast'

const ClaimDetail: React.FC = () => {
  const { claimId = '', entityId = "" } = useParams<{ claimId: string, entityId: string }>()
  const { data: claim } = useGetClaim(claimId)
  const collectionId = claim?.collection?.id ?? ''
  const evaluationStatus = (claim?.evaluationByClaimId?.status ?? 0) as EvaluationStatus
  const templateEntity = useGetClaimTemplateEntityByClaimId(claimId)
  const { signer } = useAccount()
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAddress = useCurrentEntityAdminAccount(accounts)

  const [questionFormData, setQuestionFormData] = useState<any[]>([])
  const [answerData, setAnswerData] = useState<any>(null)
  const [evaluating, setEvaluating] = useState(false)
  const { execute, close } = useWallet()

  useEffect(() => {
    if (claimId) {
      customQueries.cellnode
        .getPublicDoc(claimId, undefined, chainNetwork)
        .then((response) => {
          setAnswerData(response)
        })
        .catch((e) => {
          console.error('getPublicDoc', e)
          setAnswerData({})
        })
      return () => {
        setAnswerData({})
      }
    }
  }, [claimId])

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
  }, [templateEntity?.linkedResource, templateEntity])


  const handleEvaluate = (status: EvaluationStatus) => async () => {
    try {
      setEvaluating(true)

      if (!claimId || !collectionId || !adminAddress) {
        throw new Error('Invalid args')
      }
      const payload = { claimId, collectionId, adminAddress, status, verificationProof: claimId }
      const execAgentEvaluatePayload = await MsgExecAgentEvaluate(signer, payload)

      const response = (await execute({ data: execAgentEvaluatePayload, transactionConfig: { sequence: 1 }})) as unknown as DeliverTxResponse

      if (response.code !== 0) {
        throw response.rawLog
      }
      close()
      successToast('Evaluation succeed')
    } catch (e: any) {
      console.error(e)
      errorToast('Evaluation failed', typeof e === 'string' ? e : JSON.stringify(e))
    } finally {
      setEvaluating(false)
    }
  }

  return (
    <FlexBox width='100%'>
      <FlexBox $direction='column' width='100%' $gap={7}>
        {questionFormData.length > 0 && answerData && <DisplaySurvey key="survey-display" surveyJson={questionFormData[0]} surveyData={answerData} />}
        {evaluationStatus === ixo.claims.v1beta1.EvaluationStatus.PENDING && (
          <FlexBox width='100%' $gap={4} $alignItems='center'>
            <Button
              variant='secondary'
              textTransform='capitalize'
              size='flex'
              onClick={handleEvaluate(ixo.claims.v1beta1.EvaluationStatus.APPROVED)}
              loading={evaluating}
            >
              Approve
            </Button>
            <Button
              variant='secondary'
              textTransform='capitalize'
              size='flex'
              onClick={handleEvaluate(ixo.claims.v1beta1.EvaluationStatus.REJECTED)}
              loading={evaluating}
            >
              Reject
            </Button>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  )
}
export default ClaimDetail
