import { ConnectButton, Inner, NoPadLeft, StatusBox, StatusText, UserBox } from './HeaderRight.styles'
import { useAccount } from 'hooks/account'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useAppSelector } from 'redux/hooks'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { truncateString } from 'utils/formatters'
import * as Toast from 'utils/toast'
import { Typography } from 'components/Typography'
import { Light, LightLoading, LightReady, Ping } from '../HeaderContainer.styles'
import { useWalletManager } from '@gssuper/cosmodal'

interface HeaderRightProps {
  toggleModal: (IsOpen: boolean) => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ toggleModal }): JSX.Element => {
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const { address, name, registered } = useAccount()
  const { connect } = useWalletManager()

  const onClickConnectInfo = (): void => {
    console.log('1111')
    if (!registered) {
      toggleModal(true)
    }
  }

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
              <ConnectButton onClick={connect}>
                <Typography variant='secondary' size='md'>
                  Connect
                </Typography>
              </ConnectButton>
            ) : (
              <ConnectButton onClick={onClickConnectInfo}>
                <Typography variant='secondary' size='md'>
                  {truncateString(name, 8, 'end')}
                </Typography>

                <CopyToClipboard text={address} onCopy={() => Toast.successToast(`Copied to clipboard`)}>
                  <Typography
                    variant='secondary'
                    size='xs'
                    color='blue'
                    hover={{ underline: true }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {truncateString(address, 20)}
                  </Typography>
                </CopyToClipboard>
              </ConnectButton>
            )}
          </UserBox>
        </Inner>
      </NoPadLeft>
    </>
  )
}

export default HeaderRight
