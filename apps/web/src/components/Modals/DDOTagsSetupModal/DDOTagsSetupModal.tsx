import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'

import CloseIcon from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, TagSelector } from 'screens/CreateEntity/Components'
import { useAppSelector } from 'redux/hooks'
import { TEntityDDOTagModel } from 'types/entities'
import { Typography } from 'components/Typography'
import { toRootEntityType } from 'utils/entities'
import { selectEntityConfig } from 'redux/configs/configs.selectors'

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

  const ddoTagsConfig = entityType ? (entityConfig[toRootEntityType(entityType)]?.filterSchema?.ddoTags ?? []) : []

  useEffect(() => {
    setFormData((ddoTags ?? []).filter(Boolean))
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
          {ddoTagsConfig.map((ddoTag: any, index: any) => {
            const currentFormData = formData.find((v) => v.category === ddoTag.name)
            return (
              <ModalRow key={index}>
                {renderLabel(ddoTag.name)}
                <TagSelector
                  name={ddoTag.name}
                  values={currentFormData?.tags ?? []}
                  options={ddoTag.tags.map(({ name }: any) => name)}
                  selectionType={ddoTag.multiSelect ? 'multiple' : 'single'}
                  label='Select'
                  width='420px'
                  height='48px'
                  edit={!!onChange && !currentFormData?.readonly}
                  handleChange={(values: string[]): void => {
                    if (onChange) {
                      const newFormData = Object.fromEntries(formData.map((v) => [v.category, v]))
                      newFormData[ddoTag.name] = {
                        category: ddoTag.name,
                        tags: values,
                      }
                      setFormData(Object.entries(newFormData).map(([key, value]) => value))
                    }
                  }}
                />
              </ModalRow>
            )
          })}

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
