import React from 'react'
import AssetStakingCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetStakingCard'
import { TermsOfUseType } from 'types/entities'
import Tooltip, { TooltipPosition } from 'components/Tooltip/Tooltip'
import { TradeWrapper, CardHeader, CardBody, WalletBox, TradePanel, AssetCardWrapper } from './Swap.styles'
import IMG_wallet1 from 'assets/images/icon-walletconnect.svg'
import IMG_wallet2 from 'assets/images/icon-keplr.svg'
import IMG_wallet3 from 'assets/images/icon-keysafe.svg'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { NavLink } from 'react-router-dom'

const Trade = ({ selectedEntity }: Pick<RootState, 'selectedEntity'>) => {
  return (
    <TradeWrapper>
      <div className='d-flex'>
        <AssetCardWrapper>
          {selectedEntity && (
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
          )}
        </AssetCardWrapper>
        <TradePanel>
          <CardHeader>Connect My Wallet</CardHeader>
          <CardBody>
            <Tooltip text={'Coming soon'} position={TooltipPosition.Bottom}>
              <WalletBox>
                <img src={IMG_wallet1} alt='wallet1' />
                <span>WalletConnect</span>
              </WalletBox>
            </Tooltip>
            <NavLink style={{ textDecoration: 'none' }} to={{ pathname: '/exchange/trade/swap/wallet/keplr' }}>
              <WalletBox>
                <img src={IMG_wallet2} alt='wallet2' />
                <span style={{ color: 'white' }}>Keplr</span>
              </WalletBox>
            </NavLink>
            <WalletBox>
              <img src={IMG_wallet3} alt='wallet3' />
              <span>ixo Keysafe</span>
            </WalletBox>
          </CardBody>
        </TradePanel>
        <AssetCardWrapper />
      </div>
    </TradeWrapper>
  )
}

const mapStateToProps = (state: RootState): any => ({
  selectedEntity: state.selectedEntity,
})

export default connect(mapStateToProps)(Trade)
