import { Box, Flex, Text } from '@mantine/core'

const ChatHistory = () => {
  return (
    <Flex w='20%' h={'100%'} bg='rgb(30,30,30)' direction={'column'}>
      <Flex flex={1} m={30}>
      <Box mt={20} w="100%">
          <Text>History</Text>
        </Box>
      </Flex>
      <Flex h='18%' w='100%' bg='#EBEBEB'></Flex>
    </Flex>
  )
}

export default ChatHistory
