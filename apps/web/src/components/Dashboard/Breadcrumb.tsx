import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, Route, Routes } from 'react-router-dom'
import RightIcon from 'assets/icons/Right'
import { deviceWidth } from 'constants/device'
import { DashboardThemeContext, ThemeContext } from './Dashboard'
import { Path } from './types'

const Container = styled.div<{ theme: ThemeContext }>`
  font-size: 10px;
  line-height: 20px;
  display: flex;
  align-items: center;
  font-weight: normal;
  padding: 0rem 0.25rem;

  svg {
    margin: 0 0.5rem;
  }
  a {
    color: ${({ theme }): string => (theme.isDark ? '#436779' : '#979797')};
  }
  a:last-child {
    color: ${({ theme }): string => (theme.isDark ? '#fff' : '#333333')};
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    font-size: 12px;
    padding: 0;
  }
`

const NavItem = styled(NavLink)`
  outline: none !important;
  text-decoration: none !important;
  text-transform: Uppercase;
`

interface Props {
  subRoutes: Path[]
  baseRoutes: Path[]
}

const Breadcrumb: React.FunctionComponent<Props> = ({ subRoutes, baseRoutes }) => {
  const theme = useContext(DashboardThemeContext)

  return (
    <Container theme={theme}>
      {baseRoutes.map((baseRoute, key) => (
        <span key={`breadcrumb-${key}`}>
          <NavItem to={baseRoute.url}>{baseRoute.sdg}</NavItem>
          <RightIcon fill={theme.isDark ? '#436779' : '#979797'} />
        </span>
      ))}
      <Routes>
        {subRoutes.map((subRoute, key) => (
          <Route path={subRoute.url} key={`sdg-${key}`} element={<NavItem to={subRoute.url}>{subRoute.sdg}</NavItem>} />
        ))}
      </Routes>
    </Container>
  )
}

export default Breadcrumb
