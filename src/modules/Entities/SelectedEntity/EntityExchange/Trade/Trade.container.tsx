import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import keysafe from 'common/keysafe/keysafe'
import { RootState } from 'common/redux/types'
import AssetStakingCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetStakingCard'
import { TermsOfUseType } from 'modules/Entities/types'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import { TradeWrapper, CardHeader, CardBody, WalletBox, TradePanel, AssetCardWrapper } from './Trade.container.styles'

import IMG_wallet1 from 'assets/images/icon-walletconnect.svg'
import IMG_wallet2 from 'assets/images/icon-keplr.svg'
import IMG_wallet3 from 'assets/images/icon-keysafe.svg'

import * as keplr from 'common/utils/keplr'
import { setKeplrWallet } from 'modules/Account/Account.actions'
import { useHistory } from 'react-router-dom'
import { changeSelectedAccountAddress } from '../EntityExchange.actions'
import { selectSelectedTradeMethod } from '../EntityExchange.selectors'

const Trade: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const { address } = useSelector((state: RootState) => state.account)
  const methodType = useSelector(selectSelectedTradeMethod)

  const handleWalletSelected = (walletType: string): void => {
    history.push({
      pathname: `${history.location.pathname}/${methodType.toLowerCase()}`,
      search: `?wallet=${walletType}`,
    })
  }

  const handleWalletClick = async (walletType: string): Promise<void> => {
    switch (walletType) {
      case 'keysafe': {
        if (address) {
          dispatch(changeSelectedAccountAddress(address))
          handleWalletSelected(walletType)
        } else {
          keysafe.popupKeysafe()
        }
        break
      }
      case 'keplr': {
        const [accounts, offlineSigner] = await keplr.connectAccount()
        if (accounts) {
          dispatch(setKeplrWallet(accounts[0].address, offlineSigner))
          dispatch(changeSelectedAccountAddress(accounts[0].address))
          handleWalletSelected(walletType)
        }
        break
      }
      default:
        break
    }
  }

  const renderAssetStakingCard = (): JSX.Element => (
    <>
      <CardHeader>&nbsp;</CardHeader>
      <AssetStakingCard
        did={selectedEntity.did}
        name={selectedEntity.name}
        logo={selectedEntity.logo}
        image={selectedEntity.image}
        sdgs={selectedEntity.sdgs}
        description={selectedEntity.description}
        badges={[]}
        version={''}
        termsType={TermsOfUseType.PayPerUse}
        isExplorer={false}
        link={`/projects/${selectedEntity.did}/overview`}
      />
    </>
  )

  const renderWalletChoosePanel = (): JSX.Element => (
    <TradePanel>
      <CardHeader>Connect My Wallet</CardHeader>
      <CardBody>
        <Tooltip text={'Coming soon'} position={TooltipPosition.Bottom}>
          <WalletBox>
            <img src={IMG_wallet1} alt='wallet1' />
            <span>WalletConnect</span>
          </WalletBox>
        </Tooltip>
        <WalletBox onClick={(): Promise<void> => handleWalletClick('keplr')}>
          <img src={IMG_wallet2} alt='wallet2' />
          <span>Keplr</span>
        </WalletBox>
        <WalletBox onClick={(): Promise<void> => handleWalletClick('keysafe')}>
          <img src={IMG_wallet3} alt='wallet3' />
          <span>ixo Keysafe</span>
        </WalletBox>
      </CardBody>
    </TradePanel>
  )

  return (
    <TradeWrapper>
      <div className='d-flex'>
        <AssetCardWrapper>{selectedEntity && renderAssetStakingCard()}</AssetCardWrapper>
        {renderWalletChoosePanel()}
        <AssetCardWrapper />
      </div>
    </TradeWrapper>
  )
}
export default Trade
