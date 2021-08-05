import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { changeTradeMethod } from '../EntityExchange.actions'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'modules/Entities/types'
import keysafe from 'common/keysafe/keysafe'
import { CardHeader, CardBodyWallet, WalletBox } from './Trade.container.styles'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'

const Trade: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)

  const handleMethod = (event: any): any => {
    const newMethod = event.target.value
    dispatch(changeTradeMethod(newMethod))
  }

  const handleWalletClick = (): any => {
    const agentsPayload = {
      projectDid: selectedEntity.did,
    }

    keysafe.requestSigning(
      JSON.stringify(agentsPayload),
      (signError: any, signature: any): any => {
        console.log('signError', signError)
        console.log('signature', signature)
      },
      'base64',
    )
  }

  useEffect(() => {
    console.log('selectedEntity', selectedEntity)
  }, [selectedEntity])

  return (
    <div className='container'>
      {selectedEntity && (
        <div className='row'>
          <div className='col-4'>
            <CardHeader>I have</CardHeader>
            <DataCard
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
            />
          </div>
          <div className='col-4'>
            <CardHeader>Connect My Wallet</CardHeader>
            <select
              name='method'
              onChange={handleMethod}
              style={{ display: 'none' }}
            >
              <option value='Swap'>Swap</option>
              <option value='Purchase'>Purchase</option>
              <option value='Sell'>Sell</option>
              <option value='Auction'>Auction</option>
              <option value='Bid'>Bid</option>
            </select>

            <CardBodyWallet>
              <WalletBox>
                <img src={IMG_wallet1} alt='wallet1' />
                <span>WalletConnect</span>
              </WalletBox>
              <WalletBox onClick={handleWalletClick}>
                <img src={IMG_wallet2} alt='wallet1' />
                <span>Keplr</span>
              </WalletBox>
              <WalletBox>
                <img src={IMG_wallet3} alt='wallet1' />
                <span>ixo mobile</span>
              </WalletBox>
            </CardBodyWallet>
          </div>
        </div>
      )}
    </div>
  )
}
export default Trade
