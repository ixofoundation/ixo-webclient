import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Button, CodeMirror, Input } from 'pages/CreateEntity/Components'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { TitleAndDescription } from './Component'

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
  // TODO:
  const tokenInfo = { name: 'RED', symbol: 'RED' }

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

      {!formData.adding && (
        <FlexBox direction='column' width='100%' gap={2}>
          <TitleAndDescription title={`Existing Tokens`} />
        </FlexBox>
      )}

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title={`Collection address`}
          description={
            formData.adding
              ? 'Display the NFTs owned by the DAO from a CW721 NFT collection in the treasury view.'
              : 'Stop displaying the NFTs owned by the DAO from a CW721 NFT collection in the treasury view.'
          }
        />

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

      {isAccountAddress(formData.address) && (
        <FlexBox direction='column' width='100%' gap={2}>
          <TitleAndDescription title={`Token info`} />
          <CodeMirror value={JSON.stringify(tokenInfo, null, 2)} readOnly />
        </FlexBox>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupManageTreasuryNFTsModal
