import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { Dropdown2, Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import { StakeType } from 'utils/messages'
import { isAccountAddress } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface StakeData {
  stakeType: StakeType
  validator: string
  // For use when redelegating.
  toValidator: string
  amount: string
  denom: string
}
const initialState: StakeData = {
  stakeType: StakeType.Delegate,
  amount: '1',
  denom: NATIVE_MICRODENOM,
  validator: '',
  toValidator: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupStakingActionsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<StakeData>(initialState)

  const validate = useMemo(() => {
    if (formData.stakeType === StakeType.Redelegate && !isAccountAddress(formData.toValidator)) {
      return false
    }
    return !!formData.stakeType && isAccountAddress(formData.validator) && !!formData.amount && !!formData.denom
  }, [formData])

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
      <FlexBox width='100%' gap={2} direction='column'>
        <Typography size='xl' weight='medium'>
          Select Action
        </Typography>
        <Dropdown2
          name='stake'
          value={formData.stakeType}
          options={[
            { value: StakeType.Delegate, text: 'Stake' },
            { value: StakeType.Undelegate, text: 'Unstake' },
            { value: StakeType.Redelegate, text: 'Restake' },
            { value: StakeType.WithdrawDelegatorReward, text: 'Claim Rewards' },
          ]}
          onChange={(e) => handleUpdateFormData('stakeType', e.target.value)}
        />
      </FlexBox>

      <FlexBox width='100%' gap={4}>
        <Input
          inputValue={formData.amount}
          handleChange={(value) => handleUpdateFormData('amount', value)}
          style={{ textAlign: 'right' }}
        />
        {/* TODO: missing options */}
        <Dropdown2
          name={'denom'}
          value={formData.denom}
          options={[{ value: formData.denom, text: '$IXO' }]}
          onChange={(e) => handleUpdateFormData('denom', e.target.value)}
        />
      </FlexBox>

      <FlexBox width='100%' gap={2} direction='column'>
        <Typography size='xl' weight='medium'>
          Stake with
        </Typography>
        <Dropdown2
          name='validator'
          value={formData.validator}
          options={[{ value: 'ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', text: 'Validator1' }]}
          placeholder='Select Validator'
          onChange={(e) => handleUpdateFormData('validator', e.target.value)}
        />
      </FlexBox>

      {formData.stakeType === StakeType.Redelegate && (
        <FlexBox width='100%' gap={2} direction='column'>
          <Typography size='xl' weight='medium'>
            To Validator
          </Typography>
          <Dropdown2
            name='to_validator'
            value={formData.toValidator}
            options={[{ value: 'ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', text: 'Validator1' }]}
            placeholder='Select Validator'
            onChange={(e) => handleUpdateFormData('toValidator', e.target.value)}
          />
        </FlexBox>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupStakingActionsModal
