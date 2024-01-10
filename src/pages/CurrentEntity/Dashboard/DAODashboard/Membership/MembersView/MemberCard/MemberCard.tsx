import { Box, FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as MultisigIcon } from 'assets/images/icon-multisig.svg'
import { ReactComponent as PaperIcon } from 'assets/images/icon-paper.svg'
import ThreeDot from 'assets/icons/ThreeDot'
import { truncateString } from 'utils/formatters'
import { MemberDetailCard } from '../MemberDetailCard'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../../../../../Components'
import { contracts } from '@ixo/impactxclient-sdk'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { useAccount } from 'hooks/account'
import CurrencyFormat from 'react-currency-format'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'

const Wrapper = styled(FlexBox)<{ focused: boolean }>`
  ${({ theme, focused }) => focused && `border-color: ${theme.ixoLightBlue};`}
  &:hover {
    border-color: ${(props) => props.theme.ixoLightBlue};

    & > #three_dot {
      visibility: visible;
    }
  }
`

interface Props {
  member: {
    avatar?: string
    name?: string
    role?: string
    staking?: number
    votes?: number
    proposals?: number
    status?: 'approved' | 'pending' | 'rejected'
    verified?: boolean
    administrator?: boolean
    assignedAuthority?: number

    addr: string
    weight: number
    votingPower?: number
  }
  selected: boolean
  onSelectMember: (addr: string) => void
}

const MemberCard: React.FC<Props> = ({ member, selected, onSelectMember }): JSX.Element => {
  const theme: any = useTheme()
  const history = useHistory()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const STATUSES = {
    approved: {
      status: 'approved',
      text: 'Members',
      color: theme.ixoGreen,
    },
    pending: {
      status: 'pending',
      text: 'Awaiting approval',
      color: theme.ixoDarkOrange,
    },
    rejected: {
      status: 'rejected',
      text: 'Restricted',
      color: theme.ixoRed,
    },
    all: {
      status: undefined,
      text: 'All',
      color: theme.ixoNewBlue,
    },
  }
  const { cwClient } = useAccount()
  const { daoGroups } = useCurrentEntity()
  const selectedDAOGroup = daoGroups[selectedGroup]
  const { type, daoGroup, proposals, votes, votingModuleAddress } = useCurrentEntityDAOGroup(
    selectedDAOGroup?.coreAddress || '',
  )
  const { addr, role, status } = member
  const avatar = member.avatar
  const name = member.name
  const [detailView, setDetailView] = useState(false)
  const [userStakings, setUserStakings] = useState('0')

  const { userVotingPower, userProposals, userVotes } = useMemo(() => {
    const totalWeight = daoGroup.votingModule.totalWeight
    const userWeight = daoGroup.votingModule.members.find((member) => addr === member.addr)?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    const userProposals = proposals.filter(({ proposal }: any) => proposal.proposer === addr).length
    const userVotes = votes.filter((vote) => vote.voter === addr).length

    return { userVotingPower, userProposals, userVotes }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoGroup, addr, proposals, votes])

  useEffect(() => {
    if (type === 'staking') {
      ;(async () => {
        const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
          cwClient,
          votingModuleAddress,
        )
        const stakingContract = await daoVotingCw20StakedClient.stakingContract()
        const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
        const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address: addr })

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
  }, [votingModuleAddress, cwClient, type])

  const handleMemberView = () => {
    history.push(`${history.location.pathname}/${addr}`)
  }

  return !detailView ? (
    <Wrapper
      minWidth='240px'
      width='100%'
      height={'320px'}
      direction='column'
      alignItems='center'
      justifyContent='space-between'
      borderRadius='12px'
      padding={6}
      background={'linear-gradient(180deg, #01273A 0%, #002D42 100%)'}
      cursor='pointer'
      borderWidth='2px'
      borderStyle='solid'
      borderColor={theme.ixoDarkBlue}
      transition='all .2s'
      position='relative'
      focused={selected}
      onClick={() => onSelectMember(addr)}
    >
      <Box
        position='absolute'
        top='20px'
        left='20px'
        borderRadius='100%'
        width='12px'
        height='12px'
        background={STATUSES[status!]?.color}
      />
      <Box
        id='three_dot'
        visibility='hidden'
        position='absolute'
        top={'16px'}
        right={'16px'}
        transition='all .2s'
        onClick={(event) => {
          setDetailView(true)
          event.stopPropagation()
        }}
        display='none'
      >
        <ThreeDot />
      </Box>

      <Avatar url={avatar} size={100} />

      <FlexBox direction='column' gap={2} width='100%' alignItems='center'>
        <Typography size='lg' color='white' weight='medium' hover={{ underline: true }} onClick={handleMemberView}>
          {truncateString(name ?? addr, 20)}
        </Typography>
        <Typography size='sm' color='light-blue' weight='medium'>
          {role}
        </Typography>
      </FlexBox>

      <GridContainer columns={2} columnGap={2} rowGap={2} width='100%'>
        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <PieIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {new Intl.NumberFormat('en-us', {
              style: 'percent',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(userVotingPower ?? 0)}
          </Typography>
        </FlexBox>

        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          {type === 'staking' && (
            <>
              <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
                <ClaimIcon />
              </SvgBox>
              <Typography size='sm' color='white' weight='medium'>
                <CurrencyFormat displayType={'text'} value={userStakings} thousandSeparator />
              </Typography>
            </>
          )}
          {type !== 'staking' && (
            <>
              <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoDarkBlue}>
                <ClaimIcon />
              </SvgBox>
              <Typography size='sm' color='white' weight='medium'>
                n/a
              </Typography>
            </>
          )}
        </FlexBox>

        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <MultisigIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {userVotes ?? 0}
          </Typography>
        </FlexBox>

        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <PaperIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {userProposals ?? 0}
          </Typography>
        </FlexBox>
      </GridContainer>
    </Wrapper>
  ) : (
    <MemberDetailCard member={member} onClose={() => setDetailView(false)} />
  )
}

export default MemberCard
