import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { FormData } from 'components/JsonForm/types'
import React, { useEffect, useState } from 'react'
import { serviceEndpointToUrl } from 'utils/entities'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const ClaimQuestions: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { service, linkedResource } = useAppSelector(getEntityById(entityId))
  const [questionFormData, setQuestionFormData] = useState<FormData[]>([])

  const claimSchemaLinkedResources = linkedResource?.filter((item: LinkedResource) => item.type === 'surveyTemplate')

  useEffect(() => {
    if (claimSchemaLinkedResources) {
      ;(async () => {
        const responses = await Promise.all(
          claimSchemaLinkedResources.map((item) => {
            const url = serviceEndpointToUrl(item.serviceEndpoint, service)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(claimSchemaLinkedResources), JSON.stringify(service)])

  return (
    <FlexBox $direction='column' $gap={2}>
      {questionFormData.map((data, i) => {
        const survey = new Model(data)
        survey.applyTheme(themeJson)
        survey.mode = 'display'
        return <Survey key={i} model={survey} />
      })}
    </FlexBox>
  )
}

export default ClaimQuestions
