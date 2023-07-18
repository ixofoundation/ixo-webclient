import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/App/App.styles'
import SingleControlForm from 'components/JsonForm/SingleControlForm/SingleControlForm'
import { FormData } from 'components/JsonForm/types'
import useCurrentEntity, { useCurrentEntityClaimSchemas } from 'hooks/currentEntity'
import React, { useEffect, useState } from 'react'
import { serviceEndpointToUrl } from 'utils/entities'

const ClaimQuestions: React.FC = () => {
  const claimSchemaLinkedResources: LinkedResource[] = useCurrentEntityClaimSchemas()
  const { service } = useCurrentEntity()
  const [questionFormData, setQuestionFormData] = useState<FormData[]>([])

  console.log({ questionFormData })

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
    <FlexBox direction='column'>
      {questionFormData.map((data, index) => {
        const uiSchema = {
          [data.id]: {
            'ui:widget': data.control,
            'ui:uploading': false,
          },
        }
        return (
          <SingleControlForm
            key={index}
            formData={data}
            handleFormDataChange={(): void => {
              //
            }}
            handleSubmit={() => {
              //
            }}
            schema={data}
            uiSchema={uiSchema}
          />
        )
      })}
    </FlexBox>
  )
}

export default ClaimQuestions
