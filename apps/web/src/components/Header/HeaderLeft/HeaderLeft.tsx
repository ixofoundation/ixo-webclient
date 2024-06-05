import * as React from 'react'
import { Fragment } from 'react'
import { deviceWidth } from 'constants/device'
import MediaQuery from 'react-responsive'
import { getIxoWorldRoute } from 'utils/formatters'
import { EntityType } from 'types/entities'
import { requireCheckDefault } from 'utils/images'

import {
  Burger,
  Main,
  AppLogo,
  HeaderLink,
  Menu,
  // MenuHeaderAnchor,
  MenuHeaderContainer,
  MenuHeaderLink,
  NavItems,
  // HeaderAnchor,
} from './HeaderLeft.styles'
import { useAppSelector } from 'redux/hooks'
import {
  // selectEntityConfig,
  selectEntityHeaderButtonColorUIConfig,
  selectEntityHeaderUIConfig,
  selectEntityLogoConfig,
} from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import CreateEntityDropdown from '../components/CreateEntityDropdown'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useMediaQuery } from '@mantine/hooks'
import { em } from '@mantine/core'

export interface ParentProps {
  currentEntity: EntityType
  openMenu: boolean
  handleBurgerClick: any
}

export const HeaderLeft: React.FC<ParentProps> = (props) => {
  const entityTypeMap: any = useAppSelector(selectEntityConfig)
  const headerUIConfig: any = useAppSelector(selectEntityHeaderUIConfig)
  const logoConfig = useAppSelector(selectEntityLogoConfig)
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const defaultEntity = entityTypeMap?.UI?.explorer?.defaultView ?? "dao"
  const isMobile = useMediaQuery(`(max-width: ${em(710)})`)

  const logoLink = React.useMemo(() => {
    if (!headerUIConfig || !headerUIConfig.link) {
      return getIxoWorldRoute('')
    }
    return headerUIConfig.link
  }, [headerUIConfig])

  const splashIsRootRoute = React.useMemo(() => !!entityTypeMap?.route?.splashIsRootRoute, [entityTypeMap])

  const getMenuItems = (inHeader: boolean): JSX.Element => {
    if (inHeader) {
      return (
        <Fragment>
          <HeaderLink color={buttonColor} to={`explore?type=${defaultEntity}`}>
            Explore
          </HeaderLink>
          <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
            <CreateEntityDropdown />
          </MediaQuery>
          {/* <HeaderLink exact={false} strict to={`/exchange`} color={buttonColor}>
            Exchange
          </HeaderLink> */}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <MenuHeaderContainer>
            <MenuHeaderLink
              className='first-mobile'
              end={true}
              to={splashIsRootRoute ? `/explore?type=${defaultEntity}` : '/'}
              onClick={props.handleBurgerClick}
            >
              Explore
            </MenuHeaderLink>
          </MenuHeaderContainer>
          <MenuHeaderContainer style={{ background: 'none' }}>
            <CreateEntityDropdown entityType={props.currentEntity} />
          </MenuHeaderContainer>
          {/* <MenuHeaderContainer>
            <MenuHeaderLink
              className="first-mobile"
              exact={false}
              strict
              to="/exchange"
              onClick={props.handleBurgerClick}
              color={buttonColor}
            >
              Exchange
            </MenuHeaderLink>
          </MenuHeaderContainer> */}
        </Fragment>
      )
    }
  }
  return (
    <Fragment>
      <Main className='col-md-12 col-lg-8 d-flex align-items-center'>
        <div className='d-flex align-items' style={{marginTop: isMobile ? 15 : 0}}>
          <a href={logoLink}>
            <AppLogo alt='Logo' src={requireCheckDefault(require(`../../../assets/images/${logoConfig}.svg`))} />
          </a>
        </div>
        <NavItems>
          <Burger onClick={props.handleBurgerClick}>
            <div className={props.openMenu === true ? 'change' : ''}>
              <div className='bar1' />
              <div className='bar2' />
              <div className='bar3' />
            </div>
          </Burger>
          <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
            <Menu>{getMenuItems(true)}</Menu>
          </MediaQuery>
        </NavItems>
      </Main>
    </Fragment>
  )
}
