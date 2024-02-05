import { Flex } from '@mantine/core'
import React from 'react'
import GroupsCard from './GroupsCard'
import { useQuery } from 'hooks/window'
import GroupView from './GroupView'

const MyGroupsPage = () => {
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')

  return (
    <Flex direction={'column'} gap={40}>
      <GroupsCard />
      {selectedGroup && <GroupView selectedGroup={selectedGroup} />}
    </Flex>
  )
}

export default MyGroupsPage
