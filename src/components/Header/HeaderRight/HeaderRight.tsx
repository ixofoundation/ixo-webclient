import CopyToClipboard from 'react-copy-to-clipboard'
import {
  AccDID,
  ConnectButton,
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
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { truncateString } from 'utils/formatters'
import { Typography } from 'components/Typography'
import { Light, LightLoading, LightReady, Ping } from '../HeaderContainer.styles'

interface HeaderRightProps {
  toggleModal: (IsOpen: boolean) => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ toggleModal }): JSX.Element => {
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const { address, name, registered, updateChooseWalletOpen } = useAccount()
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = (): void => {
    setShowMenu(!showMenu)
  }

  const toggleWalletChooseModal = (): void => {
    updateChooseWalletOpen(true)
  }

  // const renderLightIndicator = (): JSX.Element => {
  //   if (responseTime === null) {
  //     return <LightLoading />
  //   } else if (responseTime !== 0) {
  //     return <LightReady />
  //   } else {
  //     return <Light />
  //   }
  // }
  const renderLightIndicator = (): JSX.Element => {
    if (address) {
      if (registered) {
        return <LightReady />
      } else {
        return <LightLoading />
      }
    } else {
      return <Light />
    }
  }

  const renderStatusIndicator = (): JSX.Element => {
    return <Ping>{renderLightIndicator()}</Ping>
  }

  return (
    <>
      <NoPadLeft className='col-md-2 col-lg-4'>
        <Inner className='d-flex justify-content-end'>
          <UserBox color={buttonColor}>
            <StatusBox>
              {renderStatusIndicator()}
              <StatusText>{!address ? 'Not Connected' : 'Connected'}</StatusText>
            </StatusBox>
            {!address ? (
              <ConnectButton onClick={toggleWalletChooseModal}>
                <Typography variant='secondary' size='md'>
                  Connect
                </Typography>
              </ConnectButton>
            ) : (
              <ConnectButton onClick={toggleWalletChooseModal}>
                <Typography variant='secondary' size='md'>
                  {truncateString(name, 8, 'end')}
                </Typography>
                <Typography variant='secondary' size='xs' color='dark-blue'>
                  {truncateString(address, 20)}
                </Typography>
              </ConnectButton>
            )}
          </UserBox>
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
