import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Button, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

export interface ManageCw721Data {
  adding: boolean
  address: string
}

const initialState: ManageCw721Data = {
  adding: true,
  address: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (action: TDeedActionModel) => void
}

const SetupManageTreasuryNFTsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ManageCw721Data>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.address), [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
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
          variant={formData.adding ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('adding', true)}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Display Collection
        </Button>
        <Button
          variant={!formData.adding ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('adding', false)}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Remove Collection
        </Button>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl' transform='capitalize'>
          {formData.adding ? 'Display' : 'Remove'} NFT Collection in Treasury
        </Typography>

        <FlexBox width='100%' gap={4}>
          <Input
            name='collection_contract_address'
            placeholder='Collection Contract Address'
            inputValue={formData.address}
            handleChange={(value) => handleUpdateFormData('address', value)}
          />
          <AccountValidStatus address={formData.address} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupManageTreasuryNFTsModal
