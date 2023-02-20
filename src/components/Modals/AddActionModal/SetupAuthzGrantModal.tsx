import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { AccountValidStatus, Button, Input, Switch } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'

const inputHeight = '48px'
const initialState = {
  type: '',
  granteeAddress: '',
  messageType: '',
  customMessageType: false,
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupAuthzGrantModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)
  const Icon = DeedActionConfig[action.group].items[action.type].icon

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number | boolean) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={8} width='440px'>
        <FlexBox alignItems='center' gap={2}>
          <SvgBox color={theme.ixoBlack} svgWidth={8} svgHeight={8}>
            <Icon />
          </SvgBox>
          <Typography weight='medium' size='xl'>
            {action.type}
          </Typography>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={4}>
          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              Grant or revoke authorization
            </Typography>

            <Input
              name='grant_revoke_authorization'
              height={inputHeight}
              placeholder='Stake'
              inputValue={formData.type}
              handleChange={(value) => handleUpdateFormData('type', value)}
            />
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              Grantee address
            </Typography>
            <FlexBox width='100%' gap={4}>
              <Input
                name='grantee_address'
                height={inputHeight}
                placeholder='Enter Address'
                inputValue={formData.granteeAddress}
                handleChange={(value) => handleUpdateFormData('granteeAddress', value)}
              />
              <AccountValidStatus address={formData.granteeAddress} style={{ flex: '0 0 48px' }} />
            </FlexBox>
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              Message type
            </Typography>
            <Input
              name='message_type'
              height={inputHeight}
              placeholder='Stake'
              inputValue={formData.messageType}
              handleChange={(value) => handleUpdateFormData('messageType', value)}
            />
          </FlexBox>

          <FlexBox gap={4} alignItems='center'>
            <Typography color='black' weight='medium' size='xl'>
              Use custom message type
            </Typography>

            <Switch
              size='sm'
              value={formData.customMessageType}
              onChange={(value) => handleUpdateFormData('customMessageType', value)}
            />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%'>
          <Button variant='primary' onClick={handleConfirm} style={{ width: '100%' }}>
            Confirm
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default SetupAuthzGrantModal
