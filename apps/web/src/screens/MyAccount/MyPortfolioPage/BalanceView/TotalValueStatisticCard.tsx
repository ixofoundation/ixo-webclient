import { Flex } from '@mantine/core'
import BigNumber from 'bignumber.js'
import { Typography } from 'components/Typography'
import { Card } from 'screens/CurrentEntity/Components'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useMantineTheme } from '@mantine/core'
import { ResponsiveContainer, Line, LineChart } from 'recharts'
import { SvgBox } from 'components/App/App.styles'
import { ReactComponent as CoinsIcon } from '/public/assets/images/icon-coins-solid.svg'
import { useAccountStakedBalances, useAccountUSDBalances } from 'hooks/account'

const data = [
  {
    name: 'Page A',
    pv: 0,
  },
  {
    name: 'Page B',
    pv: 0,
  },
  {
    name: 'Page C',
    pv: 0,
  },
  {
    name: 'Page D',
    pv: 0,
  },
  {
    name: 'Page E',
    pv: 0,
  },
  {
    name: 'Page F',
    pv: 0,
  },
  {
    name: 'Page G',
    pv: 0,
  },
]

const TotalValueStatisticCard: React.FC = () => {
  const theme = useMantineTheme()
  const availableValue = useAccountUSDBalances()
  const { totalStakedBalance: stakedValue } = useAccountStakedBalances()

  const totalValue = new BigNumber(availableValue).plus(stakedValue).toString()
  const dailyChange = 0

  return (
    <Card label='Total Value'>
      <Flex justify='space-between' align='flex-start' gap={32}>
        <Flex direction='column'>
          <Typography variant='secondary' size='4xl'>
            <CurrencyFormat prefix='$' displayType={'text'} value={totalValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            <CurrencyFormat
              prefix={`${dailyChange > 0 ? '+' : ''}$`}
              displayType={'text'}
              value={dailyChange}
              thousandSeparator
              decimalScale={2}
            />{' '}
            (24h)
          </Typography>
        </Flex>

        <Flex direction='column' mt={4}>
          <Typography variant='secondary'>
            <CurrencyFormat prefix='$' displayType={'text'} value={availableValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            Available
          </Typography>
        </Flex>

        <Flex direction='column' mt={4}>
          <Typography variant='secondary'>
            <CurrencyFormat prefix='$' displayType={'text'} value={stakedValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            Staked
          </Typography>
        </Flex>
      </Flex>

      <Flex w='100%' h='270px' direction='column' justify='center' align='center' color={theme.ixoDarkBlue}>
        {new BigNumber(totalValue).isGreaterThan(0) ? (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <Line dataKey='pv' stroke='#107591' dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <>
            <SvgBox $svgWidth={10} $svgHeight={10} color={theme.ixoDarkBlue} mb={4}>
              <CoinsIcon />
            </SvgBox>
            <Typography variant='secondary' size='2xl'>
              No Assets were found.
            </Typography>
          </>
        )}
      </Flex>
    </Card>
  )
}

export default TotalValueStatisticCard
