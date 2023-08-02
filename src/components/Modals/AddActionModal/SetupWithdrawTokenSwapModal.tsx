import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

export interface WithdrawTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to enter an existing address. When `true`, it shows the
  // status of the swap. `tokenSwapContractAddress` should be defined and valid
  // when this is `true`.
  contractChosen: boolean
  tokenSwapContractAddress?: string
}

const initialState: WithdrawTokenSwapData = {
  contractChosen: false,
  tokenSwapContractAddress: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupWithdrawTokenSwapModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<WithdrawTokenSwapData>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.tokenSwapContractAddress), [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
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
      <FlexBox>
        <Typography size='md'>
          In this step, you will choose a token swap that you (or the counterparty) has already initiated. After you
          fund a swap, you can withdraw the tokens you funded unless (or until) the counterparty has paid. Likewise, the
          counterparty can withdraw the tokens they funded until you pay.
        </Typography>
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={2}>
        <Typography weight='medium' size='xl'>
          Existing token swap contract
        </Typography>

        <FlexBox width='100%' gap={4}>
          <Input
            name='token_swap_contract_address'
            placeholder='Paste Address'
            inputValue={formData.tokenSwapContractAddress}
            handleChange={(value) => handleUpdateFormData('tokenSwapContractAddress', value)}
          />
          <AccountValidStatus address={formData.tokenSwapContractAddress!} />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupWithdrawTokenSwapModal
