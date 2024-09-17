import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Dropdown } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
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
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupBurnNFTModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<BurnNftData>(initialState)
  const validate = useMemo(() => !!formData.collection && !!formData.tokenId, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    onSubmit && setFormData((data) => ({ ...data, [key]: value }))
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
      <FlexBox $direction='column' width='100%' $gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Select NFT to burn
        </Typography>

        {/* TODO: missing options */}
        <Dropdown
          name={'collections'}
          value={formData.tokenId}
          options={[]}
          $hasArrow={false}
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
