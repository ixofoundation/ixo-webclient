import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox, theme } from 'components/App/App.styles'
import { Dropdown } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const inputHeight = '48px'
const initialState = {
  nft: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupBurnNFTModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)
  const validate = useMemo(() => formData.nft, [formData])

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
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
      validate={validate}
    >
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Select NFT to burn
        </Typography>

        {/* TODO: missing options */}
        <Dropdown
          name={'nfts'}
          value={formData.nft}
          options={[]}
          hasArrow={false}
          placeholder={`You don't have any NFTs`}
          onChange={(e) => handleUpdateFormData('nft', e.target.value)}
          style={{ color: theme.ixoGrey700, height: inputHeight }}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupBurnNFTModal
