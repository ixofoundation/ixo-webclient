import { Coin } from '@cosmjs/proto-signing'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'
import { useIxoConfigs } from 'hooks/configs'
import CurrencyFormat from 'react-currency-format'
import usePrice from 'hooks/price'
import BigNumber from 'bignumber.js'

const data = [
  {
    uv: 4000,
  },
  {
    uv: 3000,
  },
  {
    uv: 2000,
  },
  {
    uv: 2780,
  },
  {
    uv: 1890,
  },
  {
    uv: 2390,
  },
  {
    uv: 3490,
  },
]

interface AssetBalanceCardProp {
  asset: Coin
  selected?: boolean
  onClick: () => void
}

const AssetBalanceCard: React.FC<AssetBalanceCardProp> = ({ asset, selected, onClick }) => {
  const theme: any = useTheme()
  const { convertToDenom } = useIxoConfigs()
  const usdRate = usePrice(asset.denom)

  const displayAsset = useMemo(() => convertToDenom(asset), [asset, convertToDenom])

  return (
    <FlexBox
      direction='column'
      gap={2}
      width='310px'
      p={4}
      borderRadius='4px'
      border={`1px solid ${selected ? theme.ixoNewBlue : 'transparent'}`}
      background={theme.ixoGradientDark2}
      onClick={onClick}
      cursor={'pointer'}
    >
      <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
        <FlexBox borderRadius='6px' py={1} px={2} background={theme.ixoMediumBlue}>
          <Typography variant='primary' size='md' weight={'bold'}>
            {displayAsset?.denom.toUpperCase()}
          </Typography>
        </FlexBox>
        <FlexBox borderRadius='6px' py={1} px={2} background={theme.ixoNavyBlue}>
          <Typography variant='primary' size='md' weight={'bold'}>
            Reserve
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%'>
        <Typography size='4xl' overflowLines={1} style={{ width: '100%' }}>
          <CurrencyFormat
            displayType='text'
            value={displayAsset?.amount}
            thousandSeparator
            decimalScale={6}
            suffix={' ' + displayAsset?.denom.toUpperCase()}
          />
        </Typography>
        <Typography size='sm'>
          <CurrencyFormat
            displayType='text'
            value={new BigNumber(displayAsset?.amount || '0').times(usdRate).toString()}
            thousandSeparator
            decimalScale={2}
            suffix={' USD'}
          />
        </Typography>
      </FlexBox>

      <FlexBox width='100%' alignItems='center' gap={4}>
        <FlexBox width='50%' direction='column'>
          <Typography weight={'bold'} overflowLines={1} style={{ width: '100%' }}>
            <CurrencyFormat
              displayType='text'
              value={displayAsset?.amount}
              thousandSeparator
              decimalScale={6}
              suffix={' ' + displayAsset?.denom.toUpperCase()}
            />
          </Typography>
          <Typography size='sm' color='dark-blue'>
            Available
          </Typography>
        </FlexBox>
        <FlexBox width='50%' direction='column'>
          <Typography weight={'bold'}>
            <CurrencyFormat
              displayType='text'
              value={0}
              thousandSeparator
              decimalScale={6}
              suffix={' ' + displayAsset?.denom.toUpperCase()}
            />
          </Typography>
          <Typography size='sm' color='dark-blue' noWrap>
            Locked in Escrow
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' height='56px'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={500} height={300} data={data}>
            <Line type='monotone' dataKey='uv' stroke={theme.ixoNewBlue} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </FlexBox>
    </FlexBox>
  )
}

export default AssetBalanceCard
