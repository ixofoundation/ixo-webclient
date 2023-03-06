import { FlexBox } from 'components/App/App.styles'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MembersView } from './MembersView'
import { Toolbar } from './Toolbar'
import { useGetMembers } from 'hooks/dao'

const OverviewMembers: React.FC = (): JSX.Element => {
  const { groupId, entityId: daoId } = useParams<{ entityId: string; groupId: string }>()
  const { data, refetch } = useGetMembers(daoId, groupId)

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

  useEffect(() => {
    refetch({
      daoId,
      groupId,
      status: filter.status!,
      keyword: filter.keyword,
      sortBy: Object.keys(sort).pop(),
      order: Object.values(sort).pop(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort])

  console.log('useGetMembers', data)

  return (
    <FlexBox direction='column' gap={7.5}>
      <Toolbar
        status={filter.status}
        view={filter.view}
        keyword={filter.keyword}
        onStatusChange={(status) => setFilter((pre) => ({ ...pre, status }))}
        onViewChange={(view) => setFilter((pre) => ({ ...pre, view }))}
        onKeywordChange={(keyword) => setFilter((pre) => ({ ...pre, keyword }))}
      />
      <MembersView view={filter.view} members={data} sort={sort} setSort={setSort} />
    </FlexBox>
  )
}
export default OverviewMembers
