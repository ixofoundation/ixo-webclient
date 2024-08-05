import Image from 'next/image'
import React, { useState, useEffect, useMemo } from 'react'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { TEntityServiceModel, NodeType } from 'types/entities'
import { Button, Dropdown, InputWithLabel } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useMantineTheme } from '@mantine/core'
import { IconMinusBox } from 'components/IconPaths'
import { IconClose } from 'components/IconPaths'


interface ServiceFormProps {
  index: number
  service: TEntityServiceModel
  onUpdate?: (service: TEntityServiceModel) => void
  onRemove?: () => void
}

const ServiceForm: React.FC<ServiceFormProps> = ({ index, service, onUpdate, onRemove }) => {
  const theme = useMantineTheme()
  return (
    <FlexBox $direction='column' $gap={4} width='100%'>
      <FlexBox $gap={4} $alignItems='center'>
        <Typography size='xl'>Service {index + 1}</Typography>
        {onRemove && (
          <SvgBox color={theme.colors.blue[5]} cursor='pointer' onClick={() => onRemove()}>
            <Image src={IconMinusBox} alt='MinusBox' width={5} height={5} color={theme.colors.blue[5]} />
          </SvgBox>
        )}
      </FlexBox>
      <FlexBox $gap={4} width='100%'>
        <Dropdown
          options={Object.values(NodeType).map((v) => ({ text: v, value: v }))}
          value={service.type}
          onChange={(e) => onUpdate && onUpdate({ ...service, type: e.target.value as NodeType })}
          disabled={!onUpdate}
          label='Service Type'
        />
        <InputWithLabel
          label='Service ID'
          inputValue={service.id}
          handleChange={(value) => onUpdate && onUpdate({ ...service, id: value })}
          disabled={!onUpdate}
        />
      </FlexBox>
      <FlexBox width='100%'>
        <InputWithLabel
          label='Service Endpoint'
          inputValue={service.serviceEndpoint}
          handleChange={(value) => onUpdate && onUpdate({ ...service, serviceEndpoint: value })}
          disabled={!onUpdate}
        />
      </FlexBox>
    </FlexBox>
  )
}

interface Props {
  service: TEntityServiceModel[]
  open: boolean
  onClose: () => void
  onChange?: (services: TEntityServiceModel[]) => void
}

const ServiceSetupModal: React.FC<Props> = ({ service, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<TEntityServiceModel[]>([])

  const isFormDataValid = useMemo(() => {
    // Check null value
    if (formData.some((item) => !item.type || !item.serviceEndpoint || !item.id.replace('{id}#', ''))) {
      return false
    }
    // Check serviceEndpoint duplication
    const serviceEndpoints = formData.map((item) => item.serviceEndpoint)
    if (new Set(serviceEndpoints).size !== serviceEndpoints.length) {
      return false
    }
    return true
  }, [formData])

  useEffect(() => {
    setFormData(service.map((v) => ({ ...v, id: v.id.replace('{id}#', '') })))
    return () => {
      setFormData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(service)])

  const handleAddService = (): void => {
    if (onChange) {
      setFormData((v) => [
        ...v,
        {
          id: '',
          type: NodeType.CellNode,
          serviceEndpoint: '',
        },
      ])
    }
  }
  const handleUpdateService = (index: number, service: TEntityServiceModel): void =>
    onChange && setFormData((v) => v.map((origin, idx) => (index === idx ? service : origin)))
  const handleRemoveService = (index: number): void =>
    onChange && setFormData((v) => v.filter((v, idx) => idx !== index))

  const handleSubmit = (): void => {
    onChange && onChange(formData.map((v) => ({ ...v, id: `{id}#${v.id}` })))
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <Image src={IconClose} alt='Close' width={5} height={5} color={theme.colors.blue[5]} />
      </CloseButton>

      <FlexBox $direction='column' width='600px' $gap={4}>
        <Typography size='xl'>Services</Typography>
        <FlexBox $direction='column' $gap={8} width='100%'>
          {formData.map((service, index) => (
            <ServiceForm
              key={index}
              index={index}
              service={service}
              onUpdate={(service) => handleUpdateService(index, service)}
              onRemove={() => handleRemoveService(index)}
            />
          ))}
          <FlexBox>
            <Typography className='cursor-pointer' color={'blue'} onClick={handleAddService}>
              + Add another Service
            </Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox $justifyContent='flex-end' width='100%'>
          <Button disabled={!isFormDataValid} onClick={handleSubmit}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default ServiceSetupModal
