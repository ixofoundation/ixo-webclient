import * as React from 'react'
import { Fragment } from 'react'
import { deviceWidth } from '../../../../lib/commonData'
import MediaQuery from 'react-responsive'
import { getIxoWorldRoute } from '../../../utils/formatters'
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
  HeaderAnchor,
} from './HeaderLeft.styles'

export interface ParentProps {
  openMenu: boolean
  handleBurgerClick: any
}

export class HeaderLeft extends React.Component<ParentProps> {
  getMenuItems = (inHeader: boolean): JSX.Element => {
    if (inHeader) {
      return (
        <Fragment>
          <HeaderLink exact={true} to="/">
            Explore
          </HeaderLink>
          <HeaderAnchor target="_blank" href="https://developers.ixo.world/">
            Build
          </HeaderAnchor>
          <HeaderAnchor
            target="_blank"
            href={getIxoWorldRoute('/getixowallet/deliver')}
          >
            Deliver
          </HeaderAnchor>
          <HeaderAnchor
            target="_blank"
            href={getIxoWorldRoute('/getixowallet/invest')}
          >
            Invest
          </HeaderAnchor>
          <HeaderLink exact={true} to="/todo">
            Learn
          </HeaderLink>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <MenuHeaderContainer>
            <MenuHeaderLink className="first-mobile" exact={true} to="/">
              Explore
            </MenuHeaderLink>
          </MenuHeaderContainer>
          <MenuHeaderContainer>
            <MenuHeaderAnchor
              target="_blank"
              href="https://developers.ixo.world/"
            >
              Build
            </MenuHeaderAnchor>
          </MenuHeaderContainer>
          <MenuHeaderContainer>
            <MenuHeaderAnchor
              target="_blank"
              href={getIxoWorldRoute('/getixowallet/deliver')}
            >
              Deliver
            </MenuHeaderAnchor>
          </MenuHeaderContainer>
          <MenuHeaderContainer>
            <MenuHeaderAnchor
              target="_blank"
              href={getIxoWorldRoute('/getixowallet/invest')}
            >
              Invest
            </MenuHeaderAnchor>
          </MenuHeaderContainer>
          <MenuHeaderContainer>
            <MenuHeaderLink exact={true} to="/todo">
              Learn
            </MenuHeaderLink>
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
                src={require('../../../../assets/images/ixo-logo.svg')}
              />
            </a>
          </div>
          <NavItems>
            <Burger onClick={this.props.handleBurgerClick}>
              <div className={this.props.openMenu === true ? 'change' : ''}>
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
            className={this.props.openMenu === true ? 'openMenu' : ''}
          >
            {this.getMenuItems(false)}
          </MobileMenu>
        </MediaQuery>
      </Fragment>
    )
  }
}
