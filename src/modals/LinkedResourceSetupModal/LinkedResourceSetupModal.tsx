import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from '../styles'
import { Button } from 'pages/CreateEntity/components'
import { FormData } from 'common/components/JsonForm/types'
import { TEntityLinkedResourceModel } from 'types'
import LinkedResourcesContentCard from 'modules/Entities/CreateEntity/CreateEntityAdvanced/components/LinkedResourcesContentCard/LinkedResourcesContentCard'

interface Props {
  linkedResource: TEntityLinkedResourceModel
  open: boolean
  onClose: () => void
  handleChange: (linkedResource: TEntityLinkedResourceModel) => void
}

const LinkedResourceSetupModal: React.FC<Props> = ({ linkedResource, open, onClose, handleChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData>(linkedResource)

  const handleSubmit = (): void => {
    handleChange({ ...linkedResource, ...formData })
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
              id={formData?.id}
              path={formData?.path}
              type={formData?.type}
              name={formData?.name}
              description={formData?.description}
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
