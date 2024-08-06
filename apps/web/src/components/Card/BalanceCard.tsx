import BigNumber from 'bignumber.js'
import { Typography } from 'components/Typography'
import { Avatar } from 'screens/CurrentEntity/Components'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Flex, useMantineTheme } from '@mantine/core'

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
  const theme = useMantineTheme()
  const balanceUsd = new BigNumber(balance).times(lastPriceUsd).toFormat(6)
  return (
    <Flex
      w='100%'
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all .2s',
        '&:hover': { borderColor: theme.colors.blue[5] },
      }}
      justify='space-between'
      align='center'
      bg='#053549'
      p={4}
      gap={2}
      color={theme.colors.white[5]}
      onClick={onClick && onClick}
    >
      <Avatar size={38} url={coinImageUrl} />
      <Flex direction='column' flex={1}>
        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='lg' weight='medium'>
            {coinDenom}
          </Typography>
          <Typography size='lg' weight='medium'>
            <CurrencyFormat displayType='text' value={balance} thousandSeparator decimalScale={2} fixedDecimalScale />
          </Typography>
        </Flex>
        <Flex w='100%' justify='space-between' align='center'>
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
        </Flex>
      </Flex>
    </Flex>
  )
}
