import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import ThreeDot from 'assets/icons/ThreeDot'
import { truncateString } from 'utils/formatters'
import { MemberDetailCard } from '../MemberDetailCard'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '../../../../../Components'
import { contracts } from '@ixo/impactxclient-sdk'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { useAccount } from 'hooks/account'
import CurrencyFormat from 'react-currency-format'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { IconPie, IconClaim, IconMultisig, IconPaper } from 'components/IconPaths'
import { Box, Flex, Grid, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme, { focused }: { focused: boolean }) => ({
  wrapper: {
    minWidth: '240px',
    width: '100%',
    height: '320px',
    borderRadius: '12px',
    padding: theme.spacing.md,
    background: 'linear-gradient(180deg, #01273A 0%, #002D42 100%)',
    cursor: 'pointer',
    border: `2px solid ${focused ? theme.colors.blue[5] : theme.colors.dark[7]}`,
    transition: 'all .2s',
    position: 'relative',

    '&:hover': {
      borderColor: theme.colors.blue[5],

      '& #three_dot': {
        visibility: 'visible',
      },
    },
  },
  statusDot: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    borderRadius: '100%',
    width: '12px',
    height: '12px',
  },
  threeDot: {
    visibility: 'hidden',
    position: 'absolute',
    top: '16px',
    right: '16px',
    transition: 'all .2s',
  },
  icon: {
    width: 24,
    height: 24,
    color: theme.colors.blue[5],
  },
}))

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
  const theme = useMantineTheme()
  const { classes } = useStyles({ focused: selected })
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { getQuery } = useQuery()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const selectedGroup = getQuery('selectedGroup')
  const STATUSES = {
    approved: { status: 'approved', text: 'Members', color: theme.colors.green[6] },
    pending: { status: 'pending', text: 'Awaiting approval', color: theme.colors.orange[6] },
    rejected: { status: 'rejected', text: 'Restricted', color: theme.colors.red[6] },
    all: { status: undefined, text: 'All', color: theme.colors.blue[5] },
  }
  const { cwClient } = useAccount()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))
  const selectedDAOGroup = daoGroups[selectedGroup]

  const { type, daoGroup, proposals, votes, votingModuleAddress } = useCurrentEntityDAOGroup(
    selectedDAOGroup?.coreAddress || '',
    daoGroups,
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
  }, [votingModuleAddress, cwClient, type, addr])

  const handleMemberView = () => {
    navigate(`${pathname}/${addr}`)
  }

  if (detailView) {
    return <MemberDetailCard member={member} onClose={() => setDetailView(false)} />
  }

  return (
    <Box className={classes.wrapper} onClick={() => onSelectMember(addr)}>
      <Box className={classes.statusDot} style={{ background: STATUSES[status!]?.color }} />
      <Box
        id='three_dot'
        className={classes.threeDot}
        onClick={(event) => {
          setDetailView(true)
          event.stopPropagation()
        }}
      >
        <ThreeDot />
      </Box>

      <Flex direction='column' align='center' justify='space-between' h='100%'>
        <Avatar url={avatar} size={100} />

        <Flex direction='column' align='center' gap='xs' w='100%'>
          <Typography size='lg' color='white' weight='medium' hover={{ underline: true }} onClick={handleMemberView}>
            {truncateString(name ?? addr, 20)}
          </Typography>
          <Typography size='sm' color='light-blue' weight='medium'>
            {role}
          </Typography>
        </Flex>

        <Grid columns={2} gutter='xs' w='100%'>
          <Grid.Col span={1}>
            <Flex align='center' gap='xs'>
              <Image src={IconPie} alt='Pie' className={classes.icon} />
              <Typography size='sm' color='white' weight='medium'>
                {new Intl.NumberFormat('en-us', {
                  style: 'percent',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format(userVotingPower ?? 0)}
              </Typography>
            </Flex>
          </Grid.Col>

          <Grid.Col span={1}>
            <Flex align='center' gap='xs'>
              <Image
                src={IconClaim}
                alt='Claim'
                className={classes.icon}
                style={{ color: type === 'staking' ? theme.colors.blue[5] : theme.colors.dark[5] }}
              />
              <Typography size='sm' color='white' weight='medium'>
                {type === 'staking' ? (
                  <CurrencyFormat displayType={'text'} value={userStakings} thousandSeparator />
                ) : (
                  'n/a'
                )}
              </Typography>
            </Flex>
          </Grid.Col>

          <Grid.Col span={1}>
            <Flex align='center' gap='xs'>
              <Image src={IconMultisig} alt='Multisig' className={classes.icon} />
              <Typography size='sm' color='white' weight='medium'>
                {userVotes ?? 0}
              </Typography>
            </Flex>
          </Grid.Col>

          <Grid.Col span={1}>
            <Flex align='center' gap='xs'>
              <Image src={IconPaper} alt='Paper' className={classes.icon} />
              <Typography size='sm' color='white' weight='medium'>
                {userProposals ?? 0}
              </Typography>
            </Flex>
          </Grid.Col>
        </Grid>
      </Flex>
    </Box>
  )
}

export default MemberCard
