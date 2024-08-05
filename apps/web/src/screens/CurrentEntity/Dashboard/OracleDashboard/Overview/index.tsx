import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Card } from 'screens/CurrentEntity/Components'
import { OracleCard } from 'components/EntityCards/OracleCard'
import React from 'react'
import { ReactComponent as PiePieceIcon } from '/public/assets/images/icon-pie-piece.svg'
import { Typography } from 'components/Typography'
import { useMantineTheme } from '@mantine/core'
import { ReactComponent as CopyIcon } from '/public/assets/images/icon-copy.svg'
import moment from 'moment'
import { ReactComponent as ClockIcon } from '/public/assets/images/icon-clock.svg'
// import ClaimLocation from './ClaimLocation'
import { withEntityData } from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
// import LatestClaims from './LatestClaims'
import EvaluatedClaims from './EvaluatedClaims'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import CountUp from 'react-countup'
import OracleClaimEvaluation from 'components/Graphs/OracleClaimEvaluation'
import { useCarbonOracleClaimAggregate } from 'hooks/oracle/useCarbonOracleClaimAggregate'

const Overview: React.FC = () => {
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))

  const { minted, totalEvaluatedClaims, approvedPercentage, evaluationsData, evaluatedClaims } =
    useCarbonOracleClaimAggregate({
      entityIds: [entityId],
    })

  const model = currentEntity.profile?.attributes?.find((attr) => attr.key === 'Mechanism')?.value
  const creator = currentEntity.profile?.brand
  const startDate = currentEntity.startDate
  const endDate = currentEntity.endDate

  const oracleEntity = { ...currentEntity, metrics: { minted, totalEvaluatedClaims, approvedPercentage } }

  const renderOracleStats = () => (
    <Card icon={<PiePieceIcon />} label='Oracle Stats'>
      <FlexBox $alignItems='center' $gap={2}>
        <Typography size='md'>{currentEntity.id}</Typography>
        <CopyToClipboard text={currentEntity.id} onCopy={() => successToast(`Copied to clipboard`)}>
          <SvgBox cursor='pointer' $svgWidth={4} $svgHeight={4} color={theme.ixoNewBlue}>
            <CopyIcon />
          </SvgBox>
        </CopyToClipboard>
      </FlexBox>

      <FlexBox width='100%' background={theme.ixoWhite} height='1px' />

      <FlexBox width='100%' $justifyContent='space-between'>
        <Typography size='md'>Creator</Typography>
        <Typography size='md' color='blue'>
          {creator}
        </Typography>
      </FlexBox>

      <FlexBox width='100%' $justifyContent='space-between'>
        <Typography size='md'>Created</Typography>
        <Typography size='md'>{moment(startDate as any).format('DD MMM YYYY')}</Typography>
      </FlexBox>

      {endDate && (
        <FlexBox width='100%' $justifyContent='space-between'>
          <Typography size='md'>Expires</Typography>
          <Typography size='md'>{moment(endDate as any).format('DD MMM YYYY')}</Typography>
        </FlexBox>
      )}

      <FlexBox width='100%' background={theme.ixoWhite} height='1px' />

      {model && (
        <FlexBox width='100%' $justifyContent='space-between'>
          <Typography size='md'>Model</Typography>
          <Typography size='md'>{model}</Typography>
        </FlexBox>
      )}

      <FlexBox width='100%' $justifyContent='space-between'>
        <Typography size='md'>Claims Evaluated</Typography>
        <Typography size='md'>{totalEvaluatedClaims}</Typography>
      </FlexBox>

      <FlexBox width='100%' $justifyContent='space-between'>
        <Typography size='md'>Impact Verified</Typography>
        <Typography size='md'>
          <CountUp end={minted} duration={2} /> kg CO2
        </Typography>
      </FlexBox>

      <FlexBox width='100%' $justifyContent='space-between'>
        <Typography size='md'>CARBON generated</Typography>
        <Typography size='md'>
          <CountUp end={minted} duration={2} /> CARBON
        </Typography>
      </FlexBox>
    </Card>
  )

  const renderCreditsVerified = () => (
    <Card icon={<PiePieceIcon />} label='Impact Credits Verified'>
      <FlexBox
        $direction='column'
        $alignItems='center'
        $justifyContent='space-around'
        p={6}
        $gap={8}
        width='100%'
        height='100%'
      >
        <FlexBox $direction='column' $justifyContent='center' $alignItems='center' $gap={4}>
          <FlexBox $gap={2} $alignItems='baseline'>
            <Typography size='5xl' color='blue'>
              <CountUp end={minted} duration={2} />
            </Typography>
            <Typography size='xl' color='blue'>
              CARBON
            </Typography>
          </FlexBox>
          <FlexBox $gap={2}>
            <Typography size='xl'>
              = <CountUp end={minted} duration={2} /> kg CO2 e verified
            </Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' $gap={4}>
          <FlexBox
            $direction='column'
            $gap={2}
            $alignItems='center'
            $justifyContent='flex-end'
            p={4}
            width='100%'
            background='#012131'
          >
            <Typography color='blue' weight='bold' size='md'>
              Evaluated Claims
            </Typography>
            <Typography weight='bold' size='md'>
              {totalEvaluatedClaims}
            </Typography>
          </FlexBox>
          <FlexBox $direction='column' $gap={2} $alignItems='center' p={4} width='100%' background='#012131'>
            <Typography color='blue' weight='bold' size='md'>
              Approved
            </Typography>
            <Typography weight='bold' size='md'>
              {approvedPercentage.toFixed(2)}%
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  )

  const renderClaimEvaluation = () => (
    <Card icon={<PiePieceIcon />} label='Claim Evaluation'>
      <FlexBox width='100%' $justifyContent='flex-start'>
        <FlexBox $gap={4}>
          <FlexBox border={`1px solid ${theme.ixoNewBlue}`} $borderRadius='4px' py={1} px={4} cursor='pointer'>
            <Typography color='blue' size='md'>
              Impact Verified
            </Typography>
          </FlexBox>
          <FlexBox border={`1px solid ${theme.ixoNewBlue}`} $borderRadius='4px' py={1} px={4} cursor='pointer'>
            <Typography color='blue' size='md'>
              Claims Evaluated
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <OracleClaimEvaluation evaluations={evaluationsData?.evaluations?.nodes ?? []} />
    </Card>
  )

  // const renderClaimLocations = () => (
  //   <Card icon={<PiePieceIcon />} label='Claim Locations'>
  //     <ClaimLocation />
  //   </Card>
  // )

  // const renderLatestClaims = () => (
  //   <Card icon={<PiePieceIcon />} label='Latest Claims'>
  //     <LatestClaims />
  //   </Card>
  // )

  const renderEvaluatedClaims = () => (
    <Card label='Evaluated Claims' icon={<ClockIcon />}>
      <EvaluatedClaims evaluatedClaims={(evaluatedClaims ?? []) as any} />
    </Card>
  )

  const WrappedOracleCard = withEntityData(OracleCard)

  return (
    <FlexBox $direction='column' width='100%' $gap={6}>
      <FlexBox width='100%' $alignItems='stretch' $gap={6}>
        <FlexBox height='100%' style={{ flex: '0 0 300px' }}>
          <WrappedOracleCard entity={oracleEntity} />
        </FlexBox>
        {renderOracleStats()}
        {renderCreditsVerified()}
      </FlexBox>
      <FlexBox width='100%' height='320px'>
        {renderClaimEvaluation()}
      </FlexBox>
      {/* <FlexBox width='100%' height='400px' $gap={6}>
        {renderClaimLocations()}
        {renderLatestClaims()}
      </FlexBox> */}
      <FlexBox width='100%'>{renderEvaluatedClaims()}</FlexBox>
    </FlexBox>
  )
}

export default Overview
