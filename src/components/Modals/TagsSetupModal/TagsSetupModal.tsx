import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, Select } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Typography } from 'components/App/App.styles'
import { TEntityTagsModel } from 'types/protocol'

interface Props {
  tags: TEntityTagsModel
  entityType: string
  open: boolean
  onClose: () => void
  onChange?: (tags: TEntityTagsModel) => void
}

const TagsSetupModal: React.FC<Props> = ({ tags, entityType, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({})
  const entityConfig = useAppSelector(selectEntityConfig)
  const ddoTagsConfig = entityConfig[entityType]?.filterSchema?.ddoTags ?? []

  useEffect(() => {
    setFormData(tags ?? {})
  }, [tags])

  const handleUpdateTags = (): void => {
    if (onChange) {
      onChange(formData)
    }
    onClose()
  }
  const renderLabel = (label: string): JSX.Element => (
    <Typography fontWeight={400} fontSize='20px' lineHeight='28px' style={{ whiteSpace: 'nowrap' }}>
      {label}
    </Typography>
  )
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Tags</ModalTitle>
        <ModalBody>
          {ddoTagsConfig.map((ddoTag: any, index: any) => (
            <ModalRow key={index}>
              {renderLabel(ddoTag.name)}
              <Select
                name={ddoTag.name}
                values={formData[ddoTag.name] ?? []}
                options={ddoTag.tags.map(({ name }: any) => name)}
                selectionType={ddoTag.multiSelect ? 'multiple' : 'single'}
                label='Select'
                width='420px'
                height='48px'
                edit={!!onChange}
                handleChange={(values: string[]): void => {
                  onChange &&
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
