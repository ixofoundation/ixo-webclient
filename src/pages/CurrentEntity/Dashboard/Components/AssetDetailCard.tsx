import { TokenAssetInfo } from '@ixo/impactxclient-sdk/types/custom_queries/currency.types'
import { FlexBox, GridContainer, GridItem, SvgBox, theme } from 'components/App/App.styles'
import React, { useMemo } from 'react'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { Typography } from 'components/Typography'
import CurrencyFormat from 'react-currency-format'
import BigNumber from 'bignumber.js'
import { useHistory } from 'react-router-dom'
import { Area, AreaChart, YAxis, ResponsiveContainer } from 'recharts'
import { Button } from 'pages/CreateEntity/Components'

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
  coinDenom: string
  coinMinimalDenom: string
  coinImageUrl: string
  lastPriceUsd: number
  balance: string
  priceChangePercent: TokenAssetInfo['priceChangePercent']
}

const AssetDetailCard: React.FC<Props> = ({
  coinDenom,
  coinMinimalDenom,
  coinImageUrl,
  lastPriceUsd,
  balance,
  priceChangePercent,
}) => {
  const history = useHistory()
  const balanceUsd: string = useMemo(
    () => new BigNumber(balance).times(lastPriceUsd).toString(),
    [balance, lastPriceUsd],
  )
  const priceChangePercentInOneDay: string = useMemo(() => priceChangePercent['1D'], [priceChangePercent])
  const balanceUsdChangeInOneDay: string = useMemo(
    () => new BigNumber(balanceUsd).dividedBy(100).times(new BigNumber(priceChangePercentInOneDay)).toString(),
    [balanceUsd, priceChangePercentInOneDay],
  )

  return (
    <FlexBox
      direction='column'
      width={'100%'}
      height='100%'
      background={theme.ixoGradientDark2}
      borderRadius={'4px'}
      p={5}
      border={'1px solid #083347'}
      gap={6}
    >
      {/* Card Header */}
      <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
        <FlexBox width='50%' justifyContent='space-between' alignItems='center'>
          {/* coinImageUrl */}
          <FlexBox alignItems='center' gap={2}>
            <img src={coinImageUrl} alt='' width='38px' height='38px' />
            <FlexBox direction='column'>
              <Typography size='lg'>{coinDenom}</Typography>
              <Typography size='md'>{coinMinimalDenom}</Typography>
            </FlexBox>
          </FlexBox>
          {/* coinBalance */}
          <FlexBox direction='column' alignItems='end'>
            {/* coinBalance */}
            <FlexBox alignItems='center' gap={4}>
              <Typography size='lg'>
                <CurrencyFormat
                  displayType={'text'}
                  value={new BigNumber(balance).toString()}
                  thousandSeparator
                  decimalScale={2}
                />
              </Typography>
              <Typography
                size='md'
                color={Number(priceChangePercentInOneDay) >= 0 ? 'green' : 'red'}
                style={{ width: 80 }}
              >
                {priceChangePercentInOneDay}%
              </Typography>
            </FlexBox>
            {/* coinBalance in USD */}
            <FlexBox alignItems='center' gap={4}>
              <Typography size='md' color='dark-blue'>
                <CurrencyFormat prefix='$' displayType={'text'} value={balanceUsd} thousandSeparator decimalScale={2} />
              </Typography>
              <Typography
                size='md'
                color={Number(priceChangePercentInOneDay) >= 0 ? 'green' : 'red'}
                style={{ width: 80 }}
              >
                <CurrencyFormat
                  prefix='$'
                  displayType={'text'}
                  value={balanceUsdChangeInOneDay}
                  thousandSeparator
                  decimalScale={2}
                />
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <SvgBox color='white' cursor='pointer' onClick={() => history.goBack()}>
          <ArrowLeftIcon />
        </SvgBox>
      </FlexBox>
      {/* Card Body */}
      <GridContainer
        gridTemplateAreas={`"a b"`}
        gridTemplateColumns={'1fr 1fr'}
        gridTemplateRows={'repeat(1, minmax(330px, auto))'}
        gridGap={12}
        width='100%'
      >
        {/* Area chart */}
        <GridItem gridArea='a' alignSelf='center' height={'175px'}>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={theme.ixoNewBlue} stopOpacity={0.4} />
                  <stop offset='95%' stopColor={theme.ixoNewBlue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis
                stroke={theme.ixoWhite}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Area dataKey='uv' stroke={theme.ixoNewBlue} fillOpacity={1} fill='url(#colorUv)' strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </GridItem>
        {/* Staking stats */}
        <GridItem gridArea='b' alignSelf='center'>
          <FlexBox width='100%' direction='column' alignItems='end' gap={12}>
            {/* Balances */}
            <FlexBox width='100%' direction='column' gap={2}>
              {/* available */}
              <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
                <Typography size='lg'>available</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom}`}
                    displayType={'text'}
                    value={'1030.214'}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
              {/* staked */}
              <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
                <Typography size='lg'>staked</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom}`}
                    displayType={'text'}
                    value={'240.312'}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
              {/* undelegating */}
              <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
                <Typography size='lg'>undelegating</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom}`}
                    displayType={'text'}
                    value={'45.123'}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
              {/* claimable */}
              <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
                <Typography size='lg'>claimable</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom}`}
                    displayType={'text'}
                    value={'45.123'}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
            </FlexBox>
            {/* Manage action */}
            <Button
              variant='secondary'
              size='flex'
              height={40}
              textSize='base'
              textTransform='capitalize'
              textWeight='medium'
            >
              Manage
            </Button>
          </FlexBox>
        </GridItem>
      </GridContainer>
    </FlexBox>
  )
}

export default AssetDetailCard
