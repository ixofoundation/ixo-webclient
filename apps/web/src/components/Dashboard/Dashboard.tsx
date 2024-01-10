import React, { ReactNode, createContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { deviceWidth } from 'constants/device'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs'
import { MatchType } from 'types/models'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import { HeaderTab, Path } from './types'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
// import { entityTypeMap } from 'modules/Entities/strategy-map'

const Container = styled.div<{ color: string }>`
  display: block;
  flex: 1 1 auto;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  color: ${(props): string => props.color};

  @media (min-width: ${deviceWidth.mobile}px) {
    display: flex;
  }
`

const Board = styled.div<{ themeMode: string }>`
  background: ${(props): string => (props.themeMode === 'light' ? '#ffffff' : '#023')};

  padding: 2.5rem 0.75rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${deviceWidth.mobile}px) {
    padding: 2rem 2.25rem;
    width: calc(100% - 75px);
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

export const DashboardThemes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type DashboardTheme = typeof DashboardThemes[keyof typeof DashboardThemes]

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
  const [_theme, setTheme] = useState(theme)

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
        <Board themeMode={_theme}>
          {!noBreadcrumbs && <Breadcrumb subRoutes={subRoutes} baseRoutes={baseRoutes} />}
          <Header title={title} />
          <Break />
          <Content>{children}</Content>
        </Board>
      </Container>
    </DashboardThemeContext.Provider>
  )
}

export default Dashboard
