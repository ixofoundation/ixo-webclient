import { Inner, NoPadLeft, StatusBox, StatusText, UserBox } from './HeaderRight.styles'
import { useAccount } from 'hooks/account'
import { useAppSelector } from 'redux/hooks'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Light, LightLoading, LightReady, Ping } from '../HeaderContainer.styles'
import WalletConnectButton from 'components/Button/WalletConnectButton'

interface HeaderRightProps {
  toggleModal: (IsOpen: boolean) => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ toggleModal }): JSX.Element => {
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const { address, registered } = useAccount()

  const onClickConnectInfo = (): void => {
    toggleModal(true)
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
            <WalletConnectButton onClick={onClickConnectInfo} />
          </UserBox>
        </Inner>
      </NoPadLeft>
    </>
  )
}

export default HeaderRight
