import { Avatar, Card } from 'screens/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { Flex } from '@mantine/core'
import { SvgBox } from 'components/App/App.styles'
import PieChart from 'components/Widgets/PieChart'
import { Typography } from 'components/Typography'

import CoinsIcon from 'assets/images/icon-coins-solid.svg'
import { useTheme } from 'styled-components'
import { useAccount } from 'hooks/account'
import CurrencyFormat from 'react-currency-format'
import BigNumber from 'bignumber.js'
import { LiaAdjustSolid } from 'react-icons/lia'

interface Props {
  daoGroup: TDAOGroupModel
}
const GovernanceCard: React.FC<Props> = ({ daoGroup }) => {
  const token = daoGroup.token
  const theme: any = useTheme()
  const { address } = useAccount()
  const userVotingPower = useMemo(() => {
    const totalWeight = daoGroup?.votingModule.totalWeight
    const userWeight = daoGroup?.votingModule.members.find((member) => member.addr === address)?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    return userVotingPower
  }, [address, daoGroup])

  return (
    <Card label='Governance' iconNode={<LiaAdjustSolid size={24} style={{ transform: 'rotate(180deg)' }} />}>
      <Flex w='100%' h='100%' direction={'column'} gap={24} align={'center'}>
        <Flex align={'center'} gap={4}>
          <SvgBox $svgWidth={5} $svgHeight={5}>
            {daoGroup.type === 'membership' && <CoinsIcon />}
            {daoGroup.type === 'staking' && <CoinsIcon />}
          </SvgBox>
          <Typography size='sm' transform='capitalize'>
            {daoGroup.type} based
          </Typography>
        </Flex>

        {userVotingPower > 0 ? (
          <Flex w={'100%'} h='100%' direction={'column'} align={'center'} justify={'space-between'}>
            <PieChart
              data={[
                { name: 'Rest Voting Power', value: 1 - userVotingPower, color: theme.ixoDarkBlue },
                { name: 'My Voting Power', value: userVotingPower, color: theme.ixoNewBlue },
              ]}
              descriptor={
                <Flex direction='column' align='center'>
                  <Typography variant='secondary' size='2xl' weight='bold'>
                    {new Intl.NumberFormat('en-us', {
                      style: 'percent',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(userVotingPower)}
                  </Typography>
                  <Typography size='md' transform='capitalize'>
                    voting power
                  </Typography>
                </Flex>
              }
              height='140px'
              radius={70}
              thickness={8}
            />
            {daoGroup.type === 'staking' && (
              <Flex w={'100%'} align={'center'} justify={'space-between'}>
                <Typography>Token Supply</Typography>
                <Flex align={'center'} gap={12}>
                  <Typography>
                    <CurrencyFormat
                      displayType={'text'}
                      value={new BigNumber(token?.tokenInfo?.total_supply || '0')
                        .dividedBy(10 ** (token?.tokenInfo?.decimals || 0))
                        .toString()}
                      thousandSeparator
                      decimalScale={2}
                    />
                  </Typography>
                  <Flex align={'center'} gap={4}>
                    <Avatar size={24} borderWidth={0} url={(token?.marketingInfo.logo as any)?.url} />
                    <Typography transform='uppercase'>{token?.tokenInfo.symbol}</Typography>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>
        ) : (
          <Flex w={'100%'} h='100%' align={'center'} justify={'center'}>
            <Typography variant='secondary' size='sm' color='dark-blue' $textAlign='center'>
              Participation in this group requires membership.
              <br />
              Ask an existing member to make a
              <br />
              proposal for you to join.
            </Typography>
          </Flex>
        )}
      </Flex>
    </Card>
  )
}

export default GovernanceCard
