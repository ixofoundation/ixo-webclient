import ThreeDot from 'assets/icons/ThreeDot'
import { Box, FlexBox, TableBodyItem, TableRow } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useEffect, useState, useMemo } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { truncateString } from 'utils/formatters'
import { MemberDetailCard } from '../MemberDetailCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from '../../../../../Components'
import { useAccount } from 'hooks/account'
import { contracts } from '@ixo/impactxclient-sdk'
import CurrencyFormat from 'react-currency-format'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'

const Wrapper = styled(TableRow)<{ focused: boolean }>`
  ${({ theme, focused }) =>
    focused &&
    css`
      outline-color: ${theme.ixoNewBlue};
      background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
      box-shadow: ${theme.ixoShadow1};
    `}
  &:hover {
    outline-color: ${(props) => props.theme.ixoNewBlue};
    background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
    box-shadow: ${(props) => props.theme.ixoShadow1};

    & #three_dot {
      visibility: visible;
    }
  }
`

const DetailButton = styled.span`
  visibility: hidden;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  transition: all 0.2s;
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

const MemberListItem: React.FC<Props> = ({ member, selected, onSelectMember }): JSX.Element => {
  const theme: any = useTheme()
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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { cwClient } = useAccount()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { daoGroups } = useCurrentEntity()
  const selectedDAOGroup = daoGroups[selectedGroup]
  const { type, daoGroup, proposals, votes, votingModuleAddress } = useCurrentEntityDAOGroup(
    selectedDAOGroup?.coreAddress || '',
  )
  const { avatar, name, status, addr } = member
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
    navigate(`${pathname}/${addr}`)
  }

  return (
    <Wrapper
      height={'66px'}
      $borderRadius='12px'
      background={'transparent'}
      cursor='pointer'
      $outlineWidth='2px'
      $outlineStyle='solid'
      $outlineColor={'transparent'}
      transition='all .2s'
      position='relative'
      px={8}
      py={1}
      focused={selected}
      onClick={() => onSelectMember(addr)}
    >
      <TableBodyItem>
        <Box
          position='absolute'
          top='8px'
          left='8px'
          $borderRadius='100%'
          width='12px'
          height='12px'
          background={STATUSES[status!]?.color}
        />
        <FlexBox $alignItems='center' $gap={5} $marginLeft={8}>
          <Avatar size={50} url={avatar} />
          <Typography color='white' size='lg' weight='medium' hover={{ underline: true }} onClick={handleMemberView}>
            {truncateString(name ?? addr, 20)}
          </Typography>
        </FlexBox>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {new Intl.NumberFormat('en-us', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(userVotingPower ?? 0)}
        </Typography>
      </TableBodyItem>
      {type === 'staking' && (
        <TableBodyItem>
          <Typography color='white' size='lg' weight='medium'>
            <CurrencyFormat displayType={'text'} value={userStakings} thousandSeparator />
          </Typography>
        </TableBodyItem>
      )}
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {userVotes ?? 0}
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {userProposals ?? 0}
        </Typography>
      </TableBodyItem>

      <TableBodyItem>
        <DetailButton
          id='three_dot'
          onClick={(event) => {
            setDetailView(true)
            event.stopPropagation()
          }}
          style={{ display: 'none' }}
        >
          <ThreeDot />
        </DetailButton>
        {detailView && (
          <Box position='absolute' top='0px' right='0px' $zIndex={100}>
            <MemberDetailCard member={member} onClose={() => setDetailView(false)} />
          </Box>
        )}
      </TableBodyItem>
    </Wrapper>
  )
}

export default MemberListItem
