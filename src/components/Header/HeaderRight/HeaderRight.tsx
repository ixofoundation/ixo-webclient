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
import { useState } from 'react'
import { useAccount } from 'hooks/account'
import { useAppSelector } from 'redux/hooks'
import {
  selectEntityHeaderButtonColorUIConfig,
  selectEntityHeadTitleUIConfig,
} from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { truncateString } from 'utils/formatters'

interface HeaderRightProps {
  renderStatusIndicator: () => JSX.Element
  toggleModal: (IsOpen: boolean) => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ renderStatusIndicator, toggleModal }): JSX.Element => {
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const title = useAppSelector(selectEntityHeadTitleUIConfig)
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
  }

  return (
    <>
      <NoPadLeft className='col-md-2 col-lg-4'>
        <Inner className='d-flex justify-content-end'>
          {!address ? (
            <UserBox color={buttonColor}>
              <StatusBox>
                {renderStatusIndicator()}
                <StatusText>{title || 'IXO'} EXPLORER STATUS</StatusText>
              </StatusBox>
              {handleLogInButton()}
            </UserBox>
          ) : (
            <UserBox color={buttonColor} onClick={toggleMenu}>
              <StatusBox>
                {renderStatusIndicator()}
                <StatusText>{title || 'IXO'} EXPLORER STATUS</StatusText>
              </StatusBox>
              <h3>
                {!registered && <RedIcon />} <span>{truncateString(name, 10, 'end')}</span>
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
                <span onClick={(): void => toggleModal(true)}>Sign now</span>
              </p>
            </MenuBottom>
          )}
        </UserMenu>
      </NoPadLeft>
    </>
  )
}

export default HeaderRight
