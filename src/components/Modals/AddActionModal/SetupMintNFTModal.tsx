import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown2, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { InstantiateMsg, MintMsgForNullable_Empty } from 'types/dao'

export interface MintNftData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to create a new collection or enter an existing address.
  // When `true`, it shows the minting UI. `collectionAddress` should be defined
  // and valid when this is `true`.
  contractChosen: boolean
  // Set once collection created or chosen.
  collectionAddress?: string

  // Set when creating a new collection by InstantiateNftCollection component.
  instantiateMsg?: InstantiateMsg
  // Set when entering metadata for IPFS by UploadNftMetadata component.
  metadata?: {
    name: string
    description: string
    includeExtra: boolean
    extra: string
  }
  // Set after uploading metadata to IPFS by UploadNftMetadata component, for
  // displaying during final step by MintNft component.
  imageUrl?: string
  // Set in final step by MintNft component.
  mintMsg: MintMsgForNullable_Empty
}

const initialState: MintNftData = {
  contractChosen: false,
  collectionAddress: undefined,

  instantiateMsg: {
    minter: 'address',
    name: '',
    symbol: '',
  },
  metadata: {
    name: '',
    description: '',
    includeExtra: false,
    extra: '{}',
  },
  mintMsg: {
    owner: 'address',
    token_id: '',
    token_uri: '',
    amount: '1',
    recipient: '',
  },
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupMintNFTModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<MintNftData>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.collectionAddress) && !!formData.mintMsg.amount, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
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
      <FlexBox width='100%' gap={4}>
        <Input
          inputValue={formData.mintMsg.amount}
          handleChange={(value) => handleUpdateFormData('mintMsg', { ...formData.mintMsg, amount: value })}
          style={{ textAlign: 'right' }}
        />
        {/* TODO: missing options */}
        <Dropdown2
          name={'token'}
          value={'ixoabcdef'}
          options={[{ value: 'ixoabcdef', text: '$RED' }]}
          onChange={() => {
            //
          }}
          style={{ textAlign: 'center' }}
        />
      </FlexBox>

      <FlexBox width='100%'>
        <Typography weight='medium' size='xl'>
          will be mint to
        </Typography>
      </FlexBox>

      <FlexBox width='100%' gap={4}>
        <Input
          name='to_address'
          placeholder='Paste Address'
          inputValue={formData.mintMsg.recipient}
          handleChange={(value) => {
            handleUpdateFormData('mintMsg', { ...formData.mintMsg, recipient: value })
            handleUpdateFormData('collectionAddress', value)
          }}
        />
        <AccountValidStatus address={formData.mintMsg.recipient as string} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupMintNFTModal
