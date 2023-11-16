import React from 'react'
import { Wrapper, Row } from './SetupDataCollection.styles'
import { Button } from 'pages/CreateEntity/Components'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import { ICreatorOptions } from 'survey-creator-core'
import 'survey-core/survey.i18n.js'
import 'survey-creator-core/survey-creator-core.i18n.js'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'
import { useCreateEntityState } from 'hooks/createEntity'

const options: ICreatorOptions = {
  showLogicTab: true,
  haveCommercialLicense: true,
  isAutoSave: true,
}

const SetupDataCollection: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const history = useHistory()
  const baseLink = match.path.split('/').slice(0, -1).join('/')

  const { claimQuestionJSON, updateClaimQuestionJSON } = useCreateEntityState()

  const creator = new SurveyCreator({ options })
  creator.JSON = claimQuestionJSON

  const handlePrev = (): void => {
    history.push(`${baseLink}/profile`)
  }
  const handleNext = (): void => {
    console.log(creator.JSON)
    updateClaimQuestionJSON(creator.JSON)

    history.push(`${baseLink}/property`)
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
