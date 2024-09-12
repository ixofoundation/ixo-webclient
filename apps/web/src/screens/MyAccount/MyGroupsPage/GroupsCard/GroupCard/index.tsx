import { Avatar, Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { useGetDAOByGroupAddress } from 'hooks/dao'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import { TEntityModel, TDAOGroupModel } from 'types/entities'
import { useAccount } from 'hooks/account'
import { SvgBox } from 'components/CoreEntry/App.styles'

import CurrencyFormat from 'react-currency-format'
import { contracts } from '@ixo/impactxclient-sdk'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { useQuery } from 'hooks/window'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  daoGroup: TDAOGroupModel
}
const GroupCard: React.FC<Props> = ({ daoGroup }) => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { address, cwClient } = useAccount()
  const dao: TEntityModel | undefined = useGetDAOByGroupAddress(daoGroup.coreAddress)

  const { userVotingPower, userProposals, userVotes } = useMemo(() => {
    const totalWeight = daoGroup.votingModule.totalWeight
    const userWeight = daoGroup.votingModule.members.find((member) => address === member.addr)?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    const userProposals = daoGroup.proposalModule.proposals.filter(
      ({ proposal }: any) => proposal.proposer === address,
    ).length
    const userVotes = daoGroup.proposalModule.votes.filter((vote) => vote.voter === address).length

    return { userVotingPower, userProposals, userVotes }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoGroup, address])
  const [userStakings, setUserStakings] = useState('0')

  useEffect(() => {
    if (daoGroup.type === 'staking') {
      ;(async () => {
        const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
          cwClient,
          daoGroup.votingModule.votingModuleAddress,
        )
        const stakingContract = await daoVotingCw20StakedClient.stakingContract()
        const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
        const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address })

        const tokenContract = await daoVotingCw20StakedClient.tokenContract()
        const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
        const tokenInfo = await cw20BaseClient.tokenInfo()
        const stakedValue = convertMicroDenomToDenomWithDecimals(microStakedValue, tokenInfo.decimals).toString()
        setUserStakings(stakedValue)
      })()
    }
    return () => {
      setUserStakings('0')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cwClient, address])

  if (!dao) {
    return null
  }
  return (
    <Flex
      w={240}
      h={240}
      p={24}
      direction={'column'}
      align={'center'}
      gap={32}
      style={{
        border: `1px solid ${selectedGroup === daoGroup.coreAddress ? theme.ixoNewBlue : 'transparent'}`,
        flex: '0 0 240px',
        cursor: 'pointer',
        background: selectedGroup === daoGroup.coreAddress ? '#184761' : '#213E59',
      }}
      onClick={() => navigate(`${pathname}?selectedGroup=${daoGroup.coreAddress}`)}
    >
      <Flex direction='column' justify={'center'} align={'center'} gap={8}>
        <Avatar src={dao.profile?.logo} alt='' size={32} radius={100} />
        <Typography variant='primary' size='sm'>
          {dao.profile?.name}
        </Typography>
      </Flex>

      <Typography variant='primary' size='lg'>
        {daoGroup.config.name}
      </Typography>

      <Flex gap={12}>
        <Flex direction={'column'} gap={8} w={'100%'}>
          <Flex align='center' gap={8}>
            <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoLightBlue}>
              <img src='/assets/images/icon-pie.svg' />
            </SvgBox>
            <Typography size='sm' color='white' weight='medium'>
              {new Intl.NumberFormat('en-us', {
                style: 'percent',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(userVotingPower ?? 0)}
            </Typography>
          </Flex>

          <Flex align='center' gap={8}>
            <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoLightBlue}>
              <img src='/assets/images/icon-multisig.svg' />
            </SvgBox>
            <Typography size='sm' color='white' weight='medium'>
              {userVotes ?? 0}
            </Typography>
          </Flex>
        </Flex>

        <Flex direction={'column'} gap={8} w={'100%'}>
          <Flex align='center' gap={8}>
            {daoGroup.type === 'staking' && (
              <>
                <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoLightBlue}>
                  <img src='/assets/images/icon-claim.svg' />
                </SvgBox>
                <Typography size='sm' color='white' weight='medium'>
                  <CurrencyFormat displayType={'text'} value={userStakings} thousandSeparator />
                </Typography>
              </>
            )}
            {daoGroup.type !== 'staking' && (
              <>
                <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoDarkBlue}>
                  <img src='/assets/images/icon-claim.svg' />
                </SvgBox>
                <Typography size='sm' color='white' weight='medium'>
                  n/a
                </Typography>
              </>
            )}
          </Flex>

          <Flex align='center' gap={8}>
            <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoLightBlue}>
              <img src='/assets/images/icon-paper.svg' />
            </SvgBox>
            <Typography size='sm' color='white' weight='medium'>
              {userProposals ?? 0}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GroupCard
