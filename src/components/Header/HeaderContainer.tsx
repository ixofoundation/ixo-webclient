import Success from 'assets/icons/Success'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { deviceWidth } from 'constants/device'
import { useAccount } from 'hooks/account'
import { CreateIidDoc } from 'lib/protocol'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'
import { useTheme } from 'styled-components'
import { EntityType } from 'types/entities'
import { truncateString } from 'utils/formatters'
import { Button, ButtonTypes } from '../Form/Buttons'
import ProfileModal from './components/ProfileModal'
import { InfoLink, ModalData, TopBar } from './HeaderContainer.styles'
import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import HeaderRight from './HeaderRight/HeaderRight'
import { useDisclosure } from '@mantine/hooks'
import { WalletConnector } from 'components/WalletConnector'

interface Props {
  entityType?: EntityType
  headerUIConfig?: any
}

const FundYourAccount = ({ theme, selectedWallet, address, handledFunded }: any) => (
  <ModalData>
    <Success width='64' fill={theme.ixoNewBlue} />
    <h3 style={{ textTransform: 'uppercase' }}>YOU HAVE SUCCESSFULLY INSTALLED {selectedWallet}</h3>
    <p>
      <span>NEXT STEP - </span>Fund your Account with IXO Tokens to Register your self-sovereign identity on the
      blockchain
      <br />
      (This requires a small amount of IXO for gas).
      <br />
      Your Account address is <span>{address || '-'}</span>
    </p>
    <Button type={ButtonTypes.dark} onClick={handledFunded}>
      I HAVE FUNDED MY ACCOUNT
    </Button>
    <InfoLink
      href='https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6'
      target='_blank'
    >
      Why do I need to sign my credentials?
    </InfoLink>
  </ModalData>
)

const ConnectAccount = () => <WalletConnector />

const LedgerAccount = ({ handleLedgerDid }: any) => (
  <ModalData>
    <p>
      YOUR ACCOUNT HAS SUCCESSFULLY BEEN FUNDED
      <br />
      Now you can Register your self-sovereign identity on the blockchain, which will deduct a small gas fee from your
      account.
    </p>
    <Button type={ButtonTypes.dark} onClick={handleLedgerDid}>
      SIGN THIS REQUEST
    </Button>
  </ModalData>
)

const AccountModal = () => (
  <ModalData>
    <ProfileModal />
  </ModalData>
)

interface HeaderProps {
  entityType?: EntityType
  headerUIConfig?: any
}

interface ModalStep {
  title: string
  content: JSX.Element
}

const Header: React.FC<HeaderProps> = ({ entityType, headerUIConfig }) => {
  const theme = useTheme()
  const [opened, handlers] = useDisclosure(false)

  const { address, name, registered, funded, updateBalances, updateRegistered, selectedWallet } = useAccount()

  const [modalStep, setModalStep] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const modalSteps: ModalStep[] = [
    // Step 0: No connected account
    {
      title: 'Connect Your Wallet',
      content: <ConnectAccount />,
    },
    // Step 1: Fund account
    {
      title: 'Fund Your Account',
      content: <FundYourAccount />,
    },
    {
      title: 'Account',
      content: <AccountModal />,
    },
    // Additional steps...
  ]

  useEffect(() => {
    if (!address) {
      setModalStep(0)
    } else if (address && !registered) {
      setModalStep(1)
    } else {
      setModalStep(2) // Assuming step 2 is already implemented as the registered state
    }
  }, [address, registered])

  const handleBurgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const renderModalContent = () => {
    return modalSteps[modalStep].content
  }

  let customBackground = '#000000'
  if (headerUIConfig?.background) {
    customBackground = headerUIConfig.background
  }

  if (!entityType) return null

  return (
    <TopBar
      className={`container-fluid ${isMobileMenuOpen ? 'openMenu' : ''}`}
      color={headerUIConfig?.buttonColor}
      background={customBackground}
    >
      <ModalWrapper isModalOpen={opened} handleToggleModal={handlers.toggle}>
        {renderModalContent()}
      </ModalWrapper>
      <div className='row'>
        <HeaderLeft currentEntity={entityType} openMenu={isMobileMenuOpen} handleBurgerClick={handleBurgerClick} />
        <HeaderRight toggleModal={handlers.open} />
      </div>
    </TopBar>
  )
}
const mapStateToProps = (state: RootState): Record<string, any> => ({
  entityType: entitiesSelectors.selectSelectedEntitiesType(state),
  headerUIConfig: entitiesSelectors.selectEntityHeaderUIConfig(state),
})

export const HeaderConnected = connect(mapStateToProps)(Header)
