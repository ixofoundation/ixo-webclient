import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, CodeMirror, Dropdown2, Input, NumberCounter } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress, isNonZeroBalance, validateJSON } from 'utils/validation'
import { NATIVE_DENOM } from 'constants/chains'
import type { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import type { MsgBeginRedelegate, MsgDelegate, MsgUndelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { TitleAndDescription } from './Component'
import { useValidators } from 'hooks/validator'

export enum AuthzExecActionTypes {
  Delegate = '/cosmos.staking.v1beta1.MsgDelegate',
  Undelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  Redelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  ClaimRewards = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  Custom = 'custom',
}

const inputHeight = '48px'
const ActionTypeOptions = [
  { value: AuthzExecActionTypes.Delegate, text: 'Stake' },
  { value: AuthzExecActionTypes.Undelegate, text: 'Unstake' },
  { value: AuthzExecActionTypes.Redelegate, text: 'Restake' },
  { value: AuthzExecActionTypes.ClaimRewards, text: 'Claim Rewards' },
  { value: AuthzExecActionTypes.Custom, text: 'Custom' },
]
export interface AuthzExecData {
  authzExecActionType: AuthzExecActionTypes
  delegate: MsgDelegate
  undelegate: MsgUndelegate
  redelegate: MsgBeginRedelegate
  claimRewards: MsgWithdrawDelegatorReward
  custom: string
}
const initialState: AuthzExecData = {
  authzExecActionType: AuthzExecActionTypes.Delegate,
  delegate: {
    amount: { denom: NATIVE_DENOM, amount: '0' },
    delegatorAddress: '',
    validatorAddress: '',
  },
  undelegate: {
    amount: { denom: NATIVE_DENOM, amount: '0' },
    delegatorAddress: '',
    validatorAddress: '',
  },
  redelegate: {
    delegatorAddress: '',
    validatorSrcAddress: '',
    validatorDstAddress: '',
    amount: { denom: NATIVE_DENOM, amount: '0' },
  },
  claimRewards: {
    delegatorAddress: '',
    validatorAddress: '',
  },
  custom: '[]',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupAuthzExecModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { validators } = useValidators()
  const [formData, setFormData] = useState<AuthzExecData>(initialState)

  const validate: boolean = useMemo(() => {
    switch (formData.authzExecActionType) {
      case AuthzExecActionTypes.Delegate: {
        const { delegate } = formData
        return (
          isNonZeroBalance(delegate.amount?.amount) &&
          !!delegate.amount?.denom &&
          isAccountAddress(delegate.delegatorAddress) &&
          isAccountAddress(delegate.validatorAddress, 'ixovaloper')
        )
      }
      case AuthzExecActionTypes.Undelegate: {
        const { undelegate } = formData
        return (
          isNonZeroBalance(undelegate.amount?.amount) &&
          !!undelegate.amount?.denom &&
          isAccountAddress(undelegate.delegatorAddress) &&
          isAccountAddress(undelegate.validatorAddress, 'ixovaloper')
        )
      }
      case AuthzExecActionTypes.Redelegate: {
        const { redelegate } = formData
        return (
          isNonZeroBalance(redelegate.amount?.amount) &&
          !!redelegate.amount?.denom &&
          isAccountAddress(redelegate.delegatorAddress) &&
          isAccountAddress(redelegate.validatorSrcAddress, 'ixovaloper') &&
          isAccountAddress(redelegate.validatorDstAddress, 'ixovaloper')
        )
      }
      case AuthzExecActionTypes.ClaimRewards: {
        const { claimRewards } = formData
        return (
          isAccountAddress(claimRewards.delegatorAddress) &&
          isAccountAddress(claimRewards.validatorAddress, 'ixovaloper')
        )
      }
      case AuthzExecActionTypes.Custom:
        return validateJSON(formData.custom)
      default:
        return false
    }
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

  const renderDelegateForm = () => {
    const { delegate } = formData

    const handleUpdateDelegateFormData = (key: string, value: any) => {
      handleUpdateFormData('delegate', { ...delegate, [key]: value })
    }
    return (
      <>
        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Delegator Address
          </Typography>
          <FlexBox width='100%' gap={4}>
            <Input
              name='delegator_address'
              height={inputHeight}
              placeholder='Enter Address'
              inputValue={delegate.delegatorAddress}
              handleChange={(value) => handleUpdateDelegateFormData('delegatorAddress', value)}
            />
            <AccountValidStatus address={delegate.delegatorAddress} style={{ flex: '0 0 48px' }} />
          </FlexBox>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Validator
          </Typography>
          <Dropdown2
            name={'validator'}
            value={delegate.validatorAddress}
            options={validators.map((validator) => ({
              value: validator.address,
              text: validator.moniker || validator.address,
            }))}
            placeholder='Select Validator'
            onChange={(e) => handleUpdateDelegateFormData('validatorAddress', e.target.value)}
            style={{ height: inputHeight }}
          />
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Choose Token Amount
          </Typography>
          <FlexBox alignItems='center' gap={2} width='100%'>
            <NumberCounter
              direction={'row-reverse'}
              height={inputHeight}
              value={Number(delegate.amount?.amount)}
              onChange={(value) =>
                handleUpdateDelegateFormData('amount', { ...(delegate.amount ?? {}), amount: value.toString() })
              }
            />
            {/* TODO: missing options */}
            <Dropdown2
              name={'token'}
              value={delegate.amount?.denom}
              options={[{ value: delegate.amount?.denom ?? '', text: '$IXO' }]}
              onChange={(e) =>
                handleUpdateDelegateFormData('amount', { ...(delegate.amount ?? {}), denom: e.target.value })
              }
              style={{ textAlign: 'center', height: inputHeight }}
            />
          </FlexBox>
        </FlexBox>
      </>
    )
  }
  const renderUndelegateForm = () => {
    const { undelegate } = formData

    const handleUpdateUndelegateFormData = (key: string, value: any) => {
      handleUpdateFormData('undelegate', { ...undelegate, [key]: value })
    }
    return (
      <>
        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Delegator Address
          </Typography>
          <FlexBox width='100%' gap={4}>
            <Input
              name='delegator_address'
              height={inputHeight}
              placeholder='Enter Address'
              inputValue={undelegate.delegatorAddress}
              handleChange={(value) => handleUpdateUndelegateFormData('delegatorAddress', value)}
            />
            <AccountValidStatus address={undelegate.delegatorAddress} style={{ flex: '0 0 48px' }} />
          </FlexBox>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Validator
          </Typography>
          <Dropdown2
            name={'validator'}
            value={undelegate.validatorAddress}
            options={validators.map((validator) => ({
              value: validator.address,
              text: validator.moniker || validator.address,
            }))}
            placeholder='Select Validator'
            onChange={(e) => handleUpdateUndelegateFormData('validatorAddress', e.target.value)}
            style={{ height: inputHeight }}
          />
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Choose Token Amount
          </Typography>
          <FlexBox alignItems='center' gap={2} width='100%'>
            <NumberCounter
              direction={'row-reverse'}
              height={inputHeight}
              value={Number(undelegate.amount?.amount)}
              onChange={(value) =>
                handleUpdateUndelegateFormData('amount', { ...(undelegate.amount ?? {}), amount: value.toString() })
              }
            />
            {/* TODO: missing options */}
            <Dropdown2
              name={'token'}
              value={undelegate.amount?.denom}
              options={[{ value: undelegate.amount?.denom ?? '', text: '$IXO' }]}
              hasArrow={false}
              onChange={(e) =>
                handleUpdateUndelegateFormData('amount', { ...(undelegate.amount ?? {}), denom: e.target.value })
              }
              style={{ textAlign: 'center', height: inputHeight }}
            />
          </FlexBox>
        </FlexBox>
      </>
    )
  }
  const renderRedelegateForm = () => {
    const { redelegate } = formData

    const handleUpdateRedelegateFormData = (key: string, value: any) => {
      handleUpdateFormData('redelegate', { ...redelegate, [key]: value })
    }
    return (
      <>
        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Delegator Address
          </Typography>
          <FlexBox width='100%' gap={4}>
            <Input
              name='delegator_address'
              height={inputHeight}
              placeholder='Enter Address'
              inputValue={redelegate.delegatorAddress}
              handleChange={(value) => handleUpdateRedelegateFormData('delegatorAddress', value)}
            />
            <AccountValidStatus address={redelegate.delegatorAddress} style={{ flex: '0 0 48px' }} />
          </FlexBox>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Source Validator
          </Typography>
          <Dropdown2
            name={'src_validator'}
            value={redelegate.validatorSrcAddress}
            options={validators.map((validator) => ({
              value: validator.address,
              text: validator.moniker || validator.address,
            }))}
            placeholder='Source Validator'
            onChange={(e) => handleUpdateRedelegateFormData('validatorSrcAddress', e.target.value)}
            style={{ height: inputHeight }}
          />
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Destination Validator
          </Typography>
          <Dropdown2
            name={'dst_validator'}
            value={redelegate.validatorDstAddress}
            options={validators.map((validator) => ({
              value: validator.address,
              text: validator.moniker || validator.address,
            }))}
            placeholder='Destination Validator'
            onChange={(e) => handleUpdateRedelegateFormData('validatorDstAddress', e.target.value)}
            style={{ height: inputHeight }}
          />
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Choose Token Amount
          </Typography>
          <FlexBox alignItems='center' gap={2} width='100%'>
            <NumberCounter
              direction={'row-reverse'}
              height={inputHeight}
              value={Number(redelegate.amount?.amount)}
              onChange={(value) =>
                handleUpdateRedelegateFormData('amount', { ...(redelegate.amount ?? {}), amount: value.toString() })
              }
            />
            {/* TODO: missing options */}
            <Dropdown2
              name={'token'}
              value={redelegate.amount?.denom}
              options={[{ value: redelegate.amount?.denom ?? '', text: '$IXO' }]}
              hasArrow={false}
              onChange={(e) =>
                handleUpdateRedelegateFormData('amount', { ...(redelegate.amount ?? {}), denom: e.target.value })
              }
              style={{ textAlign: 'center', height: inputHeight }}
            />
          </FlexBox>
        </FlexBox>
      </>
    )
  }
  const renderClaimRewardsForm = () => {
    const { claimRewards } = formData

    const handleUpdateClaimRewardsFormData = (key: string, value: any) => {
      handleUpdateFormData('claimRewards', { ...claimRewards, [key]: value })
    }
    return (
      <>
        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Delegator Address
          </Typography>
          <FlexBox width='100%' gap={4}>
            <Input
              name='delegator_address'
              height={inputHeight}
              placeholder='Enter Address'
              inputValue={claimRewards.delegatorAddress}
              handleChange={(value) => handleUpdateClaimRewardsFormData('delegatorAddress', value)}
            />
            <AccountValidStatus address={claimRewards.delegatorAddress} style={{ flex: '0 0 48px' }} />
          </FlexBox>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={2}>
          <Typography color='black' weight='medium' size='xl'>
            Validator
          </Typography>
          <Dropdown2
            name={'validator'}
            value={claimRewards.validatorAddress}
            options={validators.map((validator) => ({
              value: validator.address,
              text: validator.moniker || validator.address,
            }))}
            placeholder='Select Validator'
            onChange={(e) => handleUpdateClaimRewardsFormData('validatorAddress', e.target.value)}
            style={{ height: inputHeight }}
          />
        </FlexBox>
      </>
    )
  }
  const renderCustomForm = () => {
    return (
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          List of encoded messages
        </Typography>
        <CodeMirror value={formData.custom} onChange={(value) => handleUpdateFormData('custom', value)} />
      </FlexBox>
    )
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
        <TitleAndDescription
          title='Authz Exec Action Type'
          description='This is the type of action that will be executed on behalf of another account.'
        />
        <Dropdown2
          name='authz_exec_action_type'
          options={ActionTypeOptions}
          value={formData.authzExecActionType}
          onChange={(e) => handleUpdateFormData('authzExecActionType', e.target.value)}
        />
      </FlexBox>

      {formData.authzExecActionType === AuthzExecActionTypes.Delegate && renderDelegateForm()}
      {formData.authzExecActionType === AuthzExecActionTypes.Undelegate && renderUndelegateForm()}
      {formData.authzExecActionType === AuthzExecActionTypes.Redelegate && renderRedelegateForm()}
      {formData.authzExecActionType === AuthzExecActionTypes.ClaimRewards && renderClaimRewardsForm()}
      {formData.authzExecActionType === AuthzExecActionTypes.Custom && renderCustomForm()}
    </SetupActionModalTemplate>
  )
}

export default SetupAuthzExecModal
