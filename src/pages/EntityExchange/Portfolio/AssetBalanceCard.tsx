import { Coin } from '@cosmjs/proto-signing'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

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
  onClick: () => void
}

const AssetBalanceCard: React.FC<AssetBalanceCardProp> = ({ asset, onClick }) => {
  const theme: any = useTheme()

  return (
    <FlexBox
      direction='column'
      gap={2}
      width='310px'
      p={4}
      borderRadius='4px'
      border={`1px solid ${theme.ixoNewBlue}`}
      background={theme.ixoGradientDark2}
      onClick={onClick}
      cursor={'pointer'}
    >
      <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
        <FlexBox borderRadius='6px' py={1} px={2} background={theme.ixoMediumBlue}>
          <Typography variant='primary' size='md' weight={'bold'}>
            {asset.denom}
          </Typography>
        </FlexBox>
        <FlexBox borderRadius='6px' py={1} px={2} background={theme.ixoNavyBlue}>
          <Typography variant='primary' size='md' weight={'bold'}>
            Reserve
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column'>
        <Typography size='4xl'>
          {asset.denom} {asset.amount}
        </Typography>
        <Typography size='sm'>USD 0</Typography>
      </FlexBox>

      <FlexBox width='100%' alignItems='center'>
        <FlexBox width='100%' direction='column'>
          <Typography weight={'bold'}>
            {asset.denom} {asset.amount}
          </Typography>
          <Typography size='sm' color='dark-blue'>
            Available
          </Typography>
        </FlexBox>
        <FlexBox width='100%' direction='column'>
          <Typography weight={'bold'}>{asset.denom} 0</Typography>
          <Typography size='sm' color='dark-blue'>
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
