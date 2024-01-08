import { Card } from 'pages/CurrentEntity/Components'
import React from 'react'
import { ReactComponent as AgentsIcon } from 'assets/img/sidebar/agents.svg'
import { Flex } from '@mantine/core'
import { useParticipatingDAO } from 'hooks/dao'
import { useAccount } from 'hooks/account'
import { TDAOGroupModel } from 'types/entities'
import GroupCard from './GroupCard'

const GroupsCard: React.FC = () => {
  const { address } = useAccount()
  const { participatingDAOGroups } = useParticipatingDAO(address)

  console.log({ participatingDAOGroups })

  return (
    <Card label={`Member of ${participatingDAOGroups.length ?? 0} Groups`} icon={<AgentsIcon />}>
      <Flex gap={12} w={'100%'} style={{ overflowX: 'auto' }}>
        {participatingDAOGroups.map((daoGroup: TDAOGroupModel, index: number) => (
          <GroupCard key={index} daoGroup={daoGroup} />
        ))}
      </Flex>
    </Card>
  )
}

export default GroupsCard
