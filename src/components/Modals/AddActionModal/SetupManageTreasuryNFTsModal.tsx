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
  nftCollectionAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (action: TDeedActionModel) => void
}

const SetupManageTreasuryNFTsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.nftCollectionAddress), [formData])

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
          Display Collection
        </Button>
        <Button
          variant={formData.type === 'remove' ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('type', 'remove')}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Remove Collection
        </Button>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl' transform='capitalize'>
          {formData.type} NFT Collection in Treasury
        </Typography>

        <FlexBox width='100%' gap={4}>
          <Input
            name='collection_contract_address'
            height={inputHeight}
            placeholder='Collection Contract Address'
            inputValue={formData.nftCollectionAddress}
            handleChange={(value) => handleUpdateFormData('nftCollectionAddress', value)}
          />
          <AccountValidStatus address={formData.nftCollectionAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupManageTreasuryNFTsModal
