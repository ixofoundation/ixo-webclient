import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, TagSelector } from 'pages/CreateEntity/Components'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { TEntityDDOTagModel } from 'types/entities'
import { Typography } from 'components/Typography'

interface Props {
  ddoTags: TEntityDDOTagModel[]
  entityType: string
  open: boolean
  onClose: () => void
  onChange?: (ddoTags: TEntityDDOTagModel[]) => void
}

const DDOTagsSetupModal: React.FC<Props> = ({ ddoTags, entityType, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<TEntityDDOTagModel[]>([])
  const entityConfig = useAppSelector(selectEntityConfig)
  const ddoTagsConfig =
    entityConfig[entityType && entityType.startsWith('protocol/') ? 'protocol' : entityType]?.filterSchema?.ddoTags ??
    []

  useEffect(() => {
    setFormData(ddoTags ?? [])
    return () => {
      setFormData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ddoTags)])

  const handleUpdateDDOTags = (): void => {
    if (onChange) {
      onChange(formData)
    }
    onClose()
  }
  const renderLabel = (label: string): JSX.Element => (
    <Typography size='xl' style={{ whiteSpace: 'nowrap' }}>
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
              <TagSelector
                name={ddoTag.name}
                values={formData[index]?.tags ?? []}
                options={ddoTag.tags.map(({ name }: any) => name)}
                selectionType={ddoTag.multiSelect ? 'multiple' : 'single'}
                label='Select'
                width='420px'
                height='48px'
                edit={!!onChange && !formData[index]?.readonly}
                handleChange={(values: string[]): void => {
                  console.log({ formData })
                  if (onChange) {
                    const newFormData = [...formData]
                    newFormData[index] = {
                      category: ddoTag.name,
                      tags: values,
                    }
                    setFormData(newFormData)
                  }
                }}
              />
            </ModalRow>
          ))}

          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!formData} onClick={handleUpdateDDOTags}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default DDOTagsSetupModal
