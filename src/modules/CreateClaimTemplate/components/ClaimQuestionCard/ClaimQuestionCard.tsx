import React from 'react'
import Trash from '../../../../assets/icons/Trash'
import Expand from '../../../../assets/icons/Expand'
import { Switch } from '../../../../common/components/Switch/Switch'
import { ClaimQuestionCardWrapper, Toolbar } from './ClaimQuestionCard.styles'
import { Attestation } from '../../types'
import BasicTextInput from '../BasicTextInput/BasicTextInput'
import { FormData } from '../../../../common/components/JsonForm/types'

interface Props {
  attestation: Attestation
  handleDeleteAttestation(id): void
  handleDuplicateAttestation(attestation): void
  handleRequireAttestation(id): void
  handleUpdateAttestationContent(formData: FormData, attestation: Attestation)
}

class ClaimQuestionCard extends React.Component<Props> {
  render(): JSX.Element {
    const {
      attestation,
      handleDeleteAttestation,
      handleDuplicateAttestation,
      handleRequireAttestation,
      handleUpdateAttestationContent,
    } = this.props
    return (
      <>
        <ClaimQuestionCardWrapper>
          <h2>{attestation.title}</h2>
          <BasicTextInput
            attestation={attestation}
            question={attestation.label}
            shortDescription={attestation.description}
            handleUpdateContent={handleUpdateAttestationContent}
          />
          <Toolbar>
            <div
              className="toolbar-item"
              onClick={(): void => handleDuplicateAttestation(attestation)}
            >
              <Expand fill="#A5ADB0" />
            </div>
            <div
              className="toolbar-item"
              onClick={(): void => handleDeleteAttestation(attestation.id)}
            >
              <Trash fill="#A5ADB0" />
            </div>
            <div className="divider"></div>
            <div className="toolbar-item">
              <Switch
                label="Required"
                on={attestation.required}
                handleChange={(): void =>
                  handleRequireAttestation(attestation.id)
                }
              />
            </div>
          </Toolbar>
        </ClaimQuestionCardWrapper>
      </>
    )
  }
}

export default ClaimQuestionCard
