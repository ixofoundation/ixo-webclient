import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { useValidators } from 'hooks/validator'
import { Dropdown, Input } from 'screens/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/entities'
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
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupStakingActionsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { validators } = useValidators()
  const [formData, setFormData] = useState<StakeData>(initialState)

  const validate = useMemo(() => {
    if (formData.stakeType === StakeType.Redelegate && !isAccountAddress(formData.toValidator, 'ixovaloper')) {
      return false
    }
    return (
      !!formData.stakeType &&
      isAccountAddress(formData.validator, 'ixovaloper') &&
      !!formData.amount &&
      !!formData.denom
    )
  }, [formData])

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
      <FlexBox width='100%' $gap={2} $direction='column'>
        <Typography size='xl' weight='medium'>
          Select Action
        </Typography>
        <Dropdown
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

      {formData.stakeType !== StakeType.WithdrawDelegatorReward && (
        <FlexBox width='100%' $gap={4}>
          <Input
            inputValue={formData.amount}
            handleChange={(value) => handleUpdateFormData('amount', value)}
            style={{ textAlign: 'right' }}
          />
          {/* TODO: missing options */}
          <Dropdown
            name={'denom'}
            value={formData.denom}
            options={[{ value: formData.denom, text: '$IXO' }]}
            onChange={(e) => handleUpdateFormData('denom', e.target.value)}
          />
        </FlexBox>
      )}

      <FlexBox width='100%' $gap={2} $direction='column'>
        <Typography size='xl' weight='medium'>
          Stake with
        </Typography>
        <Dropdown
          name={'validator'}
          value={formData.validator}
          options={validators.map((validator) => ({
            value: validator.address,
            text: validator.moniker || validator.address,
          }))}
          placeholder='Select Validator'
          onChange={(e) => handleUpdateFormData('validator', e.target.value)}
        />
        {formData.validator && formData.stakeType === StakeType.Delegate && (
          <Typography size='md' weight='medium' color='grey700'>
            Balance: `Should Deposit Treasury`
          </Typography>
        )}
        {formData.validator &&
          (formData.stakeType === StakeType.Undelegate || formData.stakeType === StakeType.Redelegate) && (
            <Typography size='md' weight='medium' color='grey700'>
              Staked: `IDK`
            </Typography>
          )}
      </FlexBox>

      {formData.stakeType === StakeType.Redelegate && (
        <FlexBox width='100%' $gap={2} $direction='column'>
          <Typography size='xl' weight='medium'>
            To Validator
          </Typography>
          <Dropdown
            name={'to_validator'}
            value={formData.toValidator}
            options={validators.map((validator) => ({
              value: validator.address,
              text: validator.moniker || validator.address,
            }))}
            placeholder='Select Validator'
            onChange={(e) => handleUpdateFormData('toValidator', e.target.value)}
          />
        </FlexBox>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupStakingActionsModal
