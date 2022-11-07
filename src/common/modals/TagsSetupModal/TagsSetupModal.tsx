import React, { useEffect, useState } from 'react'
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
import { Button, Select } from 'pages/CreateEntity/components'
import { FormData } from 'common/components/JsonForm/types'
import { useSelector } from 'react-redux'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { Typography } from 'modules/App/App.styles'
import { TEntityTagsModel } from 'types'

interface Props {
  tags: TEntityTagsModel
  entityType: string
  open: boolean
  onClose: () => void
  handleChange: (tags: TEntityTagsModel) => void
}

const TagsSetupModal: React.FC<Props> = ({
  tags,
  entityType,
  open,
  onClose,
  handleChange,
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({})
  const entityConfig = useSelector(selectEntityConfig)
  const ddoTagsConfig = entityConfig[entityType]?.filterSchema?.ddoTags ?? []

  useEffect(() => {
    setFormData(tags ?? {})
  }, [tags])

  const handleUpdateTags = (): void => {
    handleChange(formData)
    onClose()
  }
  const renderLabel = (label: string): JSX.Element => (
    <Typography
      fontWeight={400}
      fontSize="20px"
      lineHeight="28px"
      style={{ whiteSpace: 'nowrap' }}
    >
      {label}
    </Typography>
  )
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
        <ModalTitle>Tags</ModalTitle>
        <ModalBody>
          {ddoTagsConfig.map((ddoTag, index) => (
            <ModalRow key={index}>
              {renderLabel(ddoTag.name)}
              <Select
                name={ddoTag.name}
                values={formData[ddoTag.name] ?? []}
                options={ddoTag.tags.map(({ name }) => name)}
                selectionType="multiple"
                label="Select"
                width="420px"
                height="48px"
                handleChange={(values: string[]): void => {
                  setFormData((pre) => ({
                    ...pre,
                    [ddoTag.name]: values,
                  }))
                }}
              />
            </ModalRow>
          ))}

          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!formData} onClick={handleUpdateTags}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default TagsSetupModal
