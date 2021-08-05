import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { changeTradeMethod } from '../EntityExchange.actions'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'modules/Entities/types'
import keysafe from 'common/keysafe/keysafe'
import {
  CardHeader,
  CardBody,
  WalletBox,
  PurchaseBox,
  RateBox,
  SwapButton,
} from './Trade.container.styles'
import { TradeMethodType } from '../types'
import SelectMethod from './partials/SelectMethod'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import IMG_token_usdc from 'assets/images/exchange/token-usdc.svg'
import IMG_token_rhino from 'assets/images/exchange/token-rhino.svg'
import IMG_arrow_down from 'assets/images/exchange/arrow-down.svg'
import IMG_swap from 'assets/images/exchange/swap.svg'

interface TokenInfo {
  src: string
  name: string
  unit: string
  amount: number
}

const Trade: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const [method, setMethod] = useState<TradeMethodType>(null)
  const [methodHover, setMethodHover] = useState<boolean>(false)
  const [fromToken, setFromToken] = useState<TokenInfo>({
    src: IMG_token_usdc,
    name: 'USDC',
    unit: 'USDC',
    amount: 100,
  })
  const [toToken, setToToken] = useState<TokenInfo>({
    src: IMG_token_rhino,
    name: 'White Rhino Token',
    unit: 'WRT',
    amount: 1,
  })

  const handleMethodChange = (newMethod: TradeMethodType): any => {
    setMethod(newMethod)
    setMethodHover(false)
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
        if (!signError) {
          setSignedIn(true)
          handleMethodChange(TradeMethodType.Purchase)
        } else {
          setSignedIn(false)
        }
      },
      'base64',
    )
  }

  const handleSwapClick = (): any => {
    setFromToken(toToken)
    setToToken(fromToken)
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
            <CardHeader>
              {!signedIn && 'Connect My Wallet'}
              {signedIn && (
                <>
                  I want to&nbsp;
                  <span
                    className='position-relative'
                    style={{ cursor: 'pointer' }}
                  >
                    {method}&nbsp;
                    <img
                      src={IMG_arrow_down}
                      alt='drop down'
                      width={'13px'}
                      onMouseEnter={(): any => {
                        setMethodHover(true)
                      }}
                      onMouseLeave={(): any => {
                        setMethodHover(false)
                      }}
                    />
                    {methodHover && (
                      <SelectMethod
                        handleMethodChange={handleMethodChange}
                        handleMethodHover={(hover): any => {
                          setMethodHover(hover)
                        }}
                      />
                    )}
                  </span>
                </>
              )}
            </CardHeader>

            {method === null && (
              <CardBody>
                <WalletBox>
                  <img src={IMG_wallet1} alt='wallet1' />
                  <span>WalletConnect</span>
                </WalletBox>
                <WalletBox onClick={handleWalletClick}>
                  <img src={IMG_wallet2} alt='wallet2' />
                  <span>Keplr</span>
                </WalletBox>
                <WalletBox>
                  <img src={IMG_wallet3} alt='wallet3' />
                  <span>ixo mobile</span>
                </WalletBox>
              </CardBody>
            )}
            {method !== null && (
              <>
                <CardBody>
                  <PurchaseBox>
                    <img
                      src={fromToken.src}
                      alt={fromToken.name}
                      style={{ marginRight: '10px' }}
                    />
                    <div className='d-inline-flex flex-column'>
                      <span className='token-label'>{fromToken.name}</span>
                      <span className='token-amount'>
                        {fromToken.amount}&nbsp;{fromToken.unit}
                      </span>
                    </div>
                  </PurchaseBox>

                  <div style={{ marginTop: '10px' }} />

                  <PurchaseBox>
                    <img
                      src={toToken.src}
                      alt={toToken.name}
                      style={{ marginRight: '10px' }}
                    />
                    <span className='token-label'>{toToken.name}</span>
                    <div className='triangle-left' />
                  </PurchaseBox>

                  <SwapButton
                    className='d-flex justify-content-center align-itmes-center'
                    onClick={handleSwapClick}
                  >
                    <img src={IMG_swap} alt='swap button' />
                  </SwapButton>
                </CardBody>

                <div style={{ marginTop: '10px' }} />

                <CardBody style={{ padding: '20px' }}>
                  <RateBox>
                    <span>Price</span>
                    <br />
                    1,200 USDC
                    <br />
                    <span>For 1 WHITE RHINO</span>
                  </RateBox>
                </CardBody>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Trade
