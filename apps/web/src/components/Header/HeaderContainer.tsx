import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { RootState } from 'redux/store'
import { EntityType } from 'types/entities'
import { TopBar } from './HeaderContainer.styles'
import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import HeaderRight from './HeaderRight/HeaderRight'
import { useDisclosure } from '@mantine/hooks'
import { WalletConnector } from 'components/WalletConnector'
import { useWallet } from '@ixo-webclient/wallet-connector'

// interface Props {
//   entityType?: EntityType
//   headerUIConfig?: any
// }

interface HeaderProps {
  entityType?: EntityType
  headerUIConfig?: any
}

const Header: React.FC<HeaderProps> = ({ entityType, headerUIConfig }) => {
  const {open} = useWallet()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleBurgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
      {/* <ModalWrapper isModalOpen={opened} handleToggleModal={handlers.toggle}>
        <WalletConnector />
      </ModalWrapper> */}
      <div className='row'>
        <HeaderLeft currentEntity={entityType} openMenu={isMobileMenuOpen} handleBurgerClick={handleBurgerClick} />
        <HeaderRight toggleModal={open} />
      </div>
    </TopBar>
  )
}
const mapStateToProps = (state: RootState): Record<string, any> => ({
  entityType: entitiesSelectors.selectSelectedEntitiesType(state),
  headerUIConfig: entitiesSelectors.selectEntityHeaderUIConfig(state),
})

export const HeaderConnected = connect(mapStateToProps)(Header)
