import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown, Input, NumberCounter } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

const inputHeight = '48px'
const initialState = {
  type: '',
  delegatorAddress: '',
  validator: '',
  token: {
    amount: 1,
    denom: '$IXO',
  },
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupAuthzExecModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(
    () =>
      formData.type &&
      isAccountAddress(formData.delegatorAddress) &&
      formData.validator &&
      formData.token.amount &&
      formData.token.denom,
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
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
          Authz Exec Action Type
        </Typography>
        <Input
          name='authz_exec_action_type'
          height={inputHeight}
          placeholder='Stake'
          inputValue={formData.type}
          handleChange={(value) => handleUpdateFormData('type', value)}
        />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Delegator Address
        </Typography>
        <FlexBox width='100%' gap={4}>
          <Input
            name='delegator_address'
            height={inputHeight}
            placeholder='Enter Address'
            inputValue={formData.delegatorAddress}
            handleChange={(value) => handleUpdateFormData('delegatorAddress', value)}
          />
          <AccountValidStatus address={formData.delegatorAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Validator
        </Typography>
        <Input
          name='validator'
          height={inputHeight}
          placeholder='Select Validator'
          inputValue={formData.validator}
          handleChange={(value) => handleUpdateFormData('validator', value)}
        />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Choose Token Amount
        </Typography>
        <FlexBox alignItems='center' gap={2} width='100%'>
          <NumberCounter
            direction={'row-reverse'}
            height={inputHeight}
            value={formData.token.amount}
            onChange={(value) => handleUpdateFormData('token', { ...formData.token, amount: value })}
          />
          {/* TODO: missing options */}
          <Dropdown
            name={'token'}
            value={formData.token.denom}
            options={[formData.token.denom]}
            hasArrow={false}
            onChange={(e) => handleUpdateFormData('token', { ...formData.token, denom: e.target.value })}
            style={{ textAlign: 'center', height: inputHeight }}
          />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupAuthzExecModal
