import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Button, CodeMirror, Input } from 'pages/CreateEntity/Components'
import { TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { TitleAndDescription } from './Component'

export interface ManageCw20Data {
  adding: boolean
  address: string
}
const initialState: ManageCw20Data = {
  adding: true,
  address: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageTreasuryTokensModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ManageCw20Data>(initialState)
  const tokenInfo = {
    name: 'Blue',
    symbol: 'BLUE',
    decimals: 6,
    total_supply: '42000000000000',
  }

  const validate = useMemo(() => isAccountAddress(formData.address), [formData])

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
        <Button
          variant={formData.adding ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('adding', true)}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Display Tokens
        </Button>
        <Button
          variant={!formData.adding ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('adding', false)}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Remove Tokens
        </Button>
      </FlexBox>

      {!formData.adding && (
        <FlexBox direction='column' width='100%' gap={2}>
          <TitleAndDescription title={`Existing Tokens`} />
        </FlexBox>
      )}

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title={`Token address`}
          description={
            formData.adding
              ? `Display the DAO's balance of a CW20 token in the treasury view.`
              : `Stop displaying the DAO's balance of a CW20 token in the treasury view.`
          }
        />

        <FlexBox width='100%' gap={4}>
          <Input
            name='token_contract_address'
            placeholder='Token Contract Address'
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

export default SetupManageTreasuryTokensModal
