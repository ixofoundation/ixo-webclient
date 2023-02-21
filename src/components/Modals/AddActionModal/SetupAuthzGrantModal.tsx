import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Input, Switch } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

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

  const validate = useMemo(
    () => formData.type && isAccountAddress(formData.granteeAddress) && formData.messageType,
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number | boolean) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
      validate={validate}
    >
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
    </SetupActionModalTemplate>
  )
}

export default SetupAuthzGrantModal
