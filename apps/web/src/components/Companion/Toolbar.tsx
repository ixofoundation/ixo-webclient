import { ActionIcon, Box, Card, Flex, Text } from '@mantine/core'
import { LiaBoltSolid, LiaPlaySolid } from 'react-icons/lia'
import { useCompanion } from 'hooks/useCompanion'
import AssistantIcon from 'assets/images/icon-assistant.svg'
import { useMatch } from 'react-router-dom'

export const ToolbarNavigation = () => {
  const { closeChat, toggleChat, toggleCompanion } = useCompanion()

  const showActionsButton = useMatch('/entity/:entityId/overview')
  const showNotificationsButton = useMatch('/entity/:entityId/overview')

  const handleActionsClick = () => {
    closeChat()
  }

  const handleAssistantClick = () => {
    toggleChat()
    toggleCompanion()
  }

  return (
    <Flex
      justify={showActionsButton ? 'space-around' : 'flex-end'}
      h='18%'
      w='360px'
      bg='#EBEBEB'
    >
      <Flex gap={35} mt={25}>
        {showActionsButton && (
          <ActionIcon size={46} radius='xl' bg='white' onClick={handleActionsClick}>
            <LiaPlaySolid size='24' color='#20798C' />
          </ActionIcon>
        )}
        {showNotificationsButton && (
          <ActionIcon size={46} radius='xl' bg='white'>
            <LiaBoltSolid size='24' color='#20798C' />
          </ActionIcon>
        )}
        <ActionIcon size={46} radius='xl' color='#20798C' mr={showActionsButton ? 0 : 82} onClick={handleAssistantClick}>
          <AssistantIcon color="white" />
        </ActionIcon>
      </Flex>
    </Flex>
  )
}

export const Toolbar = () => {
  return (
    <Flex w='19.5%' bg='rgb(30,30,30)' direction={'column'}>
      <Flex flex={1} m={30}>
        <Box mt={20} w='100%'>
          <Text>Talking to</Text>
          <Card mt={8} bg='rgb(60,60,60)' radius={'sm'}>
            <Flex>
              <AssistantIcon />{' '}
              <Text ml={8} c='white'>
                Oxi
              </Text>
            </Flex>
          </Card>
        </Box>
      </Flex>
      <ToolbarNavigation />
    </Flex>
  )
}
