import { FlexBox } from 'components/App/App.styles'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { CodeMirror, Dropdown } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TProposalActionModel } from 'types/entities'
import { validateJSON } from 'utils/validation'
import { TitleAndDescription } from './Component'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export enum ValidatorActionType {
  CreateValidator = '/cosmos.staking.v1beta1.MsgCreateValidator',
  EditValidator = '/cosmos.staking.v1beta1.MsgEditValidator',
  UnjailValidator = '/cosmos.slashing.v1beta1.MsgUnjail',
  WithdrawValidatorCommission = '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
}
export interface ValidatorActionsData {
  validatorActionType: ValidatorActionType
  createMsg: string
  editMsg: string
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupValidatorActionsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  // TODO:
  const validatorAddress = 'ixovaloper1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qsjdevsm'

  const initialState: ValidatorActionsData = {
    validatorActionType: ValidatorActionType.WithdrawValidatorCommission,
    createMsg: JSON.stringify(
      {
        description: {
          moniker: '<validator name>',
          identity: '<optional identity signature (ex. UPort or Keybase)>',
          website: '<your validator website>',
          securityContact: '<optional security contact email>',
          details: '<description of your validator>',
        },
        commission: {
          rate: '50000000000000000',
          maxRate: '200000000000000000',
          maxChangeRate: '100000000000000000',
        },
        minSelfDelegation: '1',
        delegatorAddress: coreAddress,
        validatorAddress,
        pubkey: {
          typeUrl: '/cosmos.crypto.ed25519.PubKey',
          value: {
            key: '<the base64 public key of your node (junod tendermint show-validator)>',
          },
        },
        value: {
          denom: NATIVE_MICRODENOM,
          amount: '1000000',
        },
      },
      null,
      2,
    ),
    editMsg: JSON.stringify(
      {
        description: {
          moniker: '<validator name>',
          identity: '<optional identity signature (ex. UPort or Keybase)>',
          website: '<your validator website>',
          securityContact: '<optional security contact email>',
          details: '<description of your validator>',
        },
        commissionRate: '50000000000000000',
        minSelfDelegation: '1',
        validatorAddress,
      },
      null,
      2,
    ),
  }

  const [formData, setFormData] = useState<ValidatorActionsData>(initialState)
  const validate = useMemo(() => {
    switch (formData.validatorActionType) {
      case ValidatorActionType.WithdrawValidatorCommission:
      case ValidatorActionType.UnjailValidator:
        return true
      case ValidatorActionType.CreateValidator:
        return validateJSON(formData.createMsg)
      case ValidatorActionType.EditValidator:
        return validateJSON(formData.editMsg)
      default:
        return false
    }
  }, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      width='660px'
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%'>
        <Dropdown
          name='validator_action_type'
          value={formData.validatorActionType}
          options={[
            { value: ValidatorActionType.WithdrawValidatorCommission, text: 'Claim validator commission' },
            { value: ValidatorActionType.CreateValidator, text: 'Create a validator' },
            { value: ValidatorActionType.EditValidator, text: 'Edit validator' },
            { value: ValidatorActionType.UnjailValidator, text: 'Unjail validator' },
          ]}
          onChange={(e) => handleUpdateFormData('validatorActionType', e.target.value)}
        />
      </FlexBox>

      {formData.validatorActionType === ValidatorActionType.CreateValidator && (
        <FlexBox $direction='column' width='100%' $gap={2}>
          <TitleAndDescription
            title={`Create validator message`}
            description={`Create a Validator controlled by your DAO. Note: you will need to run a validator node (on a server for example). Be sure to use that node's public key (junod tendermint show-validator).`}
          />
          <CodeMirror value={formData.createMsg} onChange={(value) => handleUpdateFormData('createMsg', value)} />
        </FlexBox>
      )}
      {formData.validatorActionType === ValidatorActionType.EditValidator && (
        <FlexBox $direction='column' width='100%' $gap={2}>
          <TitleAndDescription
            title={`Edit validator message`}
            description={`Update the information of a validator controlled by your DAO.`}
          />
          <CodeMirror value={formData.editMsg} onChange={(value) => handleUpdateFormData('editMsg', value)} />
        </FlexBox>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupValidatorActionsModal
