import Success from 'assets/icons/Success'
import { theme } from 'components/App/App.styles'
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
import { EntityType } from 'types/entities'
import { truncateString } from 'utils/formatters'
import { Button, ButtonTypes } from '../Form/Buttons'
import ProfileModal from './components/ProfileModal'
import { InfoLink, ModalData, TopBar } from './HeaderContainer.styles'
import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import HeaderRight from './HeaderRight/HeaderRight'

interface Props {
  entityType?: EntityType
  headerUIConfig?: any
}

const Header: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    address,
    name,
    pubKey,
    pubKeyUint8,
    signingClient,
    keyType,
    did,
    selectedWallet,
    registered,
    funded,
    updateBalances,
    updateRegistered,
  } = useAccount()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)

  useEffect(() => {
    if (address && registered === false) {
      setIsModalOpen(true)
    } else if (registered === true) {
      setIsModalOpen(false)
    }
  }, [address, registered])

  const handleBurgerClick = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const handleToggleModal = (isModalOpen: boolean): void => {
    setIsModalOpen(isModalOpen)
  }
  const handleLedgerDid = async (): Promise<void> => {
    if (signingClient && address && did && pubKey && keyType) {
      const res = await CreateIidDoc(signingClient, { address, did, pubKey: pubKeyUint8!, keyType })
      updateRegistered(!!res)
    } else {
      console.error('handleLedgerDid', { signingClient, address, did, pubKey, keyType })
    }
  }

  const handledFunded = (): void => {
    updateBalances()
  }

  const renderModalHeader = (): {
    title: string
    titleNoCaps?: boolean
  } => {
    if (name) {
      return {
        title: 'Hi, ' + truncateString(name, 20, 'end'),
        titleNoCaps: true,
      }
    } else {
      return {
        title: '',
        titleNoCaps: undefined,
      }
    }
  }

  const renderModalData = (): JSX.Element => {
    if (!funded) {
      return (
        <ModalData>
          <Success width='64' fill={theme.ixoNewBlue} />
          <h3 style={{ textTransform: 'uppercase' }}>YOU HAVE SUCCESSFULLY INSTALLED THE {selectedWallet}</h3>
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
    } else if (!registered) {
      return (
        <ModalData>
          <p>
            YOUR ACCOUNT HAS SUCCESSFULLY BEEN FUNDED
            <br />
            Now you can Register your self-sovereign identity on the blockchain, which will deduct a small gas fee from
            your account.
          </p>
          <Button type={ButtonTypes.dark} onClick={handleLedgerDid}>
            SIGN THIS REQUEST
          </Button>
        </ModalData>
      )
    } else {
      return (
        <ModalData>
          <ProfileModal />
        </ModalData>
      )
    }
  }

  const { headerUIConfig } = props

  let customBackground = '#000000'
  if (headerUIConfig) {
    const { background } = headerUIConfig
    if (background) {
      customBackground = background
    }
  }

  return (
    <TopBar
      className={`container-fluid ${isMobileMenuOpen === true ? 'openMenu' : ''}`}
      color={buttonColor}
      background={customBackground}
    >
      <ModalWrapper isModalOpen={isModalOpen} handleToggleModal={handleToggleModal} header={renderModalHeader()}>
        {renderModalData()}
      </ModalWrapper>
      <div className='row'>
        <HeaderLeft
          currentEntity={props.entityType!}
          openMenu={isMobileMenuOpen}
          handleBurgerClick={handleBurgerClick}
        />
        <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
          <HeaderRight toggleModal={handleToggleModal} />
        </MediaQuery>
      </div>
    </TopBar>
  )
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  entityType: entitiesSelectors.selectSelectedEntitiesType(state),
  headerUIConfig: entitiesSelectors.selectEntityHeaderUIConfig(state),
})

export const HeaderConnected = connect(mapStateToProps)(Header)
