import * as React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { getIxoWorldRoute } from 'common/utils/formatters'
import {
  AccDID,
  LogoutButton,
  Inner,
  LoginLink,
  MenuBottom,
  MenuTop,
  NoPadLeft,
  RedIcon,
  StatusBox,
  StatusText,
  UserBox,
  UserMenu,
} from './HeaderRight.styles'
import Down from '../../../../assets/icons/Down'
import keysafe from 'common/keysafe/keysafe'

interface HeaderRightProps {
  userInfo: any
  renderStatusIndicator: () => JSX.Element
  simple?: boolean
  shouldLedgerDid: boolean
  toggleModal: (IsOpen: boolean) => void
}

interface State {
  showMenu: boolean
}
export class HeaderRight extends React.Component<HeaderRightProps, State> {
  state = {
    showMenu: false,
  }

  toggleMenu = (): void => {
    this.setState((prevState) => ({ showMenu: !prevState.showMenu }))
  }

  openKeysafe = (): void => {
    keysafe.popupKeysafe()
  }

  handleLogInButton = (): JSX.Element => {
    if (!keysafe) {
      return (
        <LoginLink href={getIxoWorldRoute('/getixowallet/deliver/#Steps')}>
          <h3>
            <span>Log in</span>
          </h3>
        </LoginLink>
      )
    }
    if (!this.props.userInfo || !this.props.userInfo.loggedInKeysafe) {
      return (
        <LoginLink onClick={this.openKeysafe}>
          <h3>
            <span>Log in</span>
          </h3>
        </LoginLink>
      )
    }
    return <></>
  }

  render(): JSX.Element {
    if (this.props.simple === true) {
      return <NoPadLeft className="col-md-2 col-lg-4" />
    } else {
      return (
        <NoPadLeft className="col-md-2 col-lg-4">
          <Inner className="d-flex justify-content-end">
            {this.props.userInfo === null ||
            this.props.userInfo.loggedInKeysafe === false ? (
              <UserBox>
                <StatusBox>
                  {this.props.renderStatusIndicator()}
                  <StatusText>IXO EXPLORER STATUS</StatusText>
                </StatusBox>
                {this.handleLogInButton()}
              </UserBox>
            ) : (
              <UserBox onClick={this.toggleMenu}>
                <StatusBox>
                  {this.props.renderStatusIndicator()}
                  <StatusText>IXO EXPLORER STATUS</StatusText>
                </StatusBox>
                <h3>
                  {this.props.shouldLedgerDid === true && <RedIcon />}{' '}
                  <span>{this.props.userInfo.name}</span> <Down width="14" />
                </h3>
              </UserBox>
            )}
          </Inner>
          <UserMenu
            className={this.state.showMenu ? 'visible' : ''}
            onMouseLeave={(): void => this.toggleMenu()}
          >
            <MenuTop>
              <AccDID>
                <p>
                  {this.props.userInfo !== null &&
                    this.props.userInfo.didDoc.did}
                </p>
                <CopyToClipboard
                  text={
                    this.props.userInfo !== null &&
                    this.props.userInfo.didDoc.did
                  }
                >
                  <span>Copy</span>
                </CopyToClipboard>
              </AccDID>
            </MenuTop>

            <MenuTop>
              <LogoutButton
                children='Logout'
                onClick={keysafe.disconnect}
              />
            </MenuTop>

            {this.props.shouldLedgerDid === true && (
              <MenuBottom>
                <RedIcon />
                <p>
                  Ledger your credentials on the ixo blockchain{' '}
                  <span onClick={(): void => this.props.toggleModal(true)}>
                    Sign now with the ixo Keysafe
                  </span>
                </p>
              </MenuBottom>
            )}
          </UserMenu>
        </NoPadLeft>
      )
    }
  }
}
