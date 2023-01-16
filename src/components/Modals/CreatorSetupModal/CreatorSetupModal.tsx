import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { TEntityCreatorModel } from 'types/protocol'
import CreatorCard from 'components/Entities/CreateEntity/CreateEntitySettings/Components/CreatorCard/CreatorCard'
import { Button } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'

interface Props {
  title?: string
  creator: TEntityCreatorModel
  open: boolean
  onClose: () => void
  onChange?: (creator: TEntityCreatorModel) => void
}

const CreatorSetupModal: React.FC<Props> = ({ creator, title, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData | undefined>(undefined)

  useEffect(() => {
    if (creator) {
      setFormData({
        displayName: creator?.displayName,
        location: creator?.location,
        email: creator?.email,
        mission: creator?.mission,
        website: creator?.website,
        fileSrc: creator?.logo,
        creatorId: creator?.id,
      })
    }
  }, [creator])

  const handleUpdateCreator = (): void => {
    if (onChange) {
      onChange({
        [`@type`]: 'ixo:creator',
        displayName: formData?.displayName,
        location: formData?.location,
        email: formData?.email,
        mission: formData?.mission,
        website: formData?.website,
        logo: formData?.fileSrc,
        id: formData?.creatorId,
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
              handleUpdateContent={(data): void => onChange && setFormData(data)}
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
