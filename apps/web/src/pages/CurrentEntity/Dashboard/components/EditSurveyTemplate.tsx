import React, { useEffect } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import useEditEntity from 'hooks/editEntity'

const creator = new SurveyCreator()

const EditSurveyTemplate: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()

  useEffect(() => {
    setEditedField('surveyTemplate', creator.JSON)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(creator.JSON)])

  useEffect(() => {
    creator.JSON = editEntity.surveyTemplate
  }, [editEntity.surveyTemplate])

  return (
    <FlexBox $direction='column' $gap={7.5} width='100%'>
      <SurveyCreatorComponent creator={creator} />
    </FlexBox>
  )
}

export default EditSurveyTemplate
