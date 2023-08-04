import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown, Input, Switch } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { TitleAndDescription } from './Component'

export const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
export const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'
export const TYPE_URL_GENERIC_AUTHORIZATION = '/cosmos.authz.v1beta1.GenericAuthorization'

export enum AuthzGrantActionTypes {
  Delegate = '/cosmos.staking.v1beta1.MsgDelegate',
  Undelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  Redelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  ClaimRewards = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
}

const inputHeight = '48px'
export interface AuthzData {
  custom?: boolean
  typeUrl: string
  value: {
    grantee: string
    msgTypeUrl: string
  }
}

const initialState: AuthzData = {
  typeUrl: TYPE_URL_MSG_GRANT,
  value: {
    grantee: '',
    msgTypeUrl: AuthzGrantActionTypes.Delegate,
  },
  custom: false,
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupAuthzGrantModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<AuthzData>(initialState)

  const validate = useMemo(
    () => !!formData.typeUrl && isAccountAddress(formData.value.grantee) && !!formData.value.msgTypeUrl,
    [formData],
  )

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
        <Typography color='black' weight='medium' size='xl'>
          Grant or revoke authorization
        </Typography>
        <Dropdown
          name='grant_revoke_authorization'
          value={formData.typeUrl}
          options={[
            { value: TYPE_URL_MSG_GRANT, text: 'Grant authorization' },
            { value: TYPE_URL_MSG_REVOKE, text: 'Revoke authorization' },
          ]}
          onChange={(e) => handleUpdateFormData('typeUrl', e.target.value)}
        />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title='Grantee address'
          description='The address you are granting or revoking to execute a message on behalf of the DAO.'
        />

        <FlexBox width='100%' gap={4}>
          <Input
            name='grantee_address'
            height={inputHeight}
            placeholder='Enter Address'
            inputValue={formData.value.grantee}
            handleChange={(value) => handleUpdateFormData('value', { ...formData.value, grantee: value })}
          />
          <AccountValidStatus address={formData.value.grantee} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Message type
        </Typography>
        {formData.custom ? (
          <Input
            name='message_type'
            inputValue={formData.value.msgTypeUrl}
            handleChange={(value) => handleUpdateFormData('value', { ...formData.value, msgTypeUrl: value })}
          />
        ) : (
          <Dropdown
            name='message_type'
            options={[
              { value: AuthzGrantActionTypes.Delegate, text: 'Stake' },
              { value: AuthzGrantActionTypes.Undelegate, text: 'Unstake' },
              { value: AuthzGrantActionTypes.Redelegate, text: 'Restake' },
              { value: AuthzGrantActionTypes.ClaimRewards, text: 'Claim Rewards' },
            ]}
            value={formData.value.msgTypeUrl}
            onChange={(e) => handleUpdateFormData('value', { ...formData.value, msgTypeUrl: e.target.value })}
          />
        )}
      </FlexBox>

      <FlexBox gap={4} alignItems='center'>
        <Typography color='black' weight='medium' size='xl'>
          Use custom message type
        </Typography>

        <Switch
          size='sm'
          value={formData.custom ?? false}
          onChange={(value) => handleUpdateFormData('custom', value)}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupAuthzGrantModal
