import { FlexBox } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MembersView } from './MembersView'
import { Toolbar } from './Toolbar'
// import { useGetMembers } from 'hooks/dao'
import useCurrentDao from 'hooks/useCurrentDao'

const OverviewMembers: React.FC = (): JSX.Element | null => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  const { getMembersByAddress } = useCurrentDao()
  const members = getMembersByAddress(coreAddress)
  const numOfMembers = members.length

  const [filter, setFilter] = useState<{
    status: 'approved' | 'pending' | 'rejected' | undefined
    view: 'panel' | 'list'
    keyword: string
  }>({ status: 'approved', view: 'panel', keyword: '' })
  const [sort, setSort] = useState<{ [key: string]: 'asc' | 'desc' | undefined }>({
    name: 'asc',
    votingPower: undefined,
    staking: undefined,
    votes: undefined,
    proposals: undefined,
  })
  // const [filteredMembers, setFilteredMembers] = useState(members)
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
            if (order === 'desc') return (b?.name as string).localeCompare(a?.name as string)
            return (a?.name as string).localeCompare(b?.name as string)
          case 'votingPower':
            if (order === 'desc') return b?.weight - a?.weight
            return a?.weight - b?.weight
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
    <FlexBox direction='column' gap={7.5}>
      <Toolbar
        status={filter.status}
        view={filter.view}
        keyword={filter.keyword}
        numOfMembers={numOfMembers}
        onStatusChange={(status) => setFilter((pre) => ({ ...pre, status }))}
        onViewChange={(view) => setFilter((pre) => ({ ...pre, view }))}
        onKeywordChange={(keyword) => setFilter((pre) => ({ ...pre, keyword }))}
      />
      <MembersView view={filter.view} members={filteredMembers} sort={sort} setSort={setSort} />
    </FlexBox>
  )
}
export default OverviewMembers
