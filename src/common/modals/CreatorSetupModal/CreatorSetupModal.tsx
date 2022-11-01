import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import {
  ModalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  ModalRow,
} from '../styles'
import { theme, Typography } from 'modules/App/App.styles'
import { TEntityCreatorModel } from 'types'
import CreatorCard from 'modules/Entities/CreateEntity/CreateEntitySettings/components/CreatorCard/CreatorCard'
import { Button } from 'pages/CreateEntity/components'
import { FormData } from 'common/components/JsonForm/types'

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
  const [formData, setFormData] = useState<FormData>(creator)

  const handleUpdateCreator = (): void => {
    handleChange({
      displayName: formData?.displayName,
      country: formData?.location,
      email: formData?.email,
      mission: formData?.mission,
      credential: formData?.credential,
      image: formData?.fileSrc,
      identifier: formData?.creatorId,
    })
    onClose()
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
              handleUpdateContent={setFormData}
              handleSubmitted={(): void => {
                // this.props.handleValidated('creator')
              }}
              handleError={(): void => {
                // this.props.handleValidationError('creator', errors)
              }}
            />
          </ModalRow>
          <ModalRow>
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
