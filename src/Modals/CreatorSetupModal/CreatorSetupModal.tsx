import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'Modals/styles'
import { TEntityCreatorModel } from 'types'
import CreatorCard from 'modules/Entities/CreateEntity/CreateEntitySettings/components/CreatorCard/CreatorCard'
import { Button } from 'pages/CreateEntity/components'
import { FormData } from 'components/JsonForm/types'

interface Props {
  title?: string
  creator: TEntityCreatorModel
  open: boolean
  onClose: () => void
  handleChange?: (creator: TEntityCreatorModel) => void
}

const CreatorSetupModal: React.FC<Props> = ({ creator, title, open, onClose, handleChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData | undefined>(undefined)

  useEffect(() => {
    setFormData(creator)
  }, [creator])

  const handleUpdateCreator = (): void => {
    if (handleChange) {
      handleChange({
        displayName: formData?.displayName,
        country: formData?.location,
        email: formData?.email,
        mission: formData?.mission,
        credential: formData?.credential,
        image: formData?.fileSrc,
        identifier: formData?.creatorId,
      })
    }
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>{title ?? 'Creator'}</ModalTitle>
        <ModalBody>
          <ModalRow>
            <CreatorCard
              displayName={formData?.displayName}
              location={formData?.location}
              email={formData?.email}
              website={formData?.website}
              mission={formData?.mission}
              creatorId={formData?.creatorId}
              credential={formData?.credential}
              fileSrc={formData?.fileSrc}
              uploadingImage={false}
              handleUpdateContent={(data): void => handleChange && setFormData(data)}
              handleSubmitted={(): void => {
                // this.props.handleValidated('creator')
              }}
              handleError={(): void => {
                // this.props.handleValidationError('creator', errors)
              }}
            />
          </ModalRow>
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!formData} onClick={handleUpdateCreator}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default CreatorSetupModal
