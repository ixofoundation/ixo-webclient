import React, { useEffect } from 'react'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import useEditEntity from 'hooks/editEntity'
import { Flex } from '@mantine/core';
import styled from 'styled-components';

const Container = styled(Flex)`
  & .svc-creator__banner {
    display: none;
  }
`

const creator = new SurveyCreator();
const EditSurveyTemplate: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()

  useEffect(() => {
    creator.isAutoSave = true;
    creator.saveSurveyFunc = function (saveNo: any, callback: any) {
      setEditedField('surveyTemplate', creator.JSON)
      callback(saveNo, true);
    }
  }, [setEditedField])

  useEffect(() => {
    creator.JSON = editEntity.surveyTemplate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(editEntity.surveyTemplate)])

  return (
    <Container direction='column' w='100%'>
      <SurveyCreatorComponent creator={creator} />
    </Container>
  )
}

export default EditSurveyTemplate
