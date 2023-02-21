import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Dropdown } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const initialState = {
  nft: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupTransferNFTModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => formData.nft, [formData])

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
        <Typography size='xl'>Select NFT to burn</Typography>
        <Dropdown
          name='nft'
          value={formData.nft}
          options={[]}
          hasArrow={false}
          placeholder={`You don't have any NFTs`}
          onChange={(e) => handleUpdateFormData('nft', e.target.value)}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupTransferNFTModal
