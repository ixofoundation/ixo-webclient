import { Flex } from '@mantine/core'
import { withEntityData } from 'components'
import React from 'react'
import { DaoCard } from 'components/EntityCards/DaoCard'
import useCurrentEntity from 'hooks/currentEntity'
import { Card } from 'components/Card'

import { ReactComponent as AgentIcon } from 'assets/img/sidebar/agents.svg'

const DAOOverview: React.FC = () => {
  const { currentEntity } = useCurrentEntity()
  const WrappedDAOCard = withEntityData(DaoCard)

  return (
    <Flex w={'100%'} direction={'column'} gap={6}>
      <Flex justify='center' gap={48}>
        <Flex w={300}>
          <WrappedDAOCard {...currentEntity} />
        </Flex>
        <Flex style={{ flex: 1 }}>
          <Card title='Groups' icon={<AgentIcon />} width='100%'>
            asdf
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DAOOverview
