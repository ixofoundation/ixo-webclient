import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { changeTradeMethod } from '../EntityExchange.actions'
import IXOCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/IXOCard/IXOCard'
import AssetCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/NoAssetCard'
import { TermsOfUseType } from 'modules/Entities/types'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
// import keysafe from 'common/keysafe/keysafe'
import {
  CardHeader,
  CardBody,
  WalletBox,
  // PurchaseBox,
  // RateBox,
  // SwapButton,
  // SettingButton,
  // SlippageStatus,
  // VerticalProgressBar,
  // Submit,
} from './Trade.container.styles'
import { TradeMethodType } from '../types'
// import SelectMethod from './partials/SelectMethod'
// import SelectSlippage from './partials/SelectSlippage'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
// import IMG_token_usdc from 'assets/images/exchange/token-usdc.svg'
// import IMG_token_rhino from 'assets/images/exchange/token-rhino.svg'
// import IMG_arrow_down from 'assets/images/exchange/arrow-down.svg'
// import IMG_swap from 'assets/images/exchange/swap.svg'
// import IMG_setting from 'assets/images/exchange/setting.svg'
// import { toggleAssistant } from 'modules/Account/Account.actions'

import * as keplr from 'common/utils/keplr'
import { setKeplrWallet } from 'modules/Account/Account.actions'

// interface TokenInfo {
//   src: string
//   name: string
//   unit: string
//   amount: number
// }

const Trade: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const [method, setMethod] = useState<TradeMethodType>(null)
  // const [slippage, setSlippage] = useState<number>(5)
  // const [methodHover, setMethodHover] = useState<boolean>(false)
  // const [settingHover, setSettingHover] = useState<boolean>(false)
  // const [fromToken, setFromToken] = useState<TokenInfo>({
  //   src: IMG_token_usdc,
  //   name: 'USDC',
  //   unit: 'USDC',
  //   amount: 100,
  // })
  // const [toToken, setToToken] = useState<TokenInfo>({
  //   src: IMG_token_rhino,
  //   name: 'White Rhino Token',
  //   unit: 'WRT',
  //   amount: 1,
  // })

  const handleMethodChange = (newMethod: TradeMethodType): any => {
    setMethod(newMethod)
    // setMethodHover(false)
    dispatch(changeTradeMethod(newMethod))
  }
  // const handleSettingChange = (newSetting: number): any => {
    // setSlippage(newSetting)
    // setSettingHover(false)
    // dispatch(changeTradeMethod(newMethod))
  // }

  const handleWalletClick = async (): Promise<any> => {
    const [accounts, offlineSigner] = await keplr.connectAccount()

    console.log('cosmJS', accounts, offlineSigner)
    if (!accounts) {
      setSignedIn(false)
    } else {
      dispatch(setKeplrWallet(accounts[0].address, offlineSigner))
      handleMethodChange(TradeMethodType.Purchase)
      setSignedIn(true)
    }
  }

  // const handleSwapClick = (): any => {
  //   setFromToken(toToken)
  //   setToToken(fromToken)
  // }

  // const handleSubmit = (): any => {
  //   dispatch(
  //     toggleAssistant({
  //       fixed: true,
  //       intent: `/exchange{"transaction":"${method.toLowerCase()}","assetID":"${
  //         selectedEntity.did
  //       }"}`,
  //     }),
  //   )
  // }

  useEffect(() => {
    console.log('selectedEntity', selectedEntity)
  }, [selectedEntity])

  return (
    <>
      {selectedEntity && (
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-4'>
              <CardHeader>I want</CardHeader>
              {!signedIn ? (
                <AssetCard
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
              ) : (
                <IXOCard
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
              )}
            </div>
            <div className='col-xs-12 col-sm-6 col-md-4'>
              <CardHeader>
                {!signedIn && 'Connect My Wallet'}
                {/* {signedIn && (
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
                )} */}
              </CardHeader>

              {method === null && (
                <CardBody>
                  <Tooltip
                    text={'Coming soon'}
                    position={TooltipPosition.Bottom}
                  >
                    <WalletBox>
                      <img src={IMG_wallet1} alt='wallet1' />
                      <span>WalletConnect</span>
                    </WalletBox>
                  </Tooltip>
                  <WalletBox onClick={handleWalletClick}>
                    <img src={IMG_wallet2} alt='wallet2' />
                    <span>Keplr</span>
                  </WalletBox>
                  <Tooltip
                    text={'Coming soon'}
                    position={TooltipPosition.Bottom}
                  >
                    <WalletBox>
                      <img src={IMG_wallet3} alt='wallet3' />
                      <span>ixo mobile</span>
                    </WalletBox>
                  </Tooltip>
                </CardBody>
              )}
              {/* {method !== null && (
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
              )} */}
            </div>
            {/* {method !== null && (
              <div className='col-xs-12 col-sm-6 col-md-4'>
                <CardHeader style={{ marginTop: '10px' }}>
                  <SettingButton>
                    <img
                      src={IMG_setting}
                      alt='Transaction settings'
                      width={'15px'}
                      onMouseEnter={(): any => {
                        setSettingHover(true)
                      }}
                      onMouseLeave={(): any => {
                        setSettingHover(false)
                      }}
                    />
                  </SettingButton>
                  {settingHover && (
                    <SelectSlippage
                      value={slippage}
                      handleChange={handleSettingChange}
                      handleHover={(hover): any => {
                        setSettingHover(hover)
                      }}
                    />
                  )}
                </CardHeader>
                <VerticalProgressBar className='progress'>
                  <div className='progress-bar' style={{ height: '90%' }}></div>
                </VerticalProgressBar>
                <SlippageStatus>
                  <div className='fee'>Fee 0.3%</div>
                  <div className='amount'>
                    36.000 USDC&nbsp;&nbsp;
                    <img src={IMG_arrow_down} alt='drop down' width={'13px'} />
                  </div>
                </SlippageStatus>
              </div>
            )} */}
          </div>
          {/* {method !== null && (
            <div className='row pt-5'>
              <div className='col-12 d-flex justify-content-center'>
                <Submit onClick={handleSubmit}>{method}</Submit>
              </div>
            </div>
          )} */}
        </div>
      )}
    </>
  )
}
export default Trade
