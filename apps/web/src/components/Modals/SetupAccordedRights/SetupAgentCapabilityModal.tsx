import Modal from 'react-modal'
// import { Modal } from '@mantine/core'

import { AccordedRight } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Flex } from '@mantine/core'
import { CloseButton, ModalBody, ModalRow, ModalStyles, ModalTitle, ModalWrapper } from 'components/Modals/styles'
import { useState } from 'react'
import { Button, InputWithLabel, PropertyBox } from 'screens/CreateEntity/Components'

interface Props {
  accordedRights: null | AccordedRight[]
  handleChange: (agentCapability: AccordedRight[]) => void
  isOpen: boolean
  onClose: () => void
}

function SetupAgentCapabilityModal({ accordedRights, handleChange ,isOpen,onClose }: Props): JSX.Element {
  const [selected, setSelected] = useState<AccordedRight | null>(null)
  const handleUpdate = (newAccordedRight: AccordedRight): void => {
    const allAccordedRights = accordedRights ?? []
    const accordedRightIdx = allAccordedRights.findIndex(
      (accordedRight) => accordedRight.type === newAccordedRight.type,
    )
    if (accordedRightIdx !== -1) {
      console.log('updating accordedRight', newAccordedRight)
      allAccordedRights[accordedRightIdx] = newAccordedRight
      return handleChange([...allAccordedRights])
    }

    return handleChange([...allAccordedRights, newAccordedRight])
  }

  const handleRemove = (type: string): void => {
    const allAccordedRights = accordedRights ?? []
    const accordedRightIdx = allAccordedRights.findIndex((accordedRight) => accordedRight.type === type)
    if (accordedRightIdx !== -1) {
      allAccordedRights.splice(accordedRightIdx, 1)
      return handleChange(allAccordedRights)
    }
  }
  return (
    <Modal style={ModalStyles as any} contentLabel='Modal' ariaHideApp={false} isOpen={isOpen}>
      <CloseButton
        onClick={() => {
          onClose()
        }}
      >
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Agent Capability</ModalTitle>
        <ModalBody>
          <ModalRow
            style={{
              justifyContent: 'start',
              flexDirection: 'row',
              flexWrap: 'wrap',
              overflowY: 'auto',
            }}
          >
            {selected ? (
              <Form
                onCancel={() => setSelected(null)}
                accordedRight={selected}
                onSave={(accordedRight) => {
                  handleUpdate(accordedRight)
                  setSelected(null)
                }}
              />
            ) : (
              options?.map((option) => (
                <PropertyBox
                  hovered={!!accordedRights?.find((accordedRight) => accordedRight.type === option.type)}
                  handleRemove={() => handleRemove(option.type)}
                  key={option.id}
                  label={formatLabel(option.type)}
                  handleClick={() =>
                    setSelected(accordedRights?.find((accordedRight) => accordedRight.type === option.type) ?? option)
                  }
                />
              ))
            )}
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default SetupAgentCapabilityModal

const Form = ({
  accordedRight,
  onSave,
  onCancel,
}: {
  accordedRight: AccordedRight
  onSave: (accordedRight: AccordedRight) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<AccordedRight>(accordedRight)

  return (
    <Flex direction={'column'} gap={12} w={'100%'}>
      {Object.entries(accordedRight).map(([key, value]: [string, keyof AccordedRight]) => (
        <InputWithLabel
          key={key}
          label={key}
          height='48px'
          defaultValue={value}
          inputValue={formData[key] ?? ''}
          handleChange={(value) => setFormData({ ...formData, [key]: value })}
        />
      ))}
      <Flex gap={12} w={'100%'} justify={'flex-end'}>
        <Button onClick={onCancel} variant='secondary'>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)} variant='primary'>
          save
        </Button>
      </Flex>
    </Flex>
  )
}

const formatLabel = (input: string): string => {
  // Split the string at '/'
  const parts = input.split('/')

  // Check if the second part exists
  if (parts.length > 1) {
    // Transform the second part to "Title Case"
    const transformed = parts[1].replace(/([a-z])([A-Z])/g, '$1 $2')
    return transformed.charAt(0).toUpperCase() + transformed.slice(1)
  }

  // Return an empty string or handle the case when the format is incorrect
  return ''
}

const options = [
  {
    id: '{id}#swapCarbon',
    type: 'capability/swapToken',
    message: 'MsgExecuteContract',
    service: 'ixo',
    mechanism: 'ixo17hvvkpuvrgr7zqjv4sg87dgsekxpynwgv6c6ggcv5xy7kt9tt86qmc5dnj',
  },
  {
    id: '{id}#retireCarbon',
    type: 'capability/retireToken',
    message: 'MsgRetireToken',
    service: 'ixo',
    mechanism: 'x/token',
  },
  {
    id: '{id}#cancelCarbon',
    type: 'capability/cancelToken',
    message: 'MsgCancelToken',
    service: 'ixo',
    mechanism: 'x/token',
  },
  {
    id: '{id}#mintCarbon',
    type: 'capability/mintToken',
    message: 'MsgMintToken',
    service: 'ixo',
    mechanism: 'x/token',
  },
  {
    id: '{id}#transferCarbon',
    type: 'capability/transferToken',
    message: 'MsgTransferToken',
    service: 'ixo',
    mechanism: 'x/token',
  },
  {
    id: '{id}#sendToken',
    type: 'capability/sendToken',
    message: 'MsgSend',
    service: 'ixo',
    mechanism: 'cosmos-sdk/MsgSend',
  },
  {
    id: '{id}#transferToken',
    type: 'capability/ibcTransfer',
    message: 'MsgTransfer',
    service: 'ixo',
    mechanism: 'ibc.applications.transfer.v1.MsgTransfer',
  },
]
