import { FlexBox } from 'components/App/App.styles'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MembersView } from './MembersView'
import { Toolbar } from './Toolbar'
import Members from '../members.json'

const OverviewMembers: React.FC = (): JSX.Element => {
  const { entityId, groupId } = useParams<{ entityId: string; groupId: string }>()
  console.log('DAODashboard', 'entityId', entityId, 'groupId', groupId)

  const [filter, setFilter] = useState<{
    status: 'approved' | 'pending' | 'rejected' | undefined
    view: 'panel' | 'list'
    keyword: string
  }>({ status: 'approved', view: 'panel', keyword: '' })

  const filteredMembers = Members.filter(
    (item) => (!filter.status || item.status === filter.status) && (!filter.keyword || item.address === filter.keyword),
  )

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
      <MembersView view={filter.view} members={filteredMembers} />
    </FlexBox>
  )
}
export default OverviewMembers
