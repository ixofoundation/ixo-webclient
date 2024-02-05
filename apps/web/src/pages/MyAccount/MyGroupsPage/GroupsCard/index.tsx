import { Card } from 'pages/CurrentEntity/Components'
import React from 'react'
import { ReactComponent as AgentsIcon } from 'assets/img/sidebar/agents.svg'
import { Flex, Loader } from '@mantine/core'
import { useDAO, useParticipatingDAO } from 'hooks/dao'
import { useAccount } from 'hooks/account'
import { TDAOGroupModel } from 'types/entities'
import GroupCard from './GroupCard'

const GroupsCard: React.FC = () => {
  const { address } = useAccount()
  const { daoGroups } = useDAO()
  const { participatingDAOGroups } = useParticipatingDAO(address)

  if (participatingDAOGroups.length === 0) {
    if (daoGroups.length === 0) {
      return (
        <Card label={`Loading Membership data`} icon={<AgentsIcon />}>
          <Flex w='100%' mih='300px' justify={'center'} align={'center'}>
            <Loader color='ixo-blue' />
          </Flex>
        </Card>
      )
    } else {
      return (
        <Card label={`Groups`} icon={<AgentsIcon />}>
          <Flex w='100%' mih='300px' justify={'center'} align={'center'}>
            You are not participating to any DAO
          </Flex>
        </Card>
      )
    }
  }

  return (
    <Card label={`Member of ${participatingDAOGroups.length} Groups`} icon={<AgentsIcon />}>
      <Flex gap={12} w={'100%'} style={{ overflowX: 'auto' }}>
        {participatingDAOGroups.map((daoGroup: TDAOGroupModel, index: number) => (
          <GroupCard key={index} daoGroup={daoGroup} />
        ))}
      </Flex>
    </Card>
  )
}

export default GroupsCard
