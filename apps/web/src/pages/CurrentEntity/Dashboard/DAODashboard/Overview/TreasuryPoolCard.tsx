import { SvgBox } from 'components/App/App.styles'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

import { ReactComponent as FundingIcon } from 'assets/images/icon-funding.svg'
import { ReactComponent as UpIcon } from 'assets/images/icon-up-full.svg'
import { useCurrentEntityTreasury } from 'hooks/currentEntity'
import { AccountTypeToIconMap } from 'pages/CurrentEntity/Treasury/Components/AccountsCard'
import { getTotalUSDvalueFromTreasuryCoins } from 'utils/treasury'
import CurrencyFormat from 'react-currency-format'
import BigNumber from 'bignumber.js'
import { useNavigate, useParams } from 'react-router-dom'

const TreasuryPoolCard: React.FC = () => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { entityId } = useParams<{ entityId: string }>()
  const accounts = useCurrentEntityTreasury()

  const treasuryAccounts = useMemo(() => {
    const arr: any[] = []
    Object.values(accounts).forEach((account) => {
      const totalBalance = getTotalUSDvalueFromTreasuryCoins(account.coins)
      arr.push({ ...account, totalBalance })
    })

    const entityAccounts = arr.filter((account) => account.type === 'entity')
    const groupAccounts = arr.filter((account) => account.type === 'group')
    const linkedAccounts = arr.filter((account) => account.type === 'linked')

    return [
      {
        label: 'Entity Account',
        type: 'entity',
        value: entityAccounts.reduce(
          (pre, cur) => new BigNumber(pre).plus(new BigNumber(cur.totalBalance)).toFixed(),
          '0',
        ),
      },
      {
        label: 'Group Account',
        type: 'group',
        value: groupAccounts.reduce(
          (pre, cur) => new BigNumber(pre).plus(new BigNumber(cur.totalBalance)).toFixed(),
          '0',
        ),
      },
      {
        label: 'Linked Account',
        type: 'linked',
        value: linkedAccounts.reduce(
          (pre, cur) => new BigNumber(pre).plus(new BigNumber(cur.totalBalance)).toFixed(),
          '0',
        ),
      },
    ]
  }, [accounts])

  const totalBalance = useMemo(() => {
    return treasuryAccounts.reduce((pre, cur) => new BigNumber(pre).plus(new BigNumber(cur.value)).toFixed(), '0')
  }, [treasuryAccounts])

  return (
    <Card
      label='Treasury Pool'
      icon={
        <SvgBox $svgWidth={6} $svgHeight={6}>
          <FundingIcon />
        </SvgBox>
      }
      onAction={() => navigate(`/entity/${entityId}/treasury`)}
    >
      <Flex w='100%' h='100%' direction={'column'} justify={'space-between'} align={'center'}>
        <Flex direction='column' justify={'center'} align={'center'}>
          <Typography size='5xl'>
            <CurrencyFormat
              displayType='text'
              value={totalBalance ?? '0'}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              prefix='$'
            />
          </Typography>
          <Flex align={'center'} gap={4} style={{ color: theme.ixoGreen }}>
            <Typography size='md'>+0.00%</Typography>
            <SvgBox $svgWidth={5} $svgHeight={5}>
              <UpIcon />
            </SvgBox>
          </Flex>
          <Typography variant='secondary' color='grey700'>
            Treasury Assets
          </Typography>
        </Flex>

        <Flex w='100%' h='170px' gap={16}>
          {treasuryAccounts.map((account, index) => {
            const Icon = AccountTypeToIconMap[account.type]

            return (
              <Flex
                key={index}
                bg={'#213E59'}
                py={20}
                w={'100%'}
                direction={'column'}
                align={'center'}
                justify={'center'}
                style={{ borderRadius: 4 }}
              >
                <Flex direction={'column'} gap={16} justify={'center'} align={'center'}>
                  <Flex direction={'column'} align={'center'} gap={4} style={{ color: theme.ixoNewBlue }}>
                    {Icon && (
                      <SvgBox>
                        <Icon />
                      </SvgBox>
                    )}
                    <Typography size='md'>{account.label}</Typography>
                  </Flex>
                  <Typography size='xl'>
                    <CurrencyFormat
                      displayType='text'
                      value={account.value ?? '0'}
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      prefix='$'
                    />
                  </Typography>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Card>
  )
}

export default TreasuryPoolCard
