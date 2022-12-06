import CopyToClipboard from 'react-copy-to-clipboard'
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
import { useState } from 'react'
import { useAccount } from 'hooks/account'

interface HeaderRightProps {
  renderStatusIndicator: () => JSX.Element
  toggleModal: (IsOpen: boolean) => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ renderStatusIndicator, toggleModal }): JSX.Element => {
  const { address, name, registered, updateChooseWalletOpen } = useAccount()
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = (): void => {
    setShowMenu(!showMenu)
  }

  const toggleWalletChooseModal = (): void => {
    updateChooseWalletOpen(true)
  }

  const handleLogInButton = (): JSX.Element => {
    return <div onClick={toggleWalletChooseModal}>Login</div>
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

  return (
    <>
      <NoPadLeft className='col-md-2 col-lg-4'>
        <Inner className='d-flex justify-content-end'>
          {!address ? (
            <UserBox>
              <StatusBox>
                {renderStatusIndicator()}
                <StatusText>IXO EXPLORER STATUS</StatusText>
              </StatusBox>
              {handleLogInButton()}
            </UserBox>
          ) : (
            <UserBox onClick={toggleMenu}>
              <StatusBox>
                {renderStatusIndicator()}
                <StatusText>IXO EXPLORER STATUS</StatusText>
              </StatusBox>
              <h3>
                {!registered && <RedIcon />} <span>{name}</span> <Down width='14' />
              </h3>
            </UserBox>
          )}
        </Inner>
        <UserMenu className={showMenu ? 'visible' : ''} onMouseLeave={toggleMenu}>
          <MenuTop>
            <AccDID>
              <p>{address}</p>
              <CopyToClipboard text={address!}>
                <span>Copy</span>
              </CopyToClipboard>
            </AccDID>
          </MenuTop>
          {registered === false && (
            <MenuBottom>
              <RedIcon />
              <p>
                Ledger your credentials on the ixo blockchain{' '}
                <span onClick={(): void => toggleModal(true)}>Sign now with the ixo Keysafe</span>
              </p>
            </MenuBottom>
          )}
        </UserMenu>
      </NoPadLeft>
    </>
  )
}

export default HeaderRight
