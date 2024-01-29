import { Flex, Text } from '@mantine/core'

export const GettingStarted = () => {
  return (
    <Flex direction='column' w='100%' h='100%' justify='space-between' align='space-between'>
      <Text style={{ fontWeight: 500 }} size='lg' mt='md'>
        Getting Started
      </Text>

      <Flex h='30%' direction='column' align='center'>
        <Text style={{ fontWeight: 500, textAlign: "center" }} size='md' mt='md'>
          What are wallets?
        </Text>

        <Text size='sm' mt='md'>
          Wallets are used to send, receive, and access all your digital assets like OSMO and ATOM.
        </Text>
      </Flex>
    </Flex>
  )
}
