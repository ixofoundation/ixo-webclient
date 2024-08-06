import Image from 'next/image'
import { ResponsiveContainer, Line, LineChart } from 'recharts'
import { Typography } from 'components/Typography'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Flex, useMantineTheme } from '@mantine/core'
import BigNumber from 'bignumber.js'
import { IconCoinsSolid } from 'components/IconPaths'

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

interface Props {
  availableValue: string
  stakedValue: string
}

const BalanceCard: React.FC<Props> = ({ availableValue = '0', stakedValue = '0.00' }) => {
  const theme = useMantineTheme()
  const totalValue = new BigNumber(availableValue).plus(new BigNumber(stakedValue)).toFixed(2)

  return (
    <Flex direction='column' gap={4} p={8} bg='#012D41' style={{ borderRadius: '12px' }} color={theme.colors.white[5]}>
      {/* Total Value */}
      <Flex>
        <Typography variant='secondary' size='2xl'>
          Total Value
        </Typography>
      </Flex>

      <Flex>
        <Typography variant='secondary' color='dark-blue'>
          Includes the estimated current balance of Group and Linked accounts
        </Typography>
      </Flex>

      <Flex w='100%' justify='space-between' align='end'>
        <Typography variant='secondary' size='4xl'>
          <CurrencyFormat prefix='$' displayType={'text'} value={totalValue} thousandSeparator decimalScale={2} />
        </Typography>

        <Flex direction='column'>
          <Typography variant='secondary'>
            <CurrencyFormat prefix='$' displayType={'text'} value={availableValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            Available
          </Typography>
        </Flex>

        <Flex direction='column'>
          <Typography variant='secondary'>
            <CurrencyFormat prefix='$' displayType={'text'} value={stakedValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            Staked
          </Typography>
        </Flex>
      </Flex>

      <Flex w='100%' h='270px' direction='column' justify='center' align='center' color={theme.colors.blue[5]}>
        {new BigNumber(totalValue).isGreaterThan(0) ? (
          <ResponsiveContainer width='99%' height='270px'>
            <LineChart data={data}>
              <Line dataKey='pv' stroke='#107591' dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <>
            <Image src={IconCoinsSolid} alt='Coins' width={5} height={5} color={theme.colors.blue[5]} />
            <Typography variant='secondary' size='2xl'>
              No Treasury Assets could be found
            </Typography>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default BalanceCard
