import * as React from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getIxoWorldRoute } from 'src/utils/formatters'

// const xIcon = require('../../assets/images/oval-x-icon.png');

const Inner = styled.div`
  position: relative;
  z-index: 2;
  background: black;

  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
`

const UserMenu = styled.div`
  position: fixed;
  top: -260px;
  width: 260px;
  right: 0;
  z-index: 1;
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};

  transition: top 0.5s ease;
`

const UserBox = styled.div`
  width: 160px;
  height: 74px;
  padding: 0 10px 20px 10px;
  border-left: 1px solid #3c3d3d;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.5s ease;

  :hover {
    cursor: pointer;
    background: #002233;
  }

  > p {
    margin-bottom: 0;
    text-align: center;
  }

  i {
    font-size: 14px;
    margin: 1px 0 0 10px;
  }
`

// const BalanceContainer = styled.p`
// 	img {
// 		vertical-align: baseline;
// 	}
// `;

const MenuTop = styled.div`
  background-color: #002233;
  padding: 13px 26px;
  font-size: 18px;

  p {
    font-size: 12px;
    margin: 3px 0;
    line-height: 16px;
    font-weight: 300;
  }

  img {
    width: 10px;
    height: 10px;
  }
`

const RedIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${/* eslint-disable-line */ props => props.theme.red};
  margin-right: 8px;
  margin-top: 3px;
`

const MenuBottom = styled.div`
  background-color: #01151f;
  padding: 15px;
  display: flex;

  p {
    width: 180px;
    font-size: 12px;
  }

  span {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }

  ${RedIcon} {
    margin-top: 5px;
  }
`

const NoPadLeft = styled.div`
	padding-right:0;
	position:relative;
	z-index:2;

	${UserMenu}.visible {
		top:74px;
	}

	h3 {
		font-size:14px;
		margin-bottom:0;
		display: flex;
		justify-content: space-between;
		z-index:2;
		position:relative;
		letter-spacing:0.3px
		font-weight: 600;
		font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
	}
`

const AccDID = styled.div`
  padding: 3px 6px;
  margin: 6px 0px 5px -6px;
  background: #01151f;
  border-radius: 8px;
  color: #3ea2c0;
  display: flex;
  justify-content: space-between;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
    margin: 0;
    font-weight: 300;
    font-size: 10px;
  }

  span {
    color: #024e67;
    cursor: pointer;
    display: inline-block;
    font-weight: 300;
    font-size: 10px;
  }

  span:hover {
    color: #3ea2c0;
    font-weight: bold;
  }
`

const StatusBox = styled.div`
  text-align: center;
  width: 110px;
  position: relative;
  z-index: 1;
`
const StatusText = styled.p`
  color: white;
  text-transform: uppercase;
  font-size: 11px;
  margin: 5px auto 10px;
  font-weight: normal;
`

const LoginLink = styled.a`
  color: white;
  text-decoration: none;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  z-index: 0;

  :hover {
    text-decoration: none;
    color: white;
  }
`

interface HeaderRightProps {
  userInfo: any
  renderStatusIndicator: () => JSX.Element
  simple?: boolean
  shouldLedgerDid: boolean
  toggleModal: (IsOpen: boolean) => void
  keysafe: any
}

interface State {
  showMenu: boolean
}
export class HeaderRight extends React.Component<HeaderRightProps, State> {
  state = {
    showMenu: false,
  }

  toggleMenu = (): void => {
    this.setState(prevState => ({ showMenu: !prevState.showMenu }))
  }

  openKeysafe = (): void => {
    this.props.keysafe.popupKeysafe()
  }

  handleLogInButton = (): JSX.Element => {
    if (this.props.userInfo === null) {
      return (
        <LoginLink href={getIxoWorldRoute('/membership')}>
          <h3>
            <span>Log in</span>
          </h3>
        </LoginLink>
      )
    }
    if (this.props.userInfo.loggedInKeysafe === false) {
      return (
        <LoginLink onClick={this.openKeysafe}>
          <h3>
            <span>Log in</span>
          </h3>
        </LoginLink>
      )
    }
    return null
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
              <div>
                <UserBox>
                  <StatusBox>
                    {this.props.renderStatusIndicator()}
                    <StatusText>IXO EXPLORER STATUS</StatusText>
                  </StatusBox>
                  {this.handleLogInButton()}
                </UserBox>
              </div>
            ) : (
              <UserBox onClick={this.toggleMenu}>
                <StatusBox>
                  {this.props.renderStatusIndicator()}
                  <StatusText>IXO EXPLORER STATUS</StatusText>
                </StatusBox>
                <h3>
                  {this.props.shouldLedgerDid === true && <RedIcon />}{' '}
                  <span>{this.props.userInfo.name}</span>{' '}
                  <i className="icon-down" />
                </h3>
              </UserBox>
            )}
          </Inner>
          <UserMenu
            className={this.state.showMenu ? 'visible' : ''}
            onMouseLeave={(): void => this.toggleMenu()}
          >
            <MenuTop>
              {/* <h3>{this.props.userInfo !== null && this.props.userInfo.name} <Link to="/"><i className="icon-settings1"/></Link></h3> */}

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
              {/* <BalanceContainer><img src={xIcon} alt="IXO Icon" /> <strong>0</strong> IXO balance</BalanceContainer> */}
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
