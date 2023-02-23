import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { Dropdown } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

/**
 * @example
    const useDefaults: UseDefaults<BurnNftData> = () => ({
      collection: '',
      tokenId: '',
    })
 */
export interface BurnNftData {
  collection: string
  tokenId: string
}
const initialState: BurnNftData = {
  collection: '',
  tokenId: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupBurnNFTModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<BurnNftData>(initialState)
  const validate = useMemo(() => !!formData.collection && !!formData.tokenId, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    setFormData((data) => ({ ...data, [key]: value }))
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
        <Typography color='black' weight='medium' size='xl'>
          Select NFT to burn
        </Typography>

        {/* TODO: missing options */}
        <Dropdown
          name={'collections'}
          value={formData.tokenId}
          options={['ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', 'ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84b']}
          hasArrow={false}
          placeholder={`You don't have any NFTs`}
          onChange={(e) => {
            handleUpdateFormData('tokenId', e.target.value)
            handleUpdateFormData('collection', e.target.value)
          }}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupBurnNFTModal
