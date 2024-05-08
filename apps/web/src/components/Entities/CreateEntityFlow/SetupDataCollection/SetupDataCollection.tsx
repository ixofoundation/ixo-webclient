import React from 'react'
import { Wrapper, Row } from './SetupDataCollection.styles'
import { Button } from 'pages/CreateEntity/Components'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import { ICreatorOptions } from 'survey-creator-core'
import 'survey-core/survey.i18n.js'
import 'survey-creator-core/survey-creator-core.i18n.js'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { Flex } from '@mantine/core'
import { useCreateEntityStateAsActionState } from 'hooks/entity/useCreateEntityStateAsAction'

const options: ICreatorOptions = {
  showLogicTab: true,
  haveCommercialLicense: true,
  isAutoSave: true,
}

const SetupDataCollection = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const { navigateToNextStep, navigateToPreviousStep } = useCreateEntityStepState()
  const { questionJSON, updateQuestionJSON } = useCreateEntityStateAsActionState()

  const creator = new SurveyCreator({ options })
  creator.JSON = questionJSON

  const handlePrev = (): void => {
    navigateToPreviousStep()
  }
  const handleNext = (): void => {
    updateQuestionJSON(creator.JSON)

    navigateToNextStep()
  }

  return (
    <Wrapper style={{ zIndex: 8 }}>
      <Flex w={'100%'} mih={400}>
        <SurveyCreatorComponent creator={creator} />
      </Flex>

      {showNavigation && (
        <Row className='d-flex mt-4' style={{ gap: 16 }}>
          <Button variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button variant='primary' onClick={handleNext}>
            Continue
          </Button>
        </Row>
      )}
    </Wrapper>
  )
}

export default SetupDataCollection
