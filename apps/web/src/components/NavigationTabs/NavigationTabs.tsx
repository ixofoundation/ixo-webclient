import { ActionIcon, Button, Flex, Text, Tooltip, em } from '@mantine/core'
import { useQuery } from 'hooks/window'
import { lowerCase } from 'lodash'
import { ReactNode } from 'react'
import { useLocation, useParams, NavLink } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useCompanion } from 'hooks/useCompanion'
import { tabs } from './tabs'
import { useTabDesignConfig } from 'hooks/userInterface/useTabDesignConfig'
import { toRootEntityType } from 'utils/entities'
import { useMediaQuery } from '@mantine/hooks'
import AssistantActiveLottie from 'components/Zlotties/AssistantActiveLottie'

const NavigationTabsContainer = ({ children, border }: { children: ReactNode; border?: string }) => {
  const isTablet = useMediaQuery(`(max-width: ${em(810)})`)

  return (
    <Flex
      visibleFrom='sm'
      bg='transparent'
      pos={'fixed'}
      style={{
        zIndex: 12,
        left: isTablet ? '50%' : '75%',
        top: 78,
        transform: 'translate(-50%, -50%)',
        borderRadius: 5,
        overflow: 'hidden',
        ...(border && { border }),
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
  const entity = useAppSelector(getEntityById((params?.deedId ?? params.entityId) ?? ""))
  const { isCompanionOpen, toggleChat, toggleCompanion } = useCompanion()

  const {
    tabActiveBackground,
    tabActiveColor,
    tabBackground,
    tabColor,
    tabBorderColor,
    assistantActiveBackground,
    assistantBackground,
  } = useTabDesignConfig()


  const { pathname } = useLocation()

  if (!isWhiteListed(pathname)) {
    return null
  }

  const handleAssistantClick = () => {
    toggleChat()
    toggleCompanion()
  }

  if(!entity) return null 

  const type = lowerCase((exploreType?.length ?? 0) > 0 ? exploreType : toRootEntityType(entity?.type) ?? '')


  const currentTabs = tabs[pathname.split('/')[1] as keyof typeof tabs].getTabs(type, pathname, params as any)
  return (
    <NavigationTabsContainer border={tabBorderColor && `1px solid ${tabBorderColor}`}>
      {currentTabs.map(({ label, icon: Icon, isActive, path }) => (
        <NavLink key={`${path}`} to={`${path}`}>
          <Button
            w={150}
            key={label}
            leftSection={
              <Icon
                size={20}
                fill={isActive && !isCompanionOpen ? tabActiveColor : tabColor}
                stroke={isActive && !isCompanionOpen ? tabActiveColor : tabColor}
              />
            }
            variant='filled'
            bg={isActive && !isCompanionOpen ? tabActiveBackground : tabBackground}
            radius='0'
            h='42px'
            p='sm'
            style={{ ...(tabBorderColor && { borderRight: `1px solid ${tabBorderColor}` }), outline: 'none' }}
          >
            <Text c={isActive && !isCompanionOpen ? tabActiveColor : tabColor} fz='sm'>
              {label}
            </Text>
          </Button>
        </NavLink>
      ))}
      <Flex justify={'center'} align={'center'}>
        <Tooltip
          label='Companion'
          color='white'
          c='black'
          position='bottom'
          offset={10}
          withArrow
          arrowSize={5}
          radius={5}
          fz='lg'
          p={10}
          style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' }}
        >
          <ActionIcon
            variant='filled'
            aria-label='Settings'
            h={'42px'}
            w='50px'
            radius={0}
            bg={isCompanionOpen ? assistantActiveBackground : assistantBackground}
            onClick={handleAssistantClick}
            styles={{
              root: {
                ":focus": {
                  outline: 'none'
                },
                outline: 'none'
              }
            }}
          >
          <AssistantActiveLottie />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </NavigationTabsContainer>
  )
}

export default NavigationTabs
