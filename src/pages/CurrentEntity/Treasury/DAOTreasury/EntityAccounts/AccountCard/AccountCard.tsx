import { ResponsiveContainer, Line, LineChart } from 'recharts'
import { FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import { truncateString } from 'utils/formatters'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

interface Props {
  name: string
  address: string
}

const AccountCard: React.FC<Props> = ({ name, address }) => {
  const totalBalance = 0
  const totalChangesIn24H = 0
  const availableBalance = 0
  const lockedBalance = 0

  return (
    <FlexBox
      direction='column'
      gap={4}
      p={6}
      background='#012D41'
      border={`2px solid ${theme.ixoNewBlue}`}
      borderRadius='12px'
    >
      {/* {name} Account & address */}
      <FlexBox gap={2} alignItems='center'>
        <Typography variant='secondary' size='2xl' transform='capitalize'>
          {name} Account
        </Typography>
        <Typography variant='secondary' size='lg' color='dark-blue'>
          {truncateString(address, 20, 'middle')}
        </Typography>
      </FlexBox>

      {/* Balances */}
      <FlexBox gap={2} width='100%' justifyContent='space-between'>
        {/* Total */}
        <FlexBox direction='column'>
          <Typography size='4xl'>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }).format(totalBalance)}
          </Typography>
          <FlexBox gap={1}>
            <Typography color={totalChangesIn24H >= 0 ? 'green' : 'red'} size='sm'>
              {totalChangesIn24H > 0 && '+'}
              {new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              }).format(totalChangesIn24H)}
            </Typography>
            <Typography color='dark-blue' size='sm'>
              (24h)
            </Typography>
          </FlexBox>
        </FlexBox>
        {/* Available */}
        <FlexBox direction='column'>
          <Typography size='base' weight='bold'>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }).format(availableBalance)}
          </Typography>
          <Typography size='sm' color='dark-blue'>
            Available
          </Typography>
        </FlexBox>
        {/* Locked in Escrow */}
        <FlexBox direction='column'>
          <Typography size='base' weight='bold'>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }).format(lockedBalance)}
          </Typography>
          <Typography size='sm' color='dark-blue'>
            Locked in Escrow
          </Typography>
        </FlexBox>
      </FlexBox>

      {/* Charts */}
      <FlexBox width='100%' height='90px'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <Line dataKey='pv' stroke='#107591' dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </FlexBox>

      {/* Actions */}
      <FlexBox gap={4}>
        <Button
          variant='secondary'
          size='custom'
          width={100}
          height={40}
          textTransform='capitalize'
          textSize='lg'
          disabled
        >
          Deposit
        </Button>
        {/* <Button variant='secondary' size='custom' width={100} height={40} textTransform='capitalize' textSize='lg'>
          Send
        </Button>
        <Button variant='secondary' size='custom' width={100} height={40} textTransform='capitalize' textSize='lg'>
          Receive
        </Button>
        <Button variant='secondary' size='custom' width={100} height={40} textTransform='capitalize' textSize='lg'>
          Transfer
        </Button> */}
      </FlexBox>
    </FlexBox>
  )
}

export default AccountCard
