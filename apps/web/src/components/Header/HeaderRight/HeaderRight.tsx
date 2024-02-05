import { Inner, NoPadLeft, StatusBox, StatusText, UserBox } from './HeaderRight.styles'
import { useAccount } from 'hooks/account'
import { useAppSelector } from 'redux/hooks'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Light, LightLoading, LightReady, Ping } from '../HeaderContainer.styles'
import WalletConnectButton from 'components/Button/WalletConnectButton'
import { useTheme } from 'styled-components'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useNavigate } from 'react-router-dom'

interface HeaderRightProps {
  toggleModal: () => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ toggleModal }): JSX.Element => {
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const theme: any = useTheme()
  const { address, registered } = useAccount()
  const { wallet, mobile } = useWallet()
  const navigate = useNavigate()

  const onClickConnectInfo = () => {
    if (wallet && !mobile.transacting) {
      return navigate('/myaccount')
    }

    toggleModal()
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
    <NoPadLeft className='col-md-2 col-lg-4'>
      <Inner className='d-flex justify-content-end'>
        <UserBox color={buttonColor}>
          <StatusBox>
            {renderStatusIndicator()}
            <StatusText color={theme?.blocks?.header?.textColor}>{!address ? 'Not Connected' : 'Connected'}</StatusText>
          </StatusBox>
          <WalletConnectButton onClick={onClickConnectInfo} />
        </UserBox>
      </Inner>
    </NoPadLeft>
  )
}

export default HeaderRight
