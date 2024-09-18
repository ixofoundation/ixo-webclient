import { Inner, NoPadLeft, StatusBox, StatusText, UserBox } from './HeaderRight.styles'
import { useAccount } from 'hooks/account'
import { useAppSelector } from 'redux/hooks'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entities/entities.selectors'
import { Light, LightLoading, LightReady, Ping } from '../HeaderContainer.styles'
import WalletConnectButton from 'components/Button/WalletConnectButton'
import { useTheme } from 'styled-components'
import { useWallet } from 'wallet-connector'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Burger, Flex, Modal, Text, em } from '@mantine/core'
import CreateEntityDropdown from '../components/CreateEntityDropdown'
import { useIxoConfigs } from 'hooks/configs'
interface HeaderRightProps {
  toggleModal: () => void
}

const HeaderRight: React.FC<HeaderRightProps> = ({ toggleModal }): JSX.Element => {
  const { entityConfig } = useIxoConfigs()

  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)
  const theme: any = useTheme()
  const { address, registered } = useAccount()
  const { wallet, mobile } = useWallet()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(`(max-width: ${em(710)})`)
  const [isMobileMenuOpen, { toggle: toggleMobileMenu }] = useDisclosure()

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

  if (isMobile) {
    return (
      <Flex justify={'center'} align={'center'}>
        <Burger opened={isMobileMenuOpen} onClick={toggleMobileMenu} aria-label='Toggle navigation' />

        <Modal opened={isMobileMenuOpen} onClose={toggleMobileMenu} fullScreen padding='xl' yOffset='1vh'>
          <Flex direction={'column'} align={'center'} justify={'center'} gap={10}>
            <NavLink onClick={toggleMobileMenu} to={`/explore?type=${entityConfig?.UI?.explorer?.defaultView}`}>
              <Text fz='24px' c='black'>
                EXPLORE
              </Text>
            </NavLink>
            <CreateEntityDropdown />
          </Flex>
        </Modal>
      </Flex>
    )
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
