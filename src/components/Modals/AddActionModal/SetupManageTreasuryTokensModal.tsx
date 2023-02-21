import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Button, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

const inputHeight = '48px'
const initialState = {
  type: 'display', // | 'remove'
  tokenAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageTreasuryTokensModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.tokenAddress), [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string) => {
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
          variant={formData.type === 'display' ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('type', 'display')}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Display Tokens
        </Button>
        <Button
          variant={formData.type === 'remove' ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('type', 'remove')}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Remove Tokens
        </Button>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl' transform='capitalize'>
          {formData.type} Token Balance in Treasury
        </Typography>

        <FlexBox width='100%' gap={4}>
          <Input
            name='token_contract_address'
            height={inputHeight}
            placeholder='Token Contract Address'
            inputValue={formData.tokenAddress}
            handleChange={(value) => handleUpdateFormData('tokenAddress', value)}
          />
          <AccountValidStatus address={formData.tokenAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupManageTreasuryTokensModal
