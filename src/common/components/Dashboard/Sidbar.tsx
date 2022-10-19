import React from 'react'
import styled from 'styled-components'
import ToolTipSecondary from './ToolTipSecondary'
import { NavLink } from 'react-router-dom'
import { Path } from './types'
import { deviceWidth } from 'lib/commonData'

export const NavItem = styled(NavLink)`
  color: white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-top: 5px solid transparent;
  position: relative;
  svg {
    width: 1.5rem;
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    margin: 30px 0;
    width: 100%;
    border-top: 0;
    border-left: 5px solid transparent;

    :hover ${ToolTipSecondary} {
      opacity: 1;
      left: 100%;
    }
  }

  :hover {
    text-decoration: none;
  }
`

const DisabledNavItem = styled.div`
  color: white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-top: 5px solid transparent;
  position: relative;

  @media (min-width: ${deviceWidth.mobile}px) {
    margin: 30px 0;
    width: 100%;
    border-top: 0;
    border-left: 5px solid transparent;

    :hover ${ToolTipSecondary} {
      opacity: 1;
      left: 100%;
    }
  }
`

export const Container = styled.div`
  width: 100%;
  padding-top: 0;
  position: relative;
  top: auto;
  display: none;
  justify-content: space-evenly;
  height: auto;
  z-index: 1;
  background: linear-gradient(180deg, #012639 0%, #002d42 97.29%);

  .active {
    border-top: 5px solid ${(props): string => props.theme.highlight.light};
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    position: sticky;
    top: 70px;
    width: 75px;
    min-width: 75px;
    display: block;
    padding-top: 15px;

    .active {
      border-top: 0;
      border-left: 5px solid ${(props): string => props.theme.highlight.light};
    }
  }
`

interface Props {
  routes: Path[]
}

const Sidebar: React.FunctionComponent<Props> = ({ routes }) => {
  return (
    <Container>
      {routes
        .filter((route: Path) => !route.disable)
        .map((route: Path, key) => {
          if (route.url === '#') {
            return (
              <DisabledNavItem key={`sidebar-${key}`}>
                <img alt={route.tooltip} src={route.icon} />
                <ToolTipSecondary>{route.tooltip}</ToolTipSecondary>
              </DisabledNavItem>
            )
          }
          return (
            <NavItem
              exact={!route.strict}
              to={route.url}
              key={`sidebar-${key}`}
            >
              <img alt={route.tooltip} src={route.icon} />
              <ToolTipSecondary>{route.tooltip}</ToolTipSecondary>
            </NavItem>
          )
        })}
    </Container>
  )
}

export default Sidebar
