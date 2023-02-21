import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { AccountValidStatus, Button, Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import { isAccountAddress } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const initialState = {
  type: 'create', // | 'fund'
  tokenAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupTokenSwapModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.tokenAddress), [formData])

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
        <Button
          variant={formData.type === 'create' ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('type', 'create')}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Create Swap
        </Button>
        <Button
          variant={formData.type === 'fund' ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('type', 'fund')}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Fund Swap
        </Button>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl' transform='capitalize'>
          Token Swap to feed
        </Typography>

        <FlexBox width='100%' gap={4}>
          <Input
            name='token_contract_address'
            placeholder='Paste Address'
            inputValue={formData.tokenAddress}
            handleChange={(value) => handleUpdateFormData('tokenAddress', value)}
          />
          <AccountValidStatus address={formData.tokenAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupTokenSwapModal
