import * as React from 'react'
import { Fragment } from 'react'
import { deviceWidth } from '../../../../lib/commonData'
import MediaQuery from 'react-responsive'
import { getIxoWorldRoute } from '../../../utils/formatters'
import * as instanceSettings from '../../../../instance-settings'
import {
  Burger,
  Main,
  IXOLogo,
  HeaderLink,
  Menu,
  MenuHeaderAnchor,
  MenuHeaderContainer,
  MenuHeaderLink,
  MobileMenu,
  NavItems,
} from './HeaderLeft.styles'

export class HeaderLeft extends React.Component<{}> {
  state = {
    menuOpen: false,
  }

  handleBurgerClick = (): void => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  getMenuItems = (inHeader: boolean): JSX.Element => {
    if (inHeader) {
      return (
        <Fragment>
          <HeaderLink exact={true} to="/">
            Explore
          </HeaderLink>
          <HeaderLink to="#">Launch a project</HeaderLink>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <MenuHeaderContainer>
            <MenuHeaderLink exact={true} to="/">
              Explore
            </MenuHeaderLink>
          </MenuHeaderContainer>
          <MenuHeaderContainer>
            <MenuHeaderAnchor href="#">Launch a project</MenuHeaderAnchor>
          </MenuHeaderContainer>
        </Fragment>
      )
    }
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <Main className="col-md-12 col-lg-8 d-flex align-items-center">
          <div>
            <a href={getIxoWorldRoute('')}>
              <IXOLogo
                alt="IXO Logo"
                src={instanceSettings.getLogoImageSrc()}
              />
            </a>
          </div>
          <NavItems>
            <Burger onClick={this.handleBurgerClick}>
              <div className={this.state.menuOpen === true ? 'change' : ''}>
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
              </div>
            </Burger>
            <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
              <Menu>{this.getMenuItems(true)}</Menu>
            </MediaQuery>
          </NavItems>
        </Main>
        <MediaQuery maxWidth={'991px'}>
          <MobileMenu
            className={this.state.menuOpen === true ? 'openMenu' : ''}
          >
            {this.getMenuItems(false)}
          </MobileMenu>
        </MediaQuery>
      </Fragment>
    )
  }
}
