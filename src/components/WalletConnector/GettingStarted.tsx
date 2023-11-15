import { Flex, Text, Box } from '@mantine/core'

export const GettingStarted = () => {
  return (
    <Flex direction='column' w='100%' h='100%' justify='space-between' align='space-between'>
      <Text weight={500} size='lg' mt='md'>
        Getting Started
      </Text>

      <Flex h='30%' direction='column' align='center'>
        <Text weight={500} size='md' mt='md' align='center'>
          What are wallets?
        </Text>

        <Text size='sm' mt='md' align='center'>
          Wallets are used to send, receive, and access all your digital assets like OSMO and ATOM.
        </Text>
      </Flex>
    </Flex>
  )
}
