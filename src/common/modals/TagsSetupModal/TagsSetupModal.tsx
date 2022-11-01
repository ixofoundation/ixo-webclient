import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import {
  ModalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  ModalRow,
  ModalTitle,
} from '../styles'
import { Button } from 'pages/CreateEntity/components'
import FilterCard from 'modules/Entities/CreateEntity/CreateEntitySettings/components/FilterCard/FilterCard'
import { EntityType } from 'modules/Entities/types'
import { FormData } from 'common/components/JsonForm/types'

interface Props {
  tags: { [name: string]: string[] }
  open: boolean
  onClose: () => void
  handleChange: (tags) => void
}

const TagsSetupModal: React.FC<Props> = ({
  tags,
  open,
  onClose,
  handleChange,
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData>(tags)

  const handleUpdateServices = (): void => {
    handleChange(formData)
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

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Services</ModalTitle>
        <ModalBody>
          <ModalRow>
            <FilterCard
              entityType={EntityType.Asset} // TODO:
              filters={formData}
              handleUpdateContent={setFormData}
              handleSubmitted={(): void => {
                // this.props.handleValidated('filter')
              }}
              handleError={(): void => {
                // this.props.handleValidationError('filter', errors)
              }}
            />
          </ModalRow>
          <ModalRow>
            <Button disabled={!formData} onClick={handleUpdateServices}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default TagsSetupModal
