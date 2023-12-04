import { FlexBox, SvgBox } from 'components/App/App.styles'
import useCurrentEntity from 'hooks/currentEntity'
import { Card } from 'pages/CurrentEntity/Components'
import { OracleCard } from 'components/EntityCards/OracleCard'
import React from 'react'
import { ReactComponent as PiePieceIcon } from 'assets/images/icon-pie-piece.svg'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import moment from 'moment'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock.svg'
import ClaimLocation from './ClaimLocation'
import { withEntityData } from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import LatestClaims from './LatestClaims'
import EvaluatedClaims from './EvaluatedClaims'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload?.timestamp
    const claims = payload[0].payload?.claims
    return (
      <FlexBox direction='column' background='#012131' borderRadius='4px' px={4} py={3} gap={1}>
        <Typography color='white' size='md' weight='bold'>
          {claims} verified
        </Typography>
        <Typography color='white' size='md' weight='bold'>
          {moment(timestamp).format('D MMM YYYY')}
        </Typography>
      </FlexBox>
    )
  }

  return null
}

const Overview: React.FC = () => {
  const theme: any = useTheme()
  const { currentEntity } = useCurrentEntity()

  const claimEvaluationData = [
    { claims: 1 },
    { claims: 2 },
    { claims: 3 },
    { claims: 4 },
    { claims: 5 },
    { claims: 6 },
    { claims: 7 },
  ]

  const renderOracleStats = () => (
    <Card icon={<PiePieceIcon />} label='Oracle Stats'>
      <FlexBox alignItems='center' gap={2}>
        <Typography size='md'>{currentEntity.id}</Typography>
        <CopyToClipboard text={currentEntity.id} onCopy={() => successToast(`Copied to clipboard`)}>
          <SvgBox cursor='pointer' svgWidth={4} svgHeight={4} color={theme.ixoNewBlue}>
            <CopyIcon />
          </SvgBox>
        </CopyToClipboard>
      </FlexBox>

      <FlexBox width='100%' background={theme.ixoWhite} height='1px' />

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Creator</Typography>
        <Typography size='md' color='blue'>
          Emerging Cooking Solutions
        </Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Created</Typography>
        <Typography size='md'>
          {moment(currentEntity.metadata?.created as unknown as string).format('DD MMM YYYY')}
        </Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Expires</Typography>
        <Typography size='md'>
          {moment(currentEntity.metadata?.created as unknown as string)
            .add(1, 'y')
            .format('DD MMM YYYY')}
        </Typography>
      </FlexBox>

      <FlexBox width='100%' background={theme.ixoWhite} height='1px' />

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Model</Typography>
        <Typography size='md'>Casual AI 01</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Claims Evaluated</Typography>
        <Typography size='md'>0</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Impact Verified</Typography>
        <Typography size='md'>0 kg CO2</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>CARBON generated</Typography>
        <Typography size='md'>0 CARBON</Typography>
      </FlexBox>
    </Card>
  )

  const renderCreditsVerified = () => (
    <Card icon={<PiePieceIcon />} label='Impact Credits Verified'>
      <FlexBox
        direction='column'
        alignItems='center'
        justifyContent='space-around'
        p={6}
        gap={8}
        width='100%'
        height='100%'
      >
        <FlexBox direction='column' justifyContent='center' alignItems='center' gap={4}>
          <FlexBox gap={2} alignItems='baseline'>
            <Typography size='5xl' color='blue'>
              0
            </Typography>
            <Typography size='xl' color='blue'>
              CARBON
            </Typography>
          </FlexBox>
          <FlexBox gap={2}>
            <Typography size='xl'>= 0 kg CO2 e verified</Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' gap={4}>
          <FlexBox
            direction='column'
            gap={2}
            alignItems='center'
            justifyContent='flex-end'
            p={4}
            width='100%'
            background='#012131'
          >
            <Typography color='blue' weight='bold' size='md'>
              Evaluated Claims
            </Typography>
            <Typography weight='bold' size='md'>
              0
            </Typography>
          </FlexBox>
          <FlexBox direction='column' gap={2} alignItems='center' p={4} width='100%' background='#012131'>
            <Typography color='blue' weight='bold' size='md'>
              Approved
            </Typography>
            <Typography weight='bold' size='md'>
              0%
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  )

  const renderClaimEvaluation = () => (
    <Card icon={<PiePieceIcon />} label='Claim Evaluation'>
      <FlexBox width='100%' justifyContent='flex-start'>
        <FlexBox gap={4}>
          <FlexBox border={`1px solid ${theme.ixoNewBlue}`} borderRadius='4px' py={1} px={4} cursor='pointer'>
            <Typography color='blue' size='md'>
              Impact Verified
            </Typography>
          </FlexBox>
          <FlexBox border={`1px solid ${theme.ixoNewBlue}`} borderRadius='4px' py={1} px={4} cursor='pointer'>
            <Typography color='blue' size='md'>
              Claims Evaluated
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={500} height={300} data={claimEvaluationData as any[]}>
          <defs>
            <linearGradient id='color' x1='0.5' y1='0' x2='0.5' y2='1'>
              <stop offset='0%' stopColor='#03d0fb' />
              <stop offset='100%' stopColor='#016480' />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id='background' x1='0.5' y1='0' x2='0.5' y2='1'>
              <stop offset='0%' stopColor='#01293C' />
              <stop offset='66%' stopColor='#033C50' />
            </linearGradient>
          </defs>
          <YAxis
            stroke={theme.ixoNewBlue + 88}
            axisLine={false}
            tickLine={false}
            // domain={[0, 20000]}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey='claims'
            fill='url(#color)'
            barSize={8}
            radius={[100, 100, 100, 100]}
            background={{ fill: 'url(#background)', radius: [100, 100, 100, 100] }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )

  const renderClaimLocations = () => (
    <Card icon={<PiePieceIcon />} label='Claim Locations'>
      <ClaimLocation />
    </Card>
  )

  const renderLatestClaims = () => (
    <Card icon={<PiePieceIcon />} label='Latest Claims'>
      <LatestClaims />
    </Card>
  )

  const renderEvaluatedClaims = () => (
    <Card label='Evaluated Claims' icon={<ClockIcon />}>
      <EvaluatedClaims />
    </Card>
  )

  const WrappedOracleCard = withEntityData(OracleCard)

  return (
    <FlexBox direction='column' width='100%' gap={6}>
      <FlexBox width='100%' alignItems='stretch' gap={6}>
        <FlexBox height='100%' style={{ flex: '0 0 300px' }}>
          <WrappedOracleCard {...currentEntity} />
        </FlexBox>
        {renderOracleStats()}
        {renderCreditsVerified()}
      </FlexBox>
      <FlexBox width='100%' height='320px'>
        {renderClaimEvaluation()}
      </FlexBox>
      <FlexBox width='100%' height='400px' gap={6}>
        {renderClaimLocations()}
        {renderLatestClaims()}
      </FlexBox>
      <FlexBox width='100%'>{renderEvaluatedClaims()}</FlexBox>
    </FlexBox>
  )
}

export default Overview
