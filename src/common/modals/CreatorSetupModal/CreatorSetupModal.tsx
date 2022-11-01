import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper } from '../styles'
import { theme, Typography } from 'modules/App/App.styles'
import { TEntityCreatorModel } from 'types'
import CreatorCard from 'modules/Entities/CreateEntity/CreateEntitySettings/components/CreatorCard/CreatorCard'

interface Props {
  creator: TEntityCreatorModel
  open: boolean
  onClose: () => void
  handleChange: (creator) => void
}

const CreatorSetupModal: React.FC<Props> = ({
  creator,
  open,
  onClose,
  handleChange,
}): JSX.Element => {
  const [formData, setFormData] = useState<TEntityCreatorModel>(creator)

  const handleUpdateCreator = (formData: any): void => {
    setFormData({
      displayName: formData?.displayName,
      country: formData?.location,
      email: formData?.email,
      mission: formData?.mission,
      credential: formData?.credential,
      image: formData?.fileSrc,
      identifier: formData?.creatorId,
    })
  }
  return (
    <Modal
      style={ModalStyles}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <Typography
          color={theme.ixoBlack}
          fontWeight={400}
          fontSize={'20px'}
          lineHeight={'28px'}
          style={{ marginBottom: 10 }}
        >
          Creator
        </Typography>
        <ModalBody>
          <CreatorCard
            displayName={formData?.displayName}
            location={formData?.country}
            email={formData?.email}
            website={''}
            mission={formData?.mission}
            creatorId={formData?.identifier}
            credential={formData?.credential}
            fileSrc={formData?.image}
            uploadingImage={false}
            handleUpdateContent={handleUpdateCreator}
            handleSubmitted={(): void => {
              // this.props.handleValidated('creator')
            }}
            handleError={(): void => {
              // this.props.handleValidationError('creator', errors)
            }}
          />
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default CreatorSetupModal
