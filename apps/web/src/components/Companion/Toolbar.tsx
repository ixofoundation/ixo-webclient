import { ActionIcon, Box, Card, Flex, Text } from '@mantine/core'
import { LiaBoltSolid, LiaPlaySolid } from 'react-icons/lia'
import Lottie from 'react-lottie'
import * as inactiveAnimation from 'assets/animations/assistant/inactive.json'
import { useCompanion } from 'hooks/useCompanion'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useMatch } from 'react-router-dom'

export const ToolbarNavigation = () => {
  const { closeChat } = useCompanion()

  const showActionsButton = useMatch('/entity/:entityId/overview')
  const showNotificationsButton = useMatch('/entity/:entityId/overview')

  const handleActionsClick = () => {
    closeChat()
  }

  return (
    <Flex
      justify={showActionsButton ? 'space-around' : 'flex-end'}
      h='18%'
      gap={40}
      w='100%'
      bg='#EBEBEB'
    >
      <Flex gap={35} mt={25}>
        {showActionsButton && (
          <ActionIcon size={45} radius='xl' bg='white' onClick={handleActionsClick}>
            <LiaPlaySolid size='24' color='#20798C' />
          </ActionIcon>
        )}
        {showNotificationsButton && (
          <ActionIcon size={45} radius='xl' bg='white'>
            <LiaBoltSolid size='24' color='#20798C' />
          </ActionIcon>
        )}
        <ActionIcon size={45} radius='xl' color='#20798C' mr={showActionsButton ? 0 : 82}>
          <Lottie
            height={40}
            width={40}
            options={{
              loop: false,
              autoplay: false,
              animationData: inactiveAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        </ActionIcon>
      </Flex>
    </Flex>
  )
}

export const Toolbar = () => {
  return (
    <Flex w='20%' bg='rgb(30,30,30)' direction={'column'}>
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
