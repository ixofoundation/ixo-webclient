import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { Avatar } from 'screens/CurrentEntity/Components'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useTheme } from 'styled-components'

export interface BalanceCardProps {
  balance: string
  network: string
  coinDenom: string
  coinImageUrl?: string
  lastPriceUsd: number
  onClick?: () => void
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  network,
  coinDenom,
  coinImageUrl,
  lastPriceUsd,
  onClick,
}) => {
  const theme: any = useTheme()
  const balanceUsd = new BigNumber(balance).times(lastPriceUsd).toFormat(6)
  return (
    <FlexBox
      width='100%'
      $borderWidth='1px'
      $borderStyle='solid'
      $borderColor={'transparent'}
      $borderRadius='8px'
      background='#053549'
      p={4}
      $gap={2}
      $alignItems='center'
      color={theme.ixoWhite}
      cursor='pointer'
      transition='all .2s'
      hover={{ $borderColor: theme.ixoNewBlue }}
      onClick={onClick && onClick}
    >
      <Avatar size={38} url={coinImageUrl} />
      <FlexBox $direction='column' $flexGrow={1}>
        <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
          <Typography size='lg' weight='medium'>
            {coinDenom}
          </Typography>
          <Typography size='lg' weight='medium'>
            <CurrencyFormat displayType='text' value={balance} thousandSeparator decimalScale={2} fixedDecimalScale />
          </Typography>
        </FlexBox>
        <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
          <Typography size='md' weight='medium'>
            {network}
          </Typography>
          <Typography size='md' weight='medium' color={'dark-blue'}>
            <CurrencyFormat
              prefix='$'
              displayType='text'
              value={balanceUsd}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
          </Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
