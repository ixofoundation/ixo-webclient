import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { changeTradeMethod } from '../EntityExchange.actions'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'modules/Entities/types'
// import keysafe from 'common/keysafe/keysafe'
import {
  CardHeader,
  CardBody,
  WalletBox,
  PurchaseBox,
  RateBox,
  SwapButton,
  SettingButton,
  SlippageStatus,
  VerticalProgressBar,
  Submit,
} from './Trade.container.styles'
import { TradeMethodType } from '../types'
import SelectMethod from './partials/SelectMethod'
import SelectSlippage from './partials/SelectSlippage'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import IMG_token_usdc from 'assets/images/exchange/token-usdc.svg'
import IMG_token_rhino from 'assets/images/exchange/token-rhino.svg'
import IMG_arrow_down from 'assets/images/exchange/arrow-down.svg'
import IMG_swap from 'assets/images/exchange/swap.svg'
import IMG_setting from 'assets/images/exchange/setting.svg'
import { toggleAssistant } from 'modules/Account/Account.actions'

import * as keplr from '../_utils_/keplr'

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
  const [slippage, setSlippage] = useState<number>(5)
  const [methodHover, setMethodHover] = useState<boolean>(false)
  const [settingHover, setSettingHover] = useState<boolean>(false)
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
  const handleSettingChange = (newSetting: number): any => {
    setSlippage(newSetting)
    setSettingHover(false)
    // dispatch(changeTradeMethod(newMethod))
  }

  const handleWalletClick = async (): Promise<any> => {
    const { isInstalled, cosmJS } = await keplr.sign()

    if (!isInstalled) {
      alert('Please install keplr extension')
      setSignedIn(false)
    } else {
      console.log('cosmJS', cosmJS)
      handleMethodChange(TradeMethodType.Purchase)
      setSignedIn(true)
    }
  }

  const handleSwapClick = (): any => {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  const handleSubmit = (): any => {
    dispatch(
      toggleAssistant({
        fixed: true,
        intent: `/exchange{"transaction":"${method.toLowerCase()}","assetID":"${
          selectedEntity.did
        }"}`,
      }),
    )
  }

  useEffect(() => {
    console.log('selectedEntity', selectedEntity)
  }, [selectedEntity])

  return (
    <>
      {selectedEntity && (
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-4'>
              <CardHeader>I Want</CardHeader>
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
          </div>
        </div>
      )}
    </>
  )
}
export default Trade
