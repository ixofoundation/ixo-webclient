import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, Dropdown, InputWithLabel } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import { ixo, cosmos, utils } from '@ixo/impactxclient-sdk'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Payments } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { NATIVE_DENOM } from 'constants/chains'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { TokenSelector } from 'components/Modals/AddActionModal/Component'
import { useIxoConfigs } from 'hooks/configs'
import { DurationUnits } from 'types/dao'
import { convertDurationWithUnitsToSeconds, convertSecondsToNanoSeconds } from 'utils/conversions'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

interface Props {
  hidden?: boolean
  onSubmit: (payments: Payments) => void
  onCancel?: () => void
}
const ClaimCollectionCreationPaymentStep: React.FC<Props> = ({ hidden, onSubmit, onCancel }) => {
  const theme: any = useTheme()
  const { convertToMinimalDenom } = useIxoConfigs()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { accounts } = useAppSelector(getEntityById(entityId))
  const paymentsAccount = useCurrentEntityAdminAccount(accounts)
  const [timeouts, setTimeouts] = useState(0)
  const [timeoutUnits, setTimeoutUnits] = useState<DurationUnits>(DurationUnits.Days)
  const [approvalAmount, setApprovalAmount] = useState<Coin>({ amount: '', denom: NATIVE_DENOM })
  const [submissionAmount, setSubmissionAmount] = useState<Coin>({ amount: '', denom: NATIVE_DENOM })
  const [evaluationAmount, setEvaluationAmount] = useState<Coin>({ amount: '', denom: NATIVE_DENOM })
  const [rejectionAmount, setRejectionAmount] = useState<Coin>({ amount: '', denom: NATIVE_DENOM })

  const disabled = useMemo(
    () =>
      !approvalAmount.amount ||
      !submissionAmount.amount ||
      !evaluationAmount.amount ||
      !rejectionAmount.amount ||
      !timeouts,
    [approvalAmount.amount, evaluationAmount.amount, rejectionAmount.amount, submissionAmount.amount, timeouts],
  )

  const handleSubmit = () => {
    const seconds = convertDurationWithUnitsToSeconds({ units: timeoutUnits, value: timeouts })
    const timeoutNs = utils.proto.toDuration(convertSecondsToNanoSeconds(seconds)) // ns * seconds * minutes * hours * days
    const payments: Payments = ixo.claims.v1beta1.Payments.fromPartial({
      approval: ixo.claims.v1beta1.Payment.fromPartial({
        account: paymentsAccount,
        amount: [cosmos.base.v1beta1.Coin.fromPartial(convertToMinimalDenom(approvalAmount)!)],
        timeoutNs,
      }),
      submission: ixo.claims.v1beta1.Payment.fromPartial({
        account: paymentsAccount,
        amount: [cosmos.base.v1beta1.Coin.fromPartial(convertToMinimalDenom(submissionAmount)!)],
        timeoutNs,
      }),
      evaluation: ixo.claims.v1beta1.Payment.fromPartial({
        account: paymentsAccount,
        amount: [cosmos.base.v1beta1.Coin.fromPartial(convertToMinimalDenom(evaluationAmount)!)],
        timeoutNs,
      }),
      rejection: ixo.claims.v1beta1.Payment.fromPartial({
        account: paymentsAccount,
        amount: [cosmos.base.v1beta1.Coin.fromPartial(convertToMinimalDenom(rejectionAmount)!)],
        timeoutNs,
      }),
    })

    onSubmit(payments)
  }

  if (hidden) {
    return null
  }

  return (
    <FlexBox $direction='column'>
      <FlexBox $direction='column' $gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Set up the payments for the claim collection
        </Typography>

        <FlexBox $gap={6} width='100%' $justifyContent='space-between' $alignItems='center'>
          <Typography>Payer account</Typography>
          <Typography size='2xl'>{paymentsAccount}</Typography>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox $direction='column' $gap={6} width='100%'>
          <Typography>Oracle Payments</Typography>
          <FlexBox $gap={6} width='100%' $alignItems='center'>
            <InputWithLabel
              name='oraclePayments'
              height={'48px'}
              label={'Payment per evaluated claim'}
              inputValue={evaluationAmount.amount}
              handleChange={(amount: string): void => setEvaluationAmount((v) => ({ ...v, amount }))}
            />
            <FlexBox width='200px'>
              <TokenSelector
                denom={evaluationAmount.denom}
                onChange={(denom) => setEvaluationAmount((v) => ({ ...v, denom }))}
              />
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox $direction='column' $gap={6} width='100%'>
          <Typography>Service Payments</Typography>
          <FlexBox $gap={6} width='100%' $alignItems='center'>
            <InputWithLabel
              name='servicePayments'
              height={'48px'}
              label={'Payout for Submitted Claims'}
              inputValue={submissionAmount.amount}
              handleChange={(amount: string): void => setSubmissionAmount((v) => ({ ...v, amount }))}
            />
            <FlexBox width='200px'>
              <TokenSelector
                denom={submissionAmount.denom}
                onChange={(denom) => setSubmissionAmount((v) => ({ ...v, denom }))}
              />
            </FlexBox>
          </FlexBox>
          <FlexBox $gap={6} width='100%' $alignItems='center'>
            <InputWithLabel
              name='approvalPayments'
              height={'48px'}
              label={'Payout for Approved Claims'}
              inputValue={approvalAmount.amount}
              handleChange={(amount: string): void => setApprovalAmount((v) => ({ ...v, amount }))}
            />
            <FlexBox width='200px'>
              <TokenSelector
                denom={approvalAmount.denom}
                onChange={(denom) => setApprovalAmount((v) => ({ ...v, denom }))}
              />
            </FlexBox>
          </FlexBox>
          <FlexBox $gap={6} width='100%' $alignItems='center'>
            <InputWithLabel
              name='rejectionPayments'
              height={'48px'}
              label={'Payout for Rejected Claims'}
              inputValue={rejectionAmount.amount}
              handleChange={(amount: string): void => setRejectionAmount((v) => ({ ...v, amount }))}
            />
            <FlexBox width='200px'>
              <TokenSelector
                denom={rejectionAmount.denom}
                onChange={(denom) => setRejectionAmount((v) => ({ ...v, denom }))}
              />
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox $direction='column' $gap={6} width='100%'>
          <Typography>Payout time delay</Typography>
          <FlexBox $gap={6} width='100%' $alignItems='center'>
            <InputWithLabel
              name='timeouts'
              height={'48px'}
              label={'Time delay'}
              inputValue={timeouts}
              handleChange={(days: string): void => setTimeouts(Number(days))}
            />
            <FlexBox width='200px'>
              <Dropdown
                value={timeoutUnits}
                options={Object.entries(DurationUnits).map(([key, value]) => ({ text: key, value: value }))}
                onChange={(e) => setTimeoutUnits(e.target.value as DurationUnits)}
                style={{ textAlign: 'center' }}
              />
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />
      </FlexBox>

      <FlexBox $gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' disabled={disabled} onClick={handleSubmit}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationPaymentStep
