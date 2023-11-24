import { FlexBox, SvgBox } from 'components/App/App.styles'
import useCurrentEntity from 'hooks/currentEntity'
import { Card } from 'pages/CurrentEntity/Components'
import OracleCard from 'pages/EntitiesExplorer/Components/EntityCard/OracleCard/OracleCard'
import React from 'react'
import { ReactComponent as PiePieceIcon } from 'assets/images/icon-pie-piece.svg'
import { Typography } from 'components/Typography'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import moment from 'moment'
import { useClaimSetting } from 'hooks/claim'
import { ixo } from '@ixo/impactxclient-sdk'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock.svg'
import Table, { renderTableHeader } from 'components/Table/Table'
import { truncateString } from 'utils/formatters'
import { ReactComponent as IXOIcon } from 'assets/images/icon-ixo.svg'
import { ReactComponent as EyeIcon } from 'assets/images/icon-eye.svg'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 4px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }
  }
`

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
  const Setting = useClaimSetting()
  const columns = [
    {
      Header: renderTableHeader('Date Status'),
      accessor: 'timestamp',
      sortable: true,
      renderCell: (cell: any) => {
        const status = cell.row.original?.status
        return (
          <FlexBox p={5} position={'relative'}>
            <FlexBox
              position='absolute'
              top={'50%'}
              left={'0px'}
              transform='translate(-50%, -50%)'
              width='12px'
              height='40px'
              borderRadius='100px'
              background={theme[status] ?? theme.rejected}
            />
            <Typography color='white'>
              {'3h 45m'}{' '}
              <Typography color='light-blue' size='md'>
                ago
              </Typography>
            </Typography>
          </FlexBox>
        )
      },
    },
    {
      Header: renderTableHeader('Action'),
      accessor: 'action',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>Claim Approved</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Asset'),
      accessor: 'asset',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>Supamoto #123</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Impact'),
      accessor: 'impact',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography>235 kgCO2e</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Proof'),
      accessor: 'proof',
      renderCell: (cell: any) => (
        <FlexBox p={5}>
          <Typography color='blue'>{truncateString('ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm965', 10)}</Typography>
        </FlexBox>
      ),
    },
    {
      Header: renderTableHeader('Value'),
      accessor: 'value',
      renderCell: (cell: any) => (
        <FlexBox height='100%'>
          <FlexBox width='100%' height='100%' p={5} alignItems='center' background={theme.ixoNavyBlue} gap={2.5}>
            <IXOIcon />
            <Typography weight='bold'>235 CARBON</Typography>
          </FlexBox>
          <FlexBox height='100%' alignItems='center' background={theme.ixoMediumBlue}>
            <SvgBox width='60px' alignItems='center' justifyContent='center' color={theme.ixoNewBlue} svgWidth={5.5}>
              <EyeIcon />
            </SvgBox>
          </FlexBox>
        </FlexBox>
      ),
    },
  ]

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
        <Typography size='md'>did:ixosdjfo123124523414124124e45u987</Typography>
        <SvgBox cursor='pointer' svgWidth={4} svgHeight={4} color={theme.ixoNewBlue}>
          <CopyIcon />
        </SvgBox>
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
        <Typography size='md'>13 Apr 2023</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Expires</Typography>
        <Typography size='md'>13 Apr 2024</Typography>
      </FlexBox>

      <FlexBox width='100%' background={theme.ixoWhite} height='1px' />

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Model</Typography>
        <Typography size='md'>Casual AI 01</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Claims Evaluated</Typography>
        <Typography size='md'>1,254</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>Impact Verified</Typography>
        <Typography size='md'>1,322,123 kg CO2</Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between'>
        <Typography size='md'>CARBON generated</Typography>
        <Typography size='md'>1,324 CARBON</Typography>
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
              1,200,000
            </Typography>
            <Typography size='xl' color='blue'>
              CARBON
            </Typography>
          </FlexBox>
          <FlexBox gap={2}>
            <Typography size='xl'>= 1,200,000 kg CO2 e verified</Typography>
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
              1,200
            </Typography>
          </FlexBox>
          <FlexBox direction='column' gap={2} alignItems='center' p={4} width='100%' background='#012131'>
            <Typography color='blue' weight='bold' size='md'>
              Approved
            </Typography>
            <Typography weight='bold' size='md'>
              95.2%
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
      Map
    </Card>
  )

  const renderLatestClaims = () => (
    <Card icon={<PiePieceIcon />} label='Latest Claims'>
      <FlexBox direction='column' width='100%' gap={4}>
        <FlexBox
          direction='column'
          width='100%'
          height='70px'
          borderRadius='4px'
          background={'#002D42'}
          justifyContent='center'
          cursor='pointer'
          px={8}
          position='relative'
        >
          <FlexBox
            position='absolute'
            top='50%'
            left='0px'
            transform='translate(-50%, -50%)'
            width='8px'
            height='24px'
            background={Setting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color}
            borderRadius='100px'
          />

          <Typography color='white' size='base'>
            Fuel Purchase Claim
          </Typography>
          <Typography color='blue' size='sm'>
            30 kg
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card>
  )

  const renderEvaluatedClaims = () => (
    <Card label='Evaluated Claims' icon={<ClockIcon />}>
      <TableWrapper>
        <Table
          columns={columns}
          data={[{}]}
          getRowProps={() => ({ style: { height: 70 } })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </Card>
  )

  return (
    <FlexBox direction='column' width='100%' gap={6}>
      <FlexBox width='100%' height='520px' alignItems='stretch' gap={6}>
        <FlexBox style={{ flex: '0 0 300px' }}>
          <OracleCard {...currentEntity} />
        </FlexBox>
        {renderOracleStats()}
        {renderCreditsVerified()}
      </FlexBox>
      <FlexBox width='100%' height='320px'>
        {renderClaimEvaluation()}
      </FlexBox>
      <FlexBox width='100%' height='320px' gap={6}>
        {renderClaimLocations()}
        {renderLatestClaims()}
      </FlexBox>
      <FlexBox width='100%'>{renderEvaluatedClaims()}</FlexBox>
    </FlexBox>
  )
}

export default Overview
