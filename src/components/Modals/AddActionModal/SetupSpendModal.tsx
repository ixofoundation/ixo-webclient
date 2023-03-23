import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { TokenSelector } from './Component'

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
  action: TProposalActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupSpendModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<SpendData>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.to) && !!formData.amount && !!formData.denom, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    setFormData((data: SpendData) => ({ ...data, [key]: value }))
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
        <TokenSelector denom={formData.denom} onChange={(value) => handleUpdateFormData('denom', value)} />
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
