// deepscan-disable
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
import { useGetUserGranteeRole } from 'hooks/claim'
import { Typography } from 'components/Typography'
import { AgentRoles } from 'types/models'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

interface Props {
  claimId: string
}

const ClaimForm: React.FC<Props> = ({ claimId }) => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const signer = useSigner()

  const entity = useAppSelector(getEntityById(entityId))

  const claim: { [id: string]: TEntityClaimModel } = entity.claim ?? {}

  const { execute, wallet, close } = useWallet()
  const userRole = useGetUserGranteeRole(wallet?.address ?? "", entity.owner, entity.accounts)

  const adminAddress = useCurrentEntityAdminAccount(entity.accounts)
  const selectedClaim: TEntityClaimModel = claim[claimId]

  const [templateEntityId] = (selectedClaim?.template?.id ?? '').split('#')
  const { data: templateEntity } = useGetEntityById(templateEntityId)

  const claimCollection = useGetClaimCollectionByEntityIdAndClaimTemplateId({ entityId, protocolId: templateEntityId })
  const [questionFormData, setQuestionFormData] = useState<any[]>([])

  const canCreateMore = useMemo(() => {
    if (!claimCollection) {
      return false
    }
    if (claimCollection.quota === 0) {
      return true
    }
    return claimCollection.quota - claimCollection.count > 0
  }, [claimCollection])
  const expired = useMemo(() => {
    if (!claimCollection) {
      return true
    }
    if (!claimCollection.endDate || claimCollection.endDate === new Date(null as any)) {
      return false
    }
    if (new Date().getTime() < new Date(claimCollection.endDate).getTime()) {
      return false
    }
    return true
  }, [claimCollection])
  const isEligible = useMemo(() => {
    return canCreateMore && !expired
  }, [canCreateMore, expired])

  useEffect(() => {
    if (templateEntity && (templateEntity?.linkedResource ?? []).length > 0) {
      const claimSchemaLinkedResources: LinkedResource[] = templateEntity.linkedResource.filter(
        (item: LinkedResource) => item.type === 'surveyTemplate',
      )

        ; (async () => {
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

        const response = (await execute({ data: execAgentSubmitPayload, transactionConfig: { sequence: 1 }})) as unknown as DeliverTxResponse
        if (response.code !== 0) {
          throw response.rawLog
        }
        close()
        successToast('Success', 'Successfully submitted')
        return true
      } catch (e: any) {
        console.error(e)
        errorToast('Failed', typeof e === 'string' ? e : JSON.stringify(e))
        return false
      }
    },
    [adminAddress, claimCollection?.id, signer, execute, close],
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
    survey.showNavigationButtons = isEligible
    return survey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionFormData, isEligible])

  if (userRole !== AgentRoles.serviceProviders) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>First apply to Join</Typography>
      </FlexBox>
    )
  }

  if (!canCreateMore) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>No remaining submissions</Typography>
      </FlexBox>
    )
  }

  if (expired) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>Expired</Typography>
      </FlexBox>
    )
  }

  if (!claimCollection) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>Claim must have an active ClaimCollection</Typography>
      </FlexBox>
    )
  }

  if (claimCollection.state !== 0) {
    return (
      <FlexBox width='100%' $justifyContent='center' $alignItems='center' height='300px'>
        <Typography size='5xl'>ClaimCollection State must be OPEN</Typography>
      </FlexBox>
    )
  }

  return (
    <FlexBox width='100%'>
      <FlexBox $direction='column' width='100%' $gap={7}>
        {survey && <Survey model={survey} />}
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimForm
