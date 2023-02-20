import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { AccountValidStatus, Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const initialState = {
  contractAddress: '',
  toAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupUpdateContractAdminModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <SetupActionModalTemplate open={open} action={action} onClose={onClose} onSubmit={handleConfirm}>
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl'>Transfer all Admin rights of the contract</Typography>
        <FlexBox width='100%' gap={4}>
          <Input
            name='contract_address'
            placeholder='Smart Contract Address'
            inputValue={formData.contractAddress}
            handleChange={(value) => handleUpdateFormData('contractAddress', value)}
          />
          <AccountValidStatus address={formData.contractAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl'>to the Address</Typography>
        <FlexBox width='100%' gap={4}>
          <Input
            name='to_address'
            placeholder='Paste Address'
            inputValue={formData.toAddress}
            handleChange={(value) => handleUpdateFormData('toAddress', value)}
          />
          <AccountValidStatus address={formData.toAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateContractAdminModal
