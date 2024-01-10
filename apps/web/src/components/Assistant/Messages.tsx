import { Flex, Text } from '@mantine/core'
import { useTheme } from 'styled-components'

type Props = {
  message: string
}

export function UserMessage({ message }: Props) {
  const theme: any = useTheme()
  if (!message) return null
  return (
    <Text p='lg' style={{ backgroundColor: theme.ixoGrey300, borderRadius: '16px' }} fw={300}>
      {message}
    </Text>
  )
}

export function AssistantErrorMessage({ error }: { error: Error }) {
  const theme: any = useTheme()
  return (
    <Flex direction='column' align='flex-end' bg={theme.ixoRed} justify='space-between'>
      <Text color='red' fw={900}>
        {error.name}
      </Text>
      <Text>{error.message}</Text>
    </Flex>
  )
}

export function AssistantMessage({ message }: Props) {
  return (
    <Text p='lg' fw={300}>
      {message}
    </Text>
  )
}

export function AssistantThinkingMessage() {
  const theme: any = useTheme()
  return (
    <Text p='lg' fw={300} color={theme.ixoGrey900}>
      Thinking...
    </Text>
  )
}
