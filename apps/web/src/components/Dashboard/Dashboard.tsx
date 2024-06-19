import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { deviceWidth } from 'constants/device'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs'
import { MatchType } from 'types/models'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import { HeaderTab, Path } from './types'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entities/entities.selectors'
import { selectAssistantToggle } from 'redux/assistant/assistant.selectors'
import { Flex, ScrollArea } from '@mantine/core'
import ControlPanel from 'components/ControlPanel'
// import { entityTypeMap } from 'modules/Entities/strategy-map'

const Container = styled.div<{ color: string }>`
  display: block;
  flex: 1 1 auto;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  color: ${(props): string => props.color};
  height: 100%;

  @media (min-width: ${deviceWidth.mobile}px) {
    display: flex;
  }
`

const Board = styled.div<{ $themeMode: string }>`
  background: ${(props): string => (props.$themeMode === 'light' ? '#ffffff' : '#023')};

  padding: 2.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${deviceWidth.mobile}px) {
    padding: 2rem 2.25rem;
  }
`
const Content = styled.div`
  padding: 0.5rem 0rem;
  width: 100%;
  height: 100%;
`

const Break = styled.div`
  @media (max-width: ${deviceWidth.mobile}px) {
    margin: 5px 0;
  }
`

const StyledScrollArea = styled(ScrollArea)`
  & > div > div {
    height: 100%;
  }
`

export const DashboardThemes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type DashboardTheme = (typeof DashboardThemes)[keyof typeof DashboardThemes]

export interface ThemeContext {
  theme: string
  isDark: boolean
  setTheme: (theme: DashboardTheme) => void
}

export const DashboardThemeContext = createContext<ThemeContext>({
  theme: 'light',
  isDark: false,
  setTheme: (theme: DashboardTheme) => {
    //
  },
})

interface Props {
  title: string | JSX.Element
  subRoutes: Path[]
  baseRoutes: Path[]
  theme: DashboardTheme
  tabs?: HeaderTab[]
  entityType?: string
  matchType?: string
  noTabs?: boolean
  noBreadcrumbs?: boolean
  children: ReactNode
}

const Dashboard: React.FunctionComponent<Props> = ({
  title,
  subRoutes,
  baseRoutes,
  tabs,
  theme = 'dark',
  children,
  entityType,
  matchType = MatchType.strict,
  noTabs = false,
  noBreadcrumbs = false,
}) => {
  const entityTypeMap = useAppSelector(selectEntityConfig)
  const togglePanel = useAppSelector(selectAssistantToggle)
  const [_theme, setTheme] = useState(theme)

  const viewport = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  return (
    <DashboardThemeContext.Provider value={{ theme: _theme, isDark: _theme === 'dark', setTheme }}>
      <Container color={_theme === 'dark' ? 'white' : 'black'}>
        {!noTabs && (
          <HeaderTabs
            buttons={tabs}
            matchType={matchType}
            enableAssistantButton={true}
            activeTabColor={entityTypeMap![entityType!]?.themeColor}
          />
        )}
        <Sidebar routes={subRoutes} />
        <Flex w={'100%'} h='100%'>
          <StyledScrollArea w='100%' h='100%' viewportRef={viewport}>
            <Flex w='100%' h='100%' style={{ flex: 1 }}>
              <Board $themeMode={_theme}>
                {!noBreadcrumbs && <Breadcrumb subRoutes={subRoutes} baseRoutes={baseRoutes} />}
                <Header title={title} />
                <Break />
                <Content>{children}</Content>
              </Board>
            </Flex>
          </StyledScrollArea>
          <Flex style={{ flex: 1 }}>
            {togglePanel && <ControlPanel tab='assistant' entityType={entityType ?? ''} />}
          </Flex>
        </Flex>
      </Container>
    </DashboardThemeContext.Provider>
  )
}

export default Dashboard
