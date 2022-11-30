import * as React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
// import { getIxoWorldRoute } from 'common/utils/formatters'
import {
  AccDID,
  Inner,
  // LoginLink,
  MenuBottom,
  MenuTop,
  NoPadLeft,
  RedIcon,
  StatusBox,
  StatusText,
  UserBox,
  UserMenu,
} from './HeaderRight.styles'
import Down from '../../../assets/icons/Down'
import keysafe from 'lib/keysafe/keysafe'
import { ChooseWalletModal } from 'modals'

interface HeaderRightProps {
  name?: string
  address?: string
  renderStatusIndicator: () => JSX.Element
  shouldLedgerDid: boolean
  toggleModal: (IsOpen: boolean) => void
}

interface State {
  showMenu: boolean
  openModal: boolean
}
export class HeaderRight extends React.Component<HeaderRightProps, State> {
  state = {
    showMenu: false,
    openModal: false,
  }

  toggleMenu = (): void => {
    this.setState((prevState) => ({
      ...prevState,
      showMenu: !prevState.showMenu,
    }))
  }

  toggleModal = (): void => {
    this.setState((prevState) => ({
      ...prevState,
      openModal: !prevState.openModal,
    }))
  }

  openKeysafe = (): void => {
    keysafe.popupKeysafe()
  }

  handleLogInButton = (): JSX.Element => {
    return <div onClick={this.toggleModal}>Login</div>
    // if (!keysafe) {
    //   return (
    //     <LoginLink href={getIxoWorldRoute('/getixowallet/deliver/#Steps')}>
    //       <h3>
    //         <span>Log in</span>
    //       </h3>
    //     </LoginLink>
    //   )
    // }
    // if (!this.props.address) {
    //   return (
    //     <LoginLink onClick={this.openKeysafe}>
    //       <h3>
    //         <span>Log in</span>
    //       </h3>
    //     </LoginLink>
    //   )
    // }
    // return <></>
  }

  render(): JSX.Element {
    return (
      <>
        <NoPadLeft className='col-md-2 col-lg-4'>
          <Inner className='d-flex justify-content-end'>
            {!this.props.address ? (
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
                  {this.props.shouldLedgerDid === true && <RedIcon />} <span>{this.props.name}</span>{' '}
                  <Down width='14' />
                </h3>
              </UserBox>
            )}
          </Inner>
          <UserMenu className={this.state.showMenu ? 'visible' : ''} onMouseLeave={(): void => this.toggleMenu()}>
            <MenuTop>
              <AccDID>
                <p>{this.props.address}</p>
                <CopyToClipboard text={this.props.address!}>
                  <span>Copy</span>
                </CopyToClipboard>
              </AccDID>
            </MenuTop>
            {this.props.shouldLedgerDid === true && (
              <MenuBottom>
                <RedIcon />
                <p>
                  Ledger your credentials on the ixo blockchain{' '}
                  <span onClick={(): void => this.props.toggleModal(true)}>Sign now with the ixo Keysafe</span>
                </p>
              </MenuBottom>
            )}
          </UserMenu>
        </NoPadLeft>
        <ChooseWalletModal open={this.state.openModal} setOpen={this.toggleModal} />
      </>
    )
  }
}
