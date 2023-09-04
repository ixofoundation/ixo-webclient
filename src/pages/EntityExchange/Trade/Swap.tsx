import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import AssetStakingCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetStakingCard'
import { TermsOfUseType } from 'types/entities'
import Tooltip, { TooltipPosition } from 'components/Tooltip/Tooltip'
import { TradeWrapper, CardHeader, CardBody, WalletBox, TradePanel, AssetCardWrapper } from './Swap.styles'
import IMG_wallet1 from 'assets/images/icon-walletconnect.svg'
import IMG_wallet2 from 'assets/images/icon-keplr.svg'
import IMG_wallet3 from 'assets/images/icon-keysafe.svg'
import * as keplr from 'lib/keplr/keplr'
import { setKeplrWallet } from 'redux/account/account.actions'
import { changeSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.actions'
import { selectSelectedTradeMethod } from 'redux/selectedEntityExchange/entityExchange.selectors'
import { connect } from 'react-redux'
import { RootState, history } from 'redux/store'
import { NavLink } from 'react-router-dom'

type RenderWalletChoosePanelProps = {
  handleWalletClick: (wallet: string) => Promise<void>
}
const RenderWalletChoosePanel = ({ handleWalletClick }: RenderWalletChoosePanelProps): JSX.Element => (
  <TradePanel>
    <CardHeader>Connect My Wallet</CardHeader>
    <CardBody>
      <Tooltip text={'Coming soon'} position={TooltipPosition.Bottom}>
        <WalletBox>
          <img src={IMG_wallet1} alt='wallet1' />
          <span>WalletConnect</span>
        </WalletBox>
      </Tooltip>
      <NavLink to={{ pathname: '/exchange/trade/swap/wallet/keplr' }}>
        <WalletBox onClick={(): Promise<void> => handleWalletClick && handleWalletClick('keplr')}>
          <img src={IMG_wallet2} alt='wallet2' />
          <span>Keplr</span>
        </WalletBox>
      </NavLink>
      <WalletBox onClick={(): Promise<void> => handleWalletClick && handleWalletClick('keysafe')}>
        <img src={IMG_wallet3} alt='wallet3' />
        <span>ixo Keysafe</span>
      </WalletBox>
    </CardBody>
  </TradePanel>
)

// TODO: THIS NEEDS TO BE TYPED
type Entity = any
type RenderAssetStakingCardProps = {
  selectedEntity: Entity
}
const RenderAssetStakingCard = ({ selectedEntity }: RenderAssetStakingCardProps): JSX.Element => (
  <>
    <CardHeader>&nbsp;</CardHeader>
    <AssetStakingCard
      did={selectedEntity?.did || ''}
      name={selectedEntity?.name || ''}
      logo={selectedEntity?.logo || ''}
      image={selectedEntity?.image || ''}
      sdgs={selectedEntity?.sdgs}
      description={selectedEntity?.description || ''}
      badges={[]}
      version={''}
      termsType={TermsOfUseType.PayPerUse}
      isExplorer={false}
      link={`/projects/${selectedEntity?.did || ''}/overview`}
    />
  </>
)

const Trade = ({ selectedEntity }: Pick<RootState, 'selectedEntity'>) => {
  return (
    <TradeWrapper>
      <div className='d-flex'>
        <AssetCardWrapper>
          {selectedEntity && <RenderAssetStakingCard selectedEntity={selectedEntity} />}
        </AssetCardWrapper>
        <RenderWalletChoosePanel handleWalletClick={async () => {}} />
        <AssetCardWrapper />
      </div>
    </TradeWrapper>
  )
}

const mapStateToProps = (state: RootState): any => ({
  selectedEntity: state.selectedEntity,
})

const mapDispatchToProps = (): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Trade)
