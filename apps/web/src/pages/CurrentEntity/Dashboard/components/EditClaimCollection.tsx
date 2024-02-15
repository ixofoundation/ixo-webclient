import React, { useEffect, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import useEditEntity from 'hooks/editEntity'
import { serviceEndpointToUrl } from 'utils/entities'

const EditClaimCollection: React.FC = (): JSX.Element => {
  const { editEntity } = useEditEntity()
  const linkedResource = editEntity.linkedResource ?? []
  const service = editEntity.service
  const surveyTemplate = linkedResource.find((v) => v.type === 'surveyTemplate')

  const [questionJSON, setQuestionJSON] = useState()

  console.log(11111155555, questionJSON)

  useEffect(() => {
    if (surveyTemplate && service.length > 0) {
      const url = serviceEndpointToUrl(surveyTemplate.serviceEndpoint, service)
      fetch(url)
        .then((response) => response.json())
        .then((response) => response.question)
        .then((question) => {
          setQuestionJSON(question)
        })
        .catch(() => undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyTemplate, service])

  const creator = new SurveyCreator()
  creator.JSON = questionJSON

  return (
    <FlexBox $direction='column' $gap={7.5} width='100%'>
      <SurveyCreatorComponent creator={creator} />
    </FlexBox>
  )
}

export default EditClaimCollection
