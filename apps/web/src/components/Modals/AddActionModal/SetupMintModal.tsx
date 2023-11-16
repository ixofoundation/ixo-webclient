import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

export interface MintData {
  to: string
  amount: number
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupMintModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const daoAddress = 'ixo1tdtlknd7teett06r3xcqflm8jevyuz50ph8atlfge0zkvf0e6gfqq8nafj'
  const govTokenAddress = 'ixo1tdtlknd7dz50ph8atlfge0zkvf0e6gfqq8nafj'
  const initialState: MintData = {
    to: daoAddress,
    amount: 1,
  }
  const [formData, setFormData] = useState<MintData>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.to) && !!formData.amount, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
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
      onSubmit={handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' gap={4}>
        <Input
          inputValue={formData.amount}
          handleChange={(value) => handleUpdateFormData('amount', value)}
          style={{ textAlign: 'right' }}
        />
        {/* TODO: missing options */}
        <Dropdown
          name={'token'}
          value={govTokenAddress}
          options={[{ value: govTokenAddress, text: '$RED' }]}
          onChange={() => {
            //
          }}
          style={{ textAlign: 'center' }}
          disabled
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
          inputValue={formData.to}
          handleChange={(value) => {
            handleUpdateFormData('to', value)
          }}
        />
        <AccountValidStatus address={formData.to} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupMintModal
