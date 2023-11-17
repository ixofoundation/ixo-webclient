import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/App/App.styles'
import { FormData } from 'components/JsonForm/types'
import useCurrentEntity, { useCurrentEntityClaimSchemas } from 'hooks/currentEntity'
import React, { useEffect, useState } from 'react'
import { serviceEndpointToUrl } from 'utils/entities'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { themeJson } from 'styles/surveyTheme'
import { fetchWithRetry } from 'utils/fetch'

const ClaimQuestions: React.FC = () => {
  const claimSchemaLinkedResources: LinkedResource[] = useCurrentEntityClaimSchemas()
  const { service } = useCurrentEntity()
  const [questionFormData, setQuestionFormData] = useState<FormData[]>([])

  useEffect(() => {
    if (claimSchemaLinkedResources) {
      ;(async () => {
        const responses = await Promise.all(
          claimSchemaLinkedResources.map((item) => {
            const url = serviceEndpointToUrl(item.serviceEndpoint, service)
            return fetchWithRetry(url, {}, 3, 1000)
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
    <FlexBox direction='column' gap={2}>
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
