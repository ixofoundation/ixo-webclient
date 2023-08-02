import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { CodeMirror, Dropdown, Input, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/entities'
import { isAccountAddress, validateJSON } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface TransferNftData {
  collection: string
  tokenId: string
  recipient: string

  // When true, uses `send` instead of `transfer_nft` to transfer the NFT.
  executeSmartContract: boolean
  smartContractMsg: string
}

const initialState: TransferNftData = {
  collection: '',
  tokenId: '',
  recipient: 'ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a',

  executeSmartContract: false,
  smartContractMsg: '{}',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupTransferNFTModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<TransferNftData>(initialState)

  const validate = useMemo(() => {
    if (formData.executeSmartContract && validateJSON(formData.smartContractMsg) !== true) {
      return false
    }
    return isAccountAddress(formData.collection) && isAccountAddress(formData.recipient) && !!formData.tokenId
  }, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
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
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl'>Select NFT to burn</Typography>
        <Dropdown
          name='nft'
          value={formData.collection}
          // TODO: NFT collection list
          options={[{ value: 'ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', text: 'NFT1' }]}
          placeholder={'Select NFT'}
          onChange={(e) => {
            handleUpdateFormData('collection', e.target.value)
            handleUpdateFormData('tokenId', 'tokenId') // TODO: tokenId value
          }}
        />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl'>Where would you like to transfer the NFT?</Typography>
        <Input name='wallet_address' inputValue={formData.recipient} disabled />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <FlexBox gap={4} alignItems='center'>
          <Typography size='xl'>Execute smart contract?</Typography>
          <Switch
            size='md'
            value={formData.executeSmartContract}
            onChange={(value) => handleUpdateFormData('executeSmartContract', value)}
          />
        </FlexBox>
        {formData.executeSmartContract && (
          <CodeMirror
            value={formData.smartContractMsg}
            onChange={(value) => handleUpdateFormData('smartContractMsg', value)}
          />
        )}
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupTransferNFTModal
