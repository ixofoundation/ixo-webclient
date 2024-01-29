import { Card } from '../Card'
import { ReactComponent as CommentIcon } from 'assets/images/icon-bell.svg'
import { Flex } from '@mantine/core'
import Assistant from 'components/Assistant'

const AssistantCard = () => {
  return (
    <Card
      icon={<CommentIcon />}
      title={'Assistant'}
      columns={1}
      items={
        <Flex direction='column' gap={16} w='100%' h='100%'>
          <Assistant />
        </Flex>
      }
    />
  )
}

export default AssistantCard
