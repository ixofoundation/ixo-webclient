import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/App/App.styles'
import { useSigner } from 'hooks/account'
import { useCreateEntity } from 'hooks/createEntity'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { MsgExecAgentSubmit } from 'lib/protocol'
import { Button } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { TEntityClaimModel } from 'types/entities'
import { serviceEndpointToUrl } from 'utils/entities'
import { errorToast, successToast } from 'utils/toast'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { selectAccountSigningClient } from 'redux/account/account.selectors'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { selectEntityClaim } from 'redux/currentEntity/currentEntity.selectors'
import { useGetClaimCollectionByEntityIdAndClaimTemplateId } from 'graphql/claims'

interface Props {
  claimId: string
}

const ClaimForm: React.FC<Props> = ({ claimId }) => {
  const { entityId } = useParams<{ entityId: string }>()
  const signer = useSigner()
  const signingClient: SigningStargateClient = useAppSelector(selectAccountSigningClient)
  const claim: { [id: string]: TEntityClaimModel } = useAppSelector(selectEntityClaim)

  const { UploadDataToService } = useCreateEntity()
  const adminAddress = useCurrentEntityAdminAccount()
  const selectedClaim: TEntityClaimModel = claim[claimId]

  const [templateEntityId] = (selectedClaim?.template?.id || '').split('#')
  const templateEntity = useAppSelector(selectEntityById(templateEntityId))
  const claimCollection = useGetClaimCollectionByEntityIdAndClaimTemplateId({ entityId, protocolId: templateEntityId })
  console.log({ claimCollection })

  const [questionFormData, setQuestionFormData] = useState<any[]>([])
  console.log({ questionFormData })

  const [answer, setAnswer] = useState()
  const [submitting, setSubmitting] = useState(false)

  const survey = useMemo(() => {
    if (!questionFormData[0]) {
      return undefined
    }
    const survey = new Model(questionFormData[0])
    survey.applyTheme(themeJson)
    survey.onComplete.add((sender: any, options: any) => {
      setAnswer(sender.data)
    })
    return survey
  }, [questionFormData])

  useEffect(() => {
    if (templateEntity && (templateEntity?.linkedResource ?? []).length > 0) {
      const claimSchemaLinkedResources: LinkedResource[] = templateEntity.linkedResource.filter(
        (item: LinkedResource) => item.type === 'ClaimSchema',
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

  const handleSubmit = async () => {
    setSubmitting(true)
    const collectionId = claimCollection?.id

    const res = await UploadDataToService(JSON.stringify({ answer }))
    const claimId = (res as any).key || (res as any).cid

    console.log('MsgExecAgentSubmit', { claimId, collectionId, adminAddress })

    const response = await MsgExecAgentSubmit(signingClient, signer, {
      claimId,
      collectionId,
      adminAddress,
    }).catch((e: any) => {
      console.error('MsgExecAgentSubmit', e)
      errorToast('Failed', e.message)
      return undefined
    })
    console.log('MsgExecAgentSubmit', response)

    if (response?.code === 0) {
      successToast('Success', 'Submit successfully')
    } else {
      errorToast('Failed', response?.rawLog)
    }
    setSubmitting(false)
  }

  return (
    <FlexBox width='100%'>
      <FlexBox direction='column' width='100%' gap={7}>
        {survey && <Survey model={survey} />}
        {questionFormData.length > 0 && (
          <Button variant='secondary' size={'lg'} onClick={handleSubmit} loading={submitting}>
            Sign And Submit
          </Button>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimForm
