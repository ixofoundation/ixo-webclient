import { utils } from '@ixo/impactxclient-sdk'
import { Payments } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useIxoConfigs } from 'hooks/configs'
import { useCurrentEntityClaims } from 'hooks/currentEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo } from 'react'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { DurationUnits, DurationWithUnits } from 'types/dao'
import { convertNanoSecondsToSeconds, convertSecondsToDurationWithUnits } from 'utils/conversions'

interface Props {
  data: {
    claimId: string
    startDate: string
    endDate: string
    quota: string
    target: string
    protocolDeedId: string
    payments: Payments | undefined
  }
  hidden?: boolean
  onSubmit: () => void
  onCancel?: () => void
  loading: boolean
}
const ClaimCollectionCreationReviewStep: React.FC<Props> = ({ hidden, loading, data, onSubmit, onCancel }) => {
  const theme: any = useTheme()
  const { convertToDenom } = useIxoConfigs()
  const { claims } = useCurrentEntityClaims()
  const claim = claims[data.claimId]
  const protocolDeedEntity = useAppSelector(selectEntityById(data.protocolDeedId))

  const [timeouts, timeoutUnits] = useMemo(() => {
    if (!data.payments?.evaluation?.timeoutNs) {
      return [0, DurationUnits.Days]
    }
    const timeoutNS = utils.proto.fromDuration(data.payments.evaluation.timeoutNs)
    const seconds = convertNanoSecondsToSeconds(timeoutNS)
    const n: DurationWithUnits = convertSecondsToDurationWithUnits(Number(seconds))
    return [n.value, n.units]
  }, [data])

  if (hidden) {
    return null
  }

  return (
    <FlexBox direction='column'>
      <FlexBox direction='column' gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Review and Sign to create the Claim Collection
        </Typography>

        <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
          <Typography>Claim Protocol</Typography>
          <Typography color='blue'>{claim.template?.title ?? ''}</Typography>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox direction='column' gap={6} width='100%'>
          <Typography color='grey300'>Configuration</Typography>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Start Date</Typography>
            <Typography>{data.startDate}</Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>End Date</Typography>
            <Typography>{data.endDate}</Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Max Submissions</Typography>
            <Typography>{data.quota}</Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Approval Target</Typography>
            <Typography>{data.target}</Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox direction='column' gap={6} width='100%'>
          <Typography color='grey300'>Payments</Typography>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Payer Account</Typography>
            <Typography>{data.payments?.evaluation?.account ?? ''}</Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Oracle payment per processed claim</Typography>
            <Typography transform='uppercase'>
              {convertToDenom(data.payments?.evaluation?.amount[0])?.amount}{' '}
              {convertToDenom(data.payments?.evaluation?.amount[0])?.denom}
            </Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Payout per Submitted Claim</Typography>
            <Typography transform='uppercase'>
              {convertToDenom(data.payments?.submission?.amount[0])?.amount}{' '}
              {convertToDenom(data.payments?.submission?.amount[0])?.denom}
            </Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Payout per Approved Claim</Typography>
            <Typography transform='uppercase'>
              {convertToDenom(data.payments?.approval?.amount[0])?.amount}{' '}
              {convertToDenom(data.payments?.approval?.amount[0])?.denom}
            </Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Payout per Rejected Claim</Typography>
            <Typography transform='uppercase'>
              {convertToDenom(data.payments?.rejection?.amount[0])?.amount}{' '}
              {convertToDenom(data.payments?.rejection?.amount[0])?.denom}
            </Typography>
          </FlexBox>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Time Delay</Typography>
            <Typography transform='uppercase'>
              {timeouts} {timeoutUnits}
            </Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox direction='column' gap={6} width='100%'>
          <Typography color='grey300'>Agents</Typography>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography>Offer Application Form</Typography>
            <Typography color='blue' transform='capitalize'>
              {protocolDeedEntity?.profile?.name}
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox gap={5}>
        <Button variant='secondary' size='flex' width={200} onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' size='flex' width={200} loading={loading} onClick={onSubmit}>
          Sign to Create
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationReviewStep
