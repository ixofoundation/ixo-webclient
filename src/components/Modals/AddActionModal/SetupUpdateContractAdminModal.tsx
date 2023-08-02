import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { AccountValidStatus, Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/entities'
import { isAccountAddress } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface UpdateAdminData {
  contract: string
  newAdmin: string
}
const initialState: UpdateAdminData = {
  contract: '',
  newAdmin: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupUpdateContractAdminModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<UpdateAdminData>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.contract) && isAccountAddress(formData.newAdmin), [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox>
        <Typography size='md'>
          This will update the admin for the selected contract. The new admin will have complete control over the
          contract. Take care.
        </Typography>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl'>Transfer all Admin rights of the contract</Typography>
        <FlexBox width='100%' gap={4}>
          <Input
            name='contract_address'
            placeholder='Smart Contract Address'
            inputValue={formData.contract}
            handleChange={(value) => handleUpdateFormData('contract', value)}
          />
          <AccountValidStatus address={formData.contract} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl'>to the Address</Typography>
        <FlexBox width='100%' gap={4}>
          <Input
            name='to_address'
            placeholder='Paste Address'
            inputValue={formData.newAdmin}
            handleChange={(value) => handleUpdateFormData('newAdmin', value)}
          />
          <AccountValidStatus address={formData.newAdmin} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateContractAdminModal
