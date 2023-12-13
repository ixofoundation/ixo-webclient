import React from 'react'
import { Wrapper, Row } from './SetupDataCollection.styles'
import { Button } from 'pages/CreateEntity/Components'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import { ICreatorOptions } from 'survey-creator-core'
import 'survey-core/survey.i18n.js'
import 'survey-creator-core/survey-creator-core.i18n.js'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { useCreateEntityState } from 'hooks/createEntity'
import useStepperNavigate from 'hooks/stepperNavigation'
import { useAppSelector } from 'redux/hooks'
import { selectNextStep, selectPreviousStep } from 'redux/entityMultiStepCreation/slice'

const options: ICreatorOptions = {
  showLogicTab: true,
  haveCommercialLicense: true,
  isAutoSave: true,
}

const SetupDataCollection = (): JSX.Element => {
  const navigate = useStepperNavigate()
  const previousStep = useAppSelector(selectPreviousStep)
  const nextStep = useAppSelector(selectNextStep)

  const { claimQuestionJSON, updateClaimQuestionJSON } = useCreateEntityState()

  const creator = new SurveyCreator({ options })
  creator.JSON = claimQuestionJSON

  const handlePrev = (): void => {
    if (previousStep?.number) {
      navigate(previousStep)
    }
  }
  const handleNext = (): void => {
    updateClaimQuestionJSON(creator.JSON)

    if (nextStep?.number) {
      navigate(nextStep)
    }
  }

  return (
    <Wrapper style={{ zIndex: 8 }}>
      <SurveyCreatorComponent creator={creator} />

      <Row className='d-flex mt-4' style={{ gap: 16 }}>
        <Button variant='secondary' onClick={handlePrev}>
          Back
        </Button>
        <Button variant='primary' onClick={handleNext}>
          Continue
        </Button>
      </Row>
    </Wrapper>
  )
}

export default SetupDataCollection
