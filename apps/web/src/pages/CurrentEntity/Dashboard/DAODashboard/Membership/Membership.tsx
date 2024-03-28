import React, { useMemo, useState } from 'react'
import { MembersView } from './MembersView'
// import { Toolbar } from './Toolbar'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Member } from 'types/dao'
import { useAppSelector } from 'redux/hooks'
import { selectEntitiesByType } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { findDAObyDelegateAccount } from 'utils/entities'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { Flex } from '@mantine/core'
import { GridContainer, GridItem } from 'components/App/App.styles'
import GovernanceCard from 'pages/MyAccount/MyGroupsPage/GroupView/GovernanceCard'
import VotingPowerCard from 'pages/MyAccount/MyGroupsPage/GroupView/VotingPowerCard'
import TokensCard from 'pages/MyAccount/MyGroupsPage/GroupView/TokensCard'
import { useNavigate, useParams } from 'react-router-dom'

const Membership: React.FC = (): JSX.Element | null => {
  const navigate = useNavigate()
  const { entityId } = useParams<{ entityId: string }>()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { isImpactsDAO, linkedEntity, daoController, daoGroups } = useCurrentEntity()
  const selectedDAOGroup = daoGroups[selectedGroup]

  const daos = useAppSelector(selectEntitiesByType('dao'))
  const members: Member[] = useMemo(
    () =>
      isImpactsDAO && daoController === selectedDAOGroup?.coreAddress
        ? (selectedDAOGroup?.votingModule.members ?? [])
            .filter((member: Member) =>
              linkedEntity.some(({ type, id }) => type === 'MemberDAO' && id.includes(member.addr)),
            )
            .map((member: Member) => {
              const subDAO = findDAObyDelegateAccount(daos, member.addr)[0]
              const avatar = subDAO?.profile?.logo || subDAO?.profile?.image
              const name = subDAO?.profile?.name || ''
              return { ...member, avatar, name }
            })
        : selectedDAOGroup?.votingModule.members ?? [],
    [
      isImpactsDAO,
      daoController,
      selectedDAOGroup?.coreAddress,
      selectedDAOGroup?.votingModule.members,
      linkedEntity,
      daos,
    ],
  )

  const [selectedMembers, setSelectedMembers] = useState<{ [key: string]: boolean }>({})
  const [filter] = useState<{
    status: 'approved' | 'pending' | 'rejected' | undefined
    view: 'panel' | 'list'
    keyword: string
  }>({ status: undefined, view: 'panel', keyword: '' })

  const [sort, setSort] = useState<{ [key: string]: 'asc' | 'desc' | undefined }>({
    name: 'asc',
    votingPower: undefined,
    staking: undefined,
    votes: undefined,
    proposals: undefined,
  })

  const filteredMembers = useMemo(() => {
    const [sortBy, order] = Object.entries(sort).find(([, value]) => value) ?? ['name', 'asc']
    return members
      .filter(
        (member) =>
          (!filter.keyword || member.addr === filter.keyword) && (!filter.status || member.status === filter.status),
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
          default:
            if (order === 'desc') return String(b?.name || b.addr).localeCompare(String(a?.name || a.addr))
            return String(a?.name || a.addr).localeCompare(String(b?.name || b.addr))
          case 'votingPower':
            if (order === 'desc') return b.weight - a.weight
            return a.weight - b.weight
          case 'staking':
            if (order === 'desc') return (b?.staking as number) - (a?.staking as number)
            return (a?.staking as number) - (b?.staking as number)
          case 'votes':
            if (order === 'desc') return (b.votes as number) - (a.votes as number)
            return (a.votes as number) - (b.votes as number)
          case 'proposals':
            if (order === 'desc') return (b.proposals as number) - (a.proposals as number)
            return (a.proposals as number) - (b.proposals as number)
        }
      })
  }, [filter, sort, members])

  return (
    <Flex direction='column' gap={24} w='100%'>
      <Groups />

      {selectedDAOGroup && (
        <Flex direction='column' gap={28} w='100%'>
          <Flex gap={24} align='center'>
            <Typography variant='secondary' size='5xl' transform='capitalize'>
              {selectedDAOGroup.config.name}
            </Typography>
            {/* <Toolbar
              status={filter.status}
              view={filter.view}
              keyword={filter.keyword}
              numOfMembers={members.length}
              onStatusChange={(status) => setFilter((pre) => ({ ...pre, status }))}
              onViewChange={(view) => setFilter((pre) => ({ ...pre, view }))}
              onKeywordChange={(keyword) => setFilter((pre) => ({ ...pre, keyword }))}
            /> */}
          </Flex>

          <GridContainer
            $gridTemplateAreas={`"a b"`}
            $gridTemplateColumns={'1fr 1fr'}
            $gridTemplateRows={'repeat(1, minmax(340px, auto))'}
            $gridGap={6}
            width='100%'
          >
            <GridItem $gridArea='a' $alignSelf='center' height='100%'>
              <GovernanceCard daoGroup={selectedDAOGroup} />
            </GridItem>
            <GridItem $gridArea='b' $alignSelf='center' height='100%'>
              {selectedDAOGroup.type === 'membership' ? (
                <VotingPowerCard daoGroup={selectedDAOGroup} />
              ) : (
                <TokensCard
                  daoGroup={selectedDAOGroup}
                  onAction={() => navigate(`/entity/${entityId}/dashboard/shareholders?selectedGroup=${selectedGroup}`)}
                />
              )}
            </GridItem>
          </GridContainer>

          <MembersView
            view={filter.view}
            members={filteredMembers}
            sort={sort}
            setSort={setSort}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
        </Flex>
      )}
    </Flex>
  )
}
export default Membership
