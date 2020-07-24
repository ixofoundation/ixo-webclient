import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Hero } from '../CreateEntity/components/Hero/Hero'
import { RootState } from 'src/common/redux/types'
// import Question from './components/Question/Question'
import { Steps } from '../../common/components/Steps/Steps'
import { updateActiveStep, addAttestation } from './CreateClaimTemplate.actions'
import {
  CreateClaimTemplateWrapper,
  ClaimQuestionCard,
} from './CreateClaimTemplate.styles'
import { createAttestation } from './CreateClaimTemplate.utils'
import questions from './question_types.json'
interface Props {
  activeStep: number
  attestations: Record<string, any>
  updateActiveStep: (newStepNo) => void
  addAttestation: (question) => void
}

class CreateClaimTemplate extends React.Component<Props> {
  handleAddAttestation(type): void {
    this.props.addAttestation(createAttestation(type))
  }

  getStepTitle(activeStep): string {
    switch (activeStep) {
      case 1:
        return 'Attestation'
      case 2:
        return 'Evaluation'
      case 3:
        return 'Approval'
      default:
        return null
    }
  }

  render(): JSX.Element {
    const { activeStep, attestations, updateActiveStep } = this.props
    return (
      <>
        <Hero title="Create a New Claim Template" />
        <CreateClaimTemplateWrapper>
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Steps
                    currentStepTitle={this.getStepTitle(activeStep)}
                    currentStepNo={activeStep}
                    totalSteps={3}
                    handleGoToStepClick={(stepNo): void =>
                      updateActiveStep(stepNo)
                    }
                  />
                  {activeStep === 1 && (
                    <>
                      <ClaimQuestionCard>
                        <h2>Claim Info</h2>
                      </ClaimQuestionCard>

                      {attestations.map(attestation => {
                        return (
                          <ClaimQuestionCard key={attestation.title}>
                            <h2>{attestation.title}</h2>
                            <input type="text" value={attestation.type} />
                          </ClaimQuestionCard>
                        )
                      })}
                      {questions.questions.map(
                        (question): JSX.Element => {
                          return (
                            <button
                              key={question.title}
                              onClick={(): void =>
                                this.handleAddAttestation(question.control)
                              }
                            >
                              Add {question.title}
                            </button>
                          )
                        },
                      )}
                    </>
                  )}

                  {activeStep === 2 && (
                    <>
                      <ClaimQuestionCard>
                        <h2>Claim Evaluation</h2>
                      </ClaimQuestionCard>
                      <ClaimQuestionCard>
                        <h2>Approval Criteria</h2>
                      </ClaimQuestionCard>
                      <ClaimQuestionCard>
                        <h2>Claim Enrichment</h2>
                      </ClaimQuestionCard>
                    </>
                  )}
                  {activeStep === 3 && (
                    <>
                      <ClaimQuestionCard>
                        <h2>Template Creator</h2>
                      </ClaimQuestionCard>
                      <ClaimQuestionCard>
                        <h2>Template Version</h2>
                      </ClaimQuestionCard>
                      <ClaimQuestionCard>
                        <h2>Terms of Use</h2>
                      </ClaimQuestionCard>
                      <ClaimQuestionCard>
                        <h2>Security</h2>
                      </ClaimQuestionCard>
                      <ClaimQuestionCard>
                        <h2>Data Source</h2>
                      </ClaimQuestionCard>
                    </>
                  )}
                  {activeStep > 1 && (
                    <button
                      type="button"
                      onClick={(): void => updateActiveStep(activeStep - 1)}
                    >
                      Previous
                    </button>
                  )}
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
  attestations: state.createClaimTemplate.attestations,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  updateActiveStep: (newStepNo): void => dispatch(updateActiveStep(newStepNo)),
  addAttestation: (attestation): void => dispatch(addAttestation(attestation)),
})

export const CreateClaimTemplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateClaimTemplate)
