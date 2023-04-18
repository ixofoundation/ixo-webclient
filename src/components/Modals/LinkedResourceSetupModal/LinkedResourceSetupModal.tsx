import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { TEntityLinkedResourceModel } from 'types/protocol'
import LinkedResourcesContentCard from 'components/Entities/CreateEntity/CreateEntityAdvanced/Components/LinkedResourcesContentCard/LinkedResourcesContentCard'

interface Props {
  linkedResource: TEntityLinkedResourceModel
  open: boolean
  onClose: () => void
  onChange: (linkedResource: TEntityLinkedResourceModel) => void
}

const LinkedResourceSetupModal: React.FC<Props> = ({ linkedResource, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData>(linkedResource)

  const handleSubmit = (): void => {
    onChange({ ...linkedResource, ...formData })
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Linked Resource</ModalTitle>
        <ModalBody>
          <ModalRow>
            <LinkedResourcesContentCard
              id={formData?.id || ''}
              path={formData.path}
              type={formData.type}
              name={formData.name}
              description={formData.description}
              uploadingResource={false}
              handleUpdateContent={setFormData}
              handleSubmitted={(): void => {
                // handleValidated(section.id)
              }}
              handleError={(): void => {
                // handleValidationError(section.id, errors)
              }}
            />
          </ModalRow>
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!formData} onClick={handleSubmit}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default LinkedResourceSetupModal
