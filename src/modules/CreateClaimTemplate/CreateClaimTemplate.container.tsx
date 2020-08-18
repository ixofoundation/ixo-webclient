import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Hero } from '../EntityModules/CreateEntity/components/Hero/Hero'
import { RootState } from 'common/redux/types'
import { Steps } from 'common/components/Steps/Steps'
import {
  updateActiveStep,
  updateClaimInfo,
  addAttestation,
  removeAttestation,
  updateAttestation,
} from './CreateClaimTemplate.actions'
import { CreateClaimTemplateWrapper } from './CreateClaimTemplate.styles'
import { createAttestation } from './CreateClaimTemplate.utils'
import AddFieldBar from './components/AddFieldBar/AddFieldBar'
import ClaimQuestionCard from './components/ClaimQuestionCard/ClaimQuestionCard'
import ClaimInfoCard from './components/ClaimInfoCard/ClaimInfoCard'
import { FormData } from '../../common/components/JsonForm/types'
import { Attestation, ClaimInfo } from './types'

interface Props {
  activeStep: number
  claimInfo: ClaimInfo
  attestations: Attestation[]
  updateActiveStep: (newStepNo) => void
  updateClaimInfo: (claimInfo) => void
  addAttestation: (question) => void
  removeAttestation: (id) => void
  updateAttestation: (attestation) => void
}

class CreateClaimTemplate extends React.Component<Props> {
  handleAddAttestation(type): void {
    this.props.addAttestation(createAttestation(type))
  }

  handleDeleteAttestation(id): void {
    this.props.removeAttestation(id)
  }
  handleDuplicateAttestation(attestation): void {
    const newAttestation = {
      ...createAttestation(attestation.type),
      title: attestation.title,
      description: attestation.description,
      label: attestation.label,
      required: attestation.required,
      control: attestation.control,
      placeholder: attestation.placeholder,
    }
    this.props.addAttestation(newAttestation)
  }

  handleRequireAttestation(id): void {
    this.props.updateAttestation(
      this.props.attestations
        .filter(attestation => {
          return attestation.id === id
        })
        .map(attestation => {
          return { ...attestation, required: !attestation.required }
        })[0],
    )
  }

  handleInfoCardContent(formData: FormData): void {
    this.props.updateClaimInfo({
      claimName: formData.claimName,
      shortDescription: formData.shortDescription,
    })
  }

  handleUpdateAttestationContent(
    formData: FormData,
    attestation: Attestation,
  ): void {
    this.props.updateAttestation({
      ...attestation,
      label: formData.question,
      description: formData.shortDescription,
    })
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
    const { activeStep, claimInfo, attestations, updateActiveStep } = this.props
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
                      <ClaimInfoCard
                        handleUpdateContent={(claimInfo): void =>
                          this.handleInfoCardContent(claimInfo)
                        }
                        claimName={claimInfo.claimName}
                        shortDescription={claimInfo.shortDescription}
                      />

                      {attestations.map(attestation => {
                        return (
                          <ClaimQuestionCard
                            key={attestation.title}
                            attestation={attestation}
                            handleDeleteAttestation={(id): void =>
                              this.handleDeleteAttestation(id)
                            }
                            handleDuplicateAttestation={(attestation): void =>
                              this.handleDuplicateAttestation(attestation)
                            }
                            handleRequireAttestation={(id): void =>
                              this.handleRequireAttestation(id)
                            }
                            handleUpdateAttestationContent={(
                              formData,
                              attestation,
                            ): void =>
                              this.handleUpdateAttestationContent(
                                formData,
                                attestation,
                              )
                            }
                          />
                        )
                      })}

                      <AddFieldBar
                        addField={(question): void =>
                          this.handleAddAttestation(question)
                        }
                      />
                    </>
                  )}

                  {activeStep === 2 && (
                    <>
                      <h2>Claim Evaluation</h2>
                      <h2>Approval Criteria</h2>
                      <h2>Claim Enrichment</h2>
                    </>
                  )}

                  {activeStep === 3 && (
                    <>
                      <h2>Template Creator</h2>
                      <h2>Template Version</h2>
                      <h2>Terms of Use</h2>
                      <h2>Security</h2>
                      <h2>Data Source</h2>
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
  claimInfo: state.createClaimTemplate.claimInfo,
  attestations: state.createClaimTemplate.attestations,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  updateActiveStep: (newStepNo): void => dispatch(updateActiveStep(newStepNo)),
  updateClaimInfo: (claimInfo): void => dispatch(updateClaimInfo(claimInfo)),
  addAttestation: (attestation): void => dispatch(addAttestation(attestation)),
  removeAttestation: (id): void => dispatch(removeAttestation(id)),
  updateAttestation: (attestation): void =>
    dispatch(updateAttestation(attestation)),
})

export const CreateClaimTemplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateClaimTemplate)
