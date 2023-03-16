import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { Button, Dropdown2, Input, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DepositRefundPolicy } from 'types/dao'
import { TDeedActionModel } from 'types/protocol'
import { GenericToken } from 'types/tokens'
import { TitleAndDescription } from './Component'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface UpdatePreProposeConfigData {
  depositRequired: boolean
  depositInfo: {
    amount: string
    // Token input fields.
    type: 'native' | 'cw20' | 'voting_module_token'
    denomOrAddress: string
    // Loaded from token input fields to access metadata.
    token?: GenericToken
    refundPolicy: DepositRefundPolicy
  }
  anyoneCanPropose: boolean
}

export const initialPreProposeConfigState: UpdatePreProposeConfigData = {
  depositRequired: false, //  from previous
  depositInfo: {
    amount: '1',
    type: 'native',
    denomOrAddress: NATIVE_MICRODENOM,
    token: undefined,
    refundPolicy: DepositRefundPolicy.OnlyPassed,
  },
  anyoneCanPropose: false,
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupUpdateContractAdminModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  const { daoGroup } = useCurrentDaoGroup(coreAddress)
  const preProposeConfig = daoGroup?.proposalModule.preProposeConfig
  const [formData, setFormData] = useState<UpdatePreProposeConfigData>(initialPreProposeConfigState)

  const validate = useMemo(
    () => !formData.depositRequired || (!!formData.depositInfo.amount && !!formData.depositInfo.denomOrAddress),
    [formData],
  )

  useEffect(() => {
    if (action.data) {
      setFormData({ ...action.data })
    } else if (preProposeConfig) {
      setFormData({
        depositRequired: !!preProposeConfig.deposit_info,
        depositInfo: preProposeConfig.deposit_info
          ? {
              amount: preProposeConfig.deposit_info.amount,
              type: Object.keys(preProposeConfig.deposit_info.denom)[0] as 'native' | 'cw20' | 'voting_module_token',
              denomOrAddress: Object.values(preProposeConfig.deposit_info.denom)[0],
              refundPolicy: preProposeConfig.deposit_info.refund_policy as DepositRefundPolicy,
            }
          : initialPreProposeConfigState.depositInfo,
        anyoneCanPropose: preProposeConfig.open_proposal_submission,
      })
    }
  }, [preProposeConfig, action.data])

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
      <FlexBox>
        <Typography size='md'>
          This will update the admin for the selected contract. The new admin will have complete control over the
          contract. Take care. If you have questions, please feel free to ask in the IXO Discord.
        </Typography>
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={2}>
        <FlexBox width='100%' justifyContent='space-between'>
          <TitleAndDescription
            title={`Proposal deposit`}
            description='The number of tokens that must be deposited to create a proposal. Setting this may deter spam, but setting it too high may limit broad participation.'
          />

          <FlexBox alignItems='center' gap={4}>
            <Typography size='xl'>Enabled</Typography>
            <Switch
              value={formData.depositRequired}
              size='md'
              onChange={(value) => handleUpdateFormData('depositRequired', value)}
            />
          </FlexBox>
        </FlexBox>

        {formData.depositRequired && (
          <FlexBox width='100%' gap={4}>
            <Input
              inputValue={formData.depositInfo.amount}
              handleChange={(value) => handleUpdateFormData('depositInfo', { ...formData.depositInfo, amount: value })}
              style={{ textAlign: 'right' }}
            />
            {/* TODO: missing options */}
            <Dropdown2
              name={'depositInfo'}
              value={formData.depositInfo.denomOrAddress}
              options={[{ value: formData.depositInfo.denomOrAddress, text: '$IXO' }]}
              hasArrow={false}
              onChange={(e) =>
                handleUpdateFormData('depositInfo', { ...formData.depositInfo, denomOrAddress: e.target.value })
              }
            />
          </FlexBox>
        )}
      </FlexBox>

      {formData.depositRequired && (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl'>When should the deposit be returned?</Typography>
          <FlexBox width='100%' gap={4}>
            <Button
              variant={formData.depositInfo.refundPolicy === DepositRefundPolicy.Always ? 'primary' : 'secondary'}
              onClick={() =>
                handleUpdateFormData('depositInfo', {
                  ...formData.depositInfo,
                  refundPolicy: DepositRefundPolicy.Always,
                })
              }
              style={{ textTransform: 'unset' }}
            >
              Always
            </Button>
            <Button
              variant={formData.depositInfo.refundPolicy === DepositRefundPolicy.OnlyPassed ? 'primary' : 'secondary'}
              onClick={() =>
                handleUpdateFormData('depositInfo', {
                  ...formData.depositInfo,
                  refundPolicy: DepositRefundPolicy.OnlyPassed,
                })
              }
              style={{ textTransform: 'unset' }}
            >
              If it passes
            </Button>
            <Button
              variant={formData.depositInfo.refundPolicy === DepositRefundPolicy.Never ? 'primary' : 'secondary'}
              onClick={() =>
                handleUpdateFormData('depositInfo', {
                  ...formData.depositInfo,
                  refundPolicy: DepositRefundPolicy.Never,
                })
              }
              style={{ textTransform: 'unset' }}
            >
              Never
            </Button>
          </FlexBox>
        </FlexBox>
      )}

      <FlexBox width='100%' direction='column' gap={2}>
        <Typography size='xl'>Who can submit proposals?</Typography>
        <FlexBox width='100%' gap={4}>
          <Button
            variant={!formData.anyoneCanPropose ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('anyoneCanPropose', false)}
            style={{ textTransform: 'unset', width: '100%' }}
          >
            Only Members
          </Button>
          <Button
            variant={formData.anyoneCanPropose ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('anyoneCanPropose', true)}
            style={{ textTransform: 'unset', width: '100%' }}
          >
            Everyone
          </Button>
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateContractAdminModal
