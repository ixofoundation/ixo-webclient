import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown2, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

export interface SpendData extends Coin {
  to: string
}

const initialState = {
  denom: 'uixo',
  amount: '1',
  to: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupSpendModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.to) && !!formData.amount && !!formData.denom, [formData])

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
          inputValue={formData.amount}
          handleChange={(value) => handleUpdateFormData('amount', value)}
          style={{ textAlign: 'right' }}
        />
        {/* TODO: missing options */}
        <Dropdown2
          name={'token'}
          value={formData.denom}
          options={[{ value: formData.denom, text: '$IXO' }]}
          hasArrow={false}
          onChange={(e) => handleUpdateFormData('denom', e.target.value)}
          style={{ textAlign: 'center' }}
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
          placeholder='Paste Address'
          inputValue={formData.to}
          handleChange={(value) => handleUpdateFormData('to', value)}
        />
        <AccountValidStatus address={formData.to} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupSpendModal
