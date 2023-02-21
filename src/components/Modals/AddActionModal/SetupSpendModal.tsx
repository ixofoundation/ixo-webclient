import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

const inputHeight = '48px'
const initialState = {
  token: {
    denom: '$IXO',
    amount: 1,
  },
  toAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupSpendModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.toAddress) && formData.token.amount, [formData])

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
      <FlexBox width='100%' gap={4}>
        <Input
          height={inputHeight}
          inputValue={formData.token?.amount}
          handleChange={(value) => handleUpdateFormData('token', { ...formData.token, amount: value })}
          style={{ textAlign: 'right' }}
        />
        {/* TODO: missing options */}
        <Dropdown
          name={'token'}
          value={formData.token?.denom}
          options={[formData.token?.denom]}
          hasArrow={false}
          onChange={(e) => handleUpdateFormData('token', { ...formData.token, denom: e.target.value })}
          style={{ textAlign: 'center', height: inputHeight }}
        />
      </FlexBox>

      <FlexBox width='100%'>
        <Typography weight='medium' size='xl'>
          will be send to
        </Typography>
      </FlexBox>

      <FlexBox width='100%' gap={4}>
        <Input
          name='to_address'
          height={inputHeight}
          placeholder='Paste Address'
          inputValue={formData.toAddress}
          handleChange={(value) => handleUpdateFormData('toAddress', value)}
        />
        <AccountValidStatus address={formData.toAddress} style={{ flex: `0 0 ${inputHeight}` }} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupSpendModal
