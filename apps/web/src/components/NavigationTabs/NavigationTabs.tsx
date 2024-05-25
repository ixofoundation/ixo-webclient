import { ActionIcon, Box, Button, Flex, Text } from '@mantine/core'
import { useQuery } from 'hooks/window'
import { capitalize, lowerCase } from 'lodash'
import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import * as activeAnimation from 'assets/animations/assistant/active.json'
import * as inactiveAnimation from 'assets/animations/assistant/inactive.json'
import Lottie from 'react-lottie'
import { useDisclosure } from '@mantine/hooks'
import { useCompanion } from 'hooks/useCompanion'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { tabs } from './tabs'

const NavigationTabsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      bg='blue'
      pos={'fixed'}
      style={{
        zIndex: 12,
        left: '75%',
        top: 78,
        transform: 'translate(-50%, -50%)',
        borderRadius: 5,
        overflow: 'hidden',
        border: '1px solid black',
      }}
    >
      {children}
    </Flex>
  )
}

const isWhiteListed = (pathname: string) => {
  const whiteList = ['/explore', '/entity']
  return whiteList.some((path) => pathname.includes(path))
}

const NavigationTabs = () => {
  const { getQuery } = useQuery()
  const params = useParams()
  const exploreType: string | undefined = getQuery('type')
  const entity = useAppSelector(getEntityById(params.entityId ?? ''))
  const [animationData, setAnimationData] = useState(inactiveAnimation)
  const { isChatOpen, isCompanionOpen, toggleChat, toggleCompanion } = useCompanion()
  const navigate = useNavigate()
  const config = useAppSelector(selectEntityConfig)
  const tabConfig = config.UI?.header?.tabs

  console.log({ params, after: params['*'] })

  const type = lowerCase(exploreType ?? entity?.type ?? '')
  const { pathname } = useLocation()

  if (!isWhiteListed(pathname)) {
    return null
  }

  const handleAssistantClick = () => {
    toggleChat()
    toggleCompanion()
  }

  const currentTabs = tabs[pathname.split('/')[1] as keyof typeof tabs].getTabs(type, pathname, params as any)
  return (
    <NavigationTabsContainer>
      {currentTabs.map(({ label, icon: Icon, isActive, path }) => (
        <NavLink key={`${path}`} to={`${path}`}>
          <Button
            key={label}
            leftSection={<Icon size={20} fill={isActive ? 'white' : 'black'} stroke={isActive ? 'white' : 'black'} />}
            variant='filled'
            bg={isActive && !isCompanionOpen ? tabConfig?.active.background : tabConfig?.background}
            radius='0'
            h='42px'
            p='sm'
            style={{ borderRight: '1px solid black' }}
          >
            <Text c={isActive && !isCompanionOpen ? tabConfig?.active.color : tabConfig?.color} fz='sm'>
              {label}
            </Text>
          </Button>
        </NavLink>
      ))}
      <Flex justify={'center'} align={'center'}>
        <ActionIcon
          variant='filled'
          aria-label='Settings'
          h={'100%'}
          w='50px'
          bg={isCompanionOpen ? tabConfig?.active.background : 'currentColor'}
          onClick={handleAssistantClick}
        >
          <AssistantIcon
            stroke={isCompanionOpen ? tabConfig?.background : 'black'}
            fill={isCompanionOpen ? tabConfig?.background : 'black'}
          />
        </ActionIcon>
      </Flex>
    </NavigationTabsContainer>
  )
}

export default NavigationTabs
