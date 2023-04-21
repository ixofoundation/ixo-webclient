import * as React from 'react'
import { Fragment } from 'react'
import { deviceWidth } from 'constants/device'
import MediaQuery from 'react-responsive'
import { getIxoWorldRoute } from 'utils/formatters'
import CreateEntityDropdown from 'components/Entities/CreateEntity/Components/CreateEntityDropdown/CreateEntityDropdown'
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
  MobileMenu,
  NavItems,
  // HeaderAnchor,
} from './HeaderLeft.styles'
import { useAppSelector } from 'redux/hooks'
import {
  selectEntityConfig,
  selectEntityHeaderUIConfig,
  selectEntityLogoConfig,
} from 'redux/entitiesExplorer/entitiesExplorer.selectors'

export interface ParentProps {
  currentEntity: EntityType
  openMenu: boolean
  handleBurgerClick: any
}

export const HeaderLeft: React.FC<ParentProps> = (props) => {
  const entityTypeMap: any = useAppSelector(selectEntityConfig)
  const headerUIConfig: any = useAppSelector(selectEntityHeaderUIConfig)
  const logoConfig = useAppSelector(selectEntityLogoConfig)

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
          <HeaderLink exact={true} to={splashIsRootRoute ? '/explore' : '/'}>
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
              exact={true}
              to={splashIsRootRoute ? '/explore' : '/'}
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
        <div>
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
      <MediaQuery maxWidth={'991px'}>
        <MobileMenu className={props.openMenu === true ? 'openMenu' : ''}>{getMenuItems(false)}</MobileMenu>
      </MediaQuery>
    </Fragment>
  )
}
