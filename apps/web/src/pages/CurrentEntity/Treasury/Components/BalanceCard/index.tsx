import { ResponsiveContainer, Line, LineChart } from 'recharts'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { useTheme } from 'styled-components'
import BigNumber from 'bignumber.js'

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
  const theme: any = useTheme()
  const totalValue = new BigNumber(availableValue).plus(new BigNumber(stakedValue)).toFixed(2)

  return (
    <FlexBox direction='column' gap={4} p={8} background='#012D41' borderRadius='12px' color={theme.ixoWhite}>
      {/* Total Value */}
      <FlexBox>
        <Typography variant='secondary' size='2xl'>
          Total Value
        </Typography>
      </FlexBox>

      <FlexBox>
        <Typography variant='secondary' color='dark-blue'>
          Includes estimated values of group and linked accounts
        </Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
        <Typography variant='secondary' size='4xl'>
          <CurrencyFormat prefix='$' displayType={'text'} value={totalValue} thousandSeparator decimalScale={2} />
        </Typography>

        <FlexBox direction='column'>
          <Typography variant='secondary'>
            <CurrencyFormat prefix='$' displayType={'text'} value={availableValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            Available
          </Typography>
        </FlexBox>

        <FlexBox direction='column'>
          <Typography variant='secondary'>
            <CurrencyFormat prefix='$' displayType={'text'} value={stakedValue} thousandSeparator decimalScale={2} />
          </Typography>
          <Typography variant='secondary' size='md' color='dark-blue'>
            Staked
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox
        width='100%'
        height='270px'
        direction='column'
        justifyContent='center'
        alignItems='center'
        color={theme.ixoDarkBlue}
      >
        {new BigNumber(totalValue).isGreaterThan(0) ? (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <Line dataKey='pv' stroke='#107591' dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <>
            <SvgBox svgWidth={10} svgHeight={10} color={theme.ixoDarkBlue} mb={4}>
              <CoinsIcon />
            </SvgBox>
            <Typography variant='secondary' size='2xl'>
              No Treasury Assets were found.
            </Typography>
          </>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default BalanceCard
