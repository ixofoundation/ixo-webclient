import { DeliverTxResponse } from '@cosmjs/stargate'
import { useWallet } from 'wallet-connector'
import { cosmos, customQueries, ixo } from '@ixo/impactxclient-sdk'
import { EvaluationStatus } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Flex, Button } from '@mantine/core'
import { FlexBox } from 'components/App/App.styles'
import { InputWithLabel } from 'components/Form/InputWithLabel'
import { DisplaySurvey } from 'components/Survey'
import { TokenSelector } from 'components/Modals/AddActionModal/Component'
import { useGetClaim, useGetClaimTemplateEntityByClaimId } from 'graphql/claims'
import { useAccount } from 'hooks/account'
import { chainNetwork, useIxoConfigs } from 'hooks/configs'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { MsgExecAgentEvaluate } from 'lib/protocol'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { serviceEndpointToUrl } from 'utils/entities'
import { errorToast, successToast } from 'utils/toast'
import { NATIVE_DENOM } from 'constants/chains'

const ClaimDetail: React.FC = () => {
  const { claimId = '', entityId = '' } = useParams<{ claimId: string; entityId: string }>()
  const { data: claim } = useGetClaim(claimId)
  const collectionId = claim?.collection?.id ?? ''
  const evaluationStatus = (claim?.evaluationByClaimId?.status ?? 0) as EvaluationStatus
  const templateEntity = useGetClaimTemplateEntityByClaimId(claimId)
  const { signer } = useAccount()
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAddress = useCurrentEntityAdminAccount(accounts)
  const [customAmount, setCustomAmount] = useState<Coin>({ amount: '', denom: NATIVE_DENOM })

  const { convertToMinimalDenom } = useIxoConfigs()
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
      const payload = {
        claimId,
        collectionId,
        adminAddress,
        status,
        verificationProof: claimId,
        ...(parseInt(customAmount.amount) > 0 && {
          amount: cosmos.base.v1beta1.Coin.fromPartial(convertToMinimalDenom(customAmount)!),
        }),
      }
      const execAgentEvaluatePayload = await MsgExecAgentEvaluate(signer, payload)

      const response = (await execute({
        data: execAgentEvaluatePayload,
        transactionConfig: { sequence: 1 },
      })) as unknown as DeliverTxResponse

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
    <Flex direction={'column'}>
      <Flex py={10} pos='sticky' top={0} align={'center'}>
        {evaluationStatus === ixo.claims.v1beta1.EvaluationStatus.PENDING && (
          <FlexBox width='100%' $gap={4} $alignItems='center'>
            <FlexBox $direction='column' width='600px'>
              <FlexBox $gap={6} width='100%' $alignItems='center'>
                <InputWithLabel
                  name='approvalAmount'
                  height={'48px'}
                  label={'Payment on approval'}
                  inputValue={customAmount.amount}
                  handleChange={(amount: string): void => setCustomAmount((v) => ({ ...v, amount }))}
                />
                <FlexBox width='200px'>
                  <TokenSelector
                    denom={customAmount.denom}
                    onChange={(denom) => setCustomAmount((v) => ({ ...v, denom }))}
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>

            <Button
              variant='secondary'
              size='lg'
              radius={'md'}
              ml={10}
              onClick={handleEvaluate(ixo.claims.v1beta1.EvaluationStatus.APPROVED)}
              loading={evaluating}
            >
              Approve
            </Button>
            <Button
              variant='secondary'
              size='lg'
              radius={'md'}
              onClick={handleEvaluate(ixo.claims.v1beta1.EvaluationStatus.REJECTED)}
              loading={evaluating}
            >
              Reject
            </Button>
          </FlexBox>
        )}
      </Flex>
      <FlexBox $direction='column' width='100%' $gap={7}>
        {questionFormData.length > 0 && claimId && answerData ? (
          <DisplaySurvey
            surveyId={claimId}
            key='survey-display'
            surveyJson={questionFormData[0]}
            surveyData={answerData}
          />
        ) : null}
      </FlexBox>
    </Flex>
  )
}
export default ClaimDetail
