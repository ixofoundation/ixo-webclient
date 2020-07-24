import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Hero } from '../CreateEntity/components/Hero/Hero'
import { RootState } from 'src/common/redux/types'
// import Question from './components/Question/Question'
import { Steps } from '../../common/components/Steps/Steps'
import { updateActiveStep, addQuestion } from './CreateClaimTemplate.actions'
import {
  CreateClaimTemplateWrapper,
  ClaimQuestionCard,
} from './CreateClaimTemplate.styles'

interface Props {
  activeStep: number
  questions: Record<string, any>
  updateActiveStep: (newStepNo) => void
  addQuestion: (question) => void
}

class CreateClaimTemplate extends React.Component<Props> {
  handleAddQuestion(type): void {
    this.props.addQuestion({
      '@type': type,
      'id': '',
      'title': type,
      'type': type,
      'minLength': 2,
      'maxLength': 20,
      'default': '',
      'examples': [''],
    })
  }

  render(): JSX.Element {
    const { activeStep, questions, updateActiveStep } = this.props
    return (
      <>
        <Hero title="Create a New Claim Template" />
        <CreateClaimTemplateWrapper>
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Steps
                    currentStepTitle={'Test'}
                    currentStepNo={activeStep}
                    totalSteps={3}
                    handleGoToStepClick={(stepNo): void =>
                      updateActiveStep(stepNo)
                    }
                  />
                  <ClaimQuestionCard>
                    <h2>Claim Info</h2>
                  </ClaimQuestionCard>
                  {questions.map(question => {
                    return (
                      <ClaimQuestionCard key={question.title}>
                        <h2>{question.type}</h2>
                        <input type="text" value={question.title} />
                      </ClaimQuestionCard>
                    )
                  })}
                  <button
                    onClick={(): void => this.handleAddQuestion('string')}
                  >
                    Add String
                  </button>
                  <button onClick={(): void => this.handleAddQuestion('date')}>
                    Add Date
                  </button>
                  <button
                    type="button"
                    onClick={(): void => updateActiveStep(activeStep + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CreateClaimTemplateWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  activeStep: state.createClaimTemplate.activeStep,
  questions: state.createClaimTemplate.questions,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  updateActiveStep: (newStepNo): void => dispatch(updateActiveStep(newStepNo)),
  addQuestion: (question): void => dispatch(addQuestion(question)),
})

export const CreateClaimTemplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateClaimTemplate)
