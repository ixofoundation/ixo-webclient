import { Card } from '../Card'


import { Flex } from '@mantine/core'
import Assistant from 'components/Assistant'

const AssistantCard = () => {
  return (
    <Card
      icon={<img src="/assets/images/icon-bell.svg"  />}
      title={'Assistant'}
      columns={1}
      items={
        <Flex direction='column' w='100%' h='100%'>
          <Assistant />
        </Flex>
      }
    />
  )
}

export default AssistantCard
