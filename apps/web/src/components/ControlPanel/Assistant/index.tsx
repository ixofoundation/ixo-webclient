import { Card } from '../Card'

import CommentIcon from 'assets/images/icon-bell.svg'
import { Flex } from '@mantine/core'
import Assistant from 'components/Assistant'

const AssistantCard = () => {
  return (
    <Card
      icon={<CommentIcon />}
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
