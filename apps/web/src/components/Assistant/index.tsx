import { Flex, Text } from '@mantine/core'

import Conversation from './Conversation'
import QueryInput from './QueryInput'
import { useTheme } from 'styled-components'

export default function Assistant() {
  const theme: any = useTheme()
  return (
    <Flex
      direction='column'
      justify='space-between'
      h='100%'
      style={{ borderRadius: '16px', backgroundColor: theme.ixoWhite }}
    >
      <Text pb='lg'>
        Impact Assistant <b>Oxi</b>
      </Text>
      <Flex direction='column' justify='flex-end' style={{ flexGrow: 1 }}>
        <Conversation />
        <QueryInput />
      </Flex>
    </Flex>
  )
}
