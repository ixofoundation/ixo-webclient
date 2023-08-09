import { FlexBox } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { MembersView } from './MembersView'
import { Toolbar } from './Toolbar'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Member } from 'types/dao'
import { useAppSelector } from 'redux/hooks'
import { selectEntitiesByType } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { findDAObyDelegateAccount } from 'utils/entities'
import useCurrentEntity from 'hooks/currentEntity'

const Membership: React.FC = (): JSX.Element | null => {
  const { isImpactsDAO, linkedEntity } = useCurrentEntity()
  const { selectedDAOGroup, selectDAOGroup } = useCurrentEntity()
  const daos = useAppSelector(selectEntitiesByType('dao'))
  const members: Member[] = useMemo(
    () =>
      isImpactsDAO
        ? (selectedDAOGroup?.votingModule.members ?? [])
            .filter((member: Member) =>
              linkedEntity.some(({ type, id }) => type === 'MemberDAO' && id.includes(member.addr)),
            )
            .map((member: Member) => {
              const subDAO = findDAObyDelegateAccount(daos, member.addr)[0]
              const avatar = subDAO?.profile?.logo || ''
              const name = subDAO?.profile?.name || ''
              return { ...member, avatar, name }
            })
        : selectedDAOGroup?.votingModule.members ?? [],
    [selectedDAOGroup, isImpactsDAO, daos, linkedEntity],
  )

  const [selectedMembers, setSelectedMembers] = useState<{ [key: string]: boolean }>({})
  const [filter, setFilter] = useState<{
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
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups selectedGroup={selectedDAOGroup} selectDaoGroup={(address: string) => selectDAOGroup(address)} />

      {selectedDAOGroup && (
        <FlexBox direction='column' gap={7.5} width='100%'>
          <FlexBox gap={6} alignItems='center'>
            <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
              {selectedDAOGroup.config.name}
            </Typography>
            <Toolbar
              status={filter.status}
              view={filter.view}
              keyword={filter.keyword}
              numOfMembers={members.length}
              onStatusChange={(status) => setFilter((pre) => ({ ...pre, status }))}
              onViewChange={(view) => setFilter((pre) => ({ ...pre, view }))}
              onKeywordChange={(keyword) => setFilter((pre) => ({ ...pre, keyword }))}
            />
          </FlexBox>
          <MembersView
            view={filter.view}
            members={filteredMembers}
            sort={sort}
            setSort={setSort}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
        </FlexBox>
      )}
    </FlexBox>
  )
}
export default Membership
