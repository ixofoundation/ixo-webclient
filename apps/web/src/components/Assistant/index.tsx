import { Flex } from '@mantine/core'

import Conversation from './Conversation'
import QueryInput from './QueryInput'

export default function Assistant() {
  return (
    <Flex
      direction='column'
      justify='space-between'
      h='100%'
      style={{ borderRadius: '16px' }}
    >
      <Flex direction='column' justify='flex-end' style={{ flexGrow: 1 }}>
        <Conversation />
        <QueryInput />
      </Flex>
    </Flex>
  )
}
