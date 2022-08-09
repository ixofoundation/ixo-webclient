import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import AssetNewCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetNewCard'
import { TermsOfUseType } from 'modules/Entities/types'

import {
  CardBody,
  CardHeader,
  PurchaseBox,
  RateBox,
  SettingButton,
  Submit,
  SwapButton,
  SwapPanel,
  AssetCardPanel,
} from './Swap.container.styles'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

import { Currencies, minimalDenomToDenom } from 'modules/Account/Account.utils'
import SelectSlippage from '../components/SelectSlippage'
import PairListBox from '../components/PairListBox'

import SwapIcon from 'assets/images/exchange/swap.svg'
import SettingIcon from 'assets/images/exchange/setting.svg'
import CloseIcon from 'assets/images/exchange/close.svg'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'
import { CurrencyType } from 'modules/Account/types'
import {
  selectLiquidityPools,
  selectAvailablePairs,
  selectSelectedAccountAddress,
} from '../../EntityExchange.selectors'

import * as _ from 'lodash'

const Swap: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const selectedAccountAddress = useSelector(selectSelectedAccountAddress)
  const availablePairs = useSelector(selectAvailablePairs)
  const liquidityPools = useSelector(selectLiquidityPools)

  // toggle panel `slippage tolerance` <-> `Est. Receive Amount`
  const [viewSlippageSetting, setViewSlippageSetting] = useState(false)

  // opens pair list dropdown
  const [viewPairList, setViewPairList] = useState(false)
  const [slippage, setSlippage] = useState(0.05)

  // TODO: currently being a placeholder but depends on reserve balances    https://docs.ixo.foundation/alphabond/tutorials/02_swapper#make-a-swap
  // const rate = useMemo(() => 2, [])
  const rate = 2

  // TODO: supposed we have uixo, xusd pair as a default
  const [fromToken, setFromToken] = useState<CurrencyType>(
    Currencies.find((currency) => currency.minimalDenom === 'uixo'),
  )
  const [toToken, setToToken] = useState<CurrencyType>(
    Currencies.find((currency) => currency.minimalDenom === 'xusd'),
  )

  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toAmount, setToAmount] = useState<number>(0)

  // balances currently purchased and stored in wallet
  const [fromTokenBalance, setFromTokenBalance] = useState<number>(0)
  const [toTokenBalance, setToTokenBalance] = useState<number>(0)

  // TODO: filter reserve amount available -> should not be first buy
  const pairList = useMemo<CurrencyType[]>(
    () =>
      Currencies.filter((currency) =>
        availablePairs.some((pair) => currency.denom === pair),
      ).filter(
        (currency) =>
          currency.denom !== fromToken.denom &&
          currency.denom !== toToken.denom,
      ),
    [fromToken, toToken, availablePairs],
  )

  const selectedPoolDetail = useMemo(() => {
    if (!liquidityPools) {
      return undefined
    }
    return liquidityPools.find((pool) =>
      _.difference(pool.poolDetail.reserve_tokens, [
        fromToken.minimalDenom,
        toToken.minimalDenom,
      ]),
    )?.poolDetail
  }, [liquidityPools, fromToken, toToken])

  console.log('selectedPoolDetail', selectedPoolDetail)

  // TODO: validation for inputted from amount,  need to validate under order_quantity_amount
  const invalidInputAmount = useMemo(() => fromAmount > fromTokenBalance, [
    fromTokenBalance,
    fromAmount,
  ])

  const handleSwapClick = (): void => {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  const handleFromAmountChange = (e): void => {
    const amount = Number(e.target.value)
    setFromAmount(amount)
  }

  const handleMaxFromAmount = (): void => {
    const amount = fromTokenBalance
    setFromAmount(amount)
  }

  const handleViewPairList = (): void => {
    setViewPairList(!viewPairList)
  }

  const handleChangePair = (newPair: CurrencyType): void => {
    setToToken(newPair)
    setFromAmount(0)
    setViewPairList(false)
  }

  // TODO: pre check validation true
  const handleSubmit = (): void => {
    console.log('handleSubmit')
  }

  // TODO: maybe this API calling should be processed in Redux in the future
  useEffect(() => {
    if (selectedAccountAddress) {
      Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/bank/balances/${selectedAccountAddress}`,
      )
        .then((response) => response.data)
        .then((response) => response.result)
        .then((response) => {
          const updated = response
            // .map((coin) => apiCurrencyToCurrency(coin))
            .find((coin) => coin.denom === fromToken.minimalDenom)

          setFromTokenBalance(
            minimalDenomToDenom(updated.denom, updated.amount),
          )
        })
        .catch((e) => {
          console.error(e)
          setFromTokenBalance(0)
        })
    }
  }, [selectedAccountAddress, fromToken])

  // TODO: maybe this API calling should be processed in Redux in the future
  useEffect(() => {
    if (selectedAccountAddress) {
      Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/bank/balances/${selectedAccountAddress}`,
      )
        .then((response) => response.data)
        .then((response) => response.result)
        .then((response) => {
          const updated = response
            // .map((coin) => apiCurrencyToCurrency(coin))
            .find((coin) => coin.denom === toToken.minimalDenom)

          setToTokenBalance(minimalDenomToDenom(updated.denom, updated.amount))
        })
        .catch((e) => {
          console.error(e)
          setToTokenBalance(0)
        })
    }
  }, [selectedAccountAddress, toToken])

  useEffect(() => {
    if (!walletType || !selectedAccountAddress) {
      history.push(`/projects/${selectedEntity.did}/exchange/trade`)
    }
    // eslint-disable-next-line
  }, [walletType, selectedAccountAddress])

  useEffect(() => {
    // const { order_quantity_limits } = selectedPoolDetail
    // const
    setToAmount(fromAmount * rate)
  }, [fromAmount, rate])

  const [panelHeight, setPanelHeight] = useState('auto')
  useEffect(() => {
    if (selectedAccountAddress) {
      const assetCardDOM: any = document.querySelector('#asset-card')
      const assetCardStyle: any = window.getComputedStyle
        ? getComputedStyle(assetCardDOM, null)
        : assetCardDOM.currentStyle
      setPanelHeight(assetCardStyle.height)
    } else {
      setPanelHeight('auto')
    }
  }, [selectedAccountAddress])

  const renderAssetCard = (): JSX.Element => (
    <>
      <CardHeader>Asset</CardHeader>
      <AssetNewCard
        id={'asset-card'}
        did={selectedEntity.did}
        name={selectedEntity.name}
        logo={selectedEntity.logo}
        image={selectedEntity.image}
        sdgs={selectedEntity.sdgs}
        description={selectedEntity.description}
        dateCreated={selectedEntity.dateCreated}
        badges={[]}
        version={''}
        termsType={TermsOfUseType.PayPerUse}
        isExplorer={false}
      />
    </>
  )

  const renderFromToken = (): JSX.Element => (
    <PurchaseBox border="#49BFE0">
      <img className="mr-3" src={fromToken.imageUrl} alt={fromToken.denom} />
      <div className="d-inline-flex flex-column">
        <span className="token-label">{fromToken.denom}</span>
        <div className="d-flex align-items-center">
          <input
            className="token-amount mr-2"
            type="number"
            step={0.1}
            min={0}
            value={fromAmount}
            onChange={handleFromAmountChange}
          />
          <button className="max-button" onClick={handleMaxFromAmount}>
            Max
          </button>
        </div>
        <span
          className={cx('token-stored mt-1', {
            error: invalidInputAmount,
          })}
        >
          I have {fromTokenBalance.toFixed(3)}
        </span>
      </div>
      <div className="triangle-left" />
    </PurchaseBox>
  )

  const renderToToken = (): JSX.Element => (
    <PurchaseBox className="mt-2 position-relative" border="#49BFE0">
      <img className="mr-3" src={toToken.imageUrl} alt={toToken.denom} />
      <div className="d-flex flex-column">
        <span className="token-label">{toToken.denom}</span>
        <span className="token-stored mt-1">
          I have {toTokenBalance.toFixed(3)}
        </span>
      </div>
      <div
        className={cx('indicator', { reverse: viewPairList })}
        onClick={handleViewPairList}
      >
        <img src={ChevDownIcon} alt="" />
      </div>
      {viewPairList && (
        <PairListBox pairList={pairList} handleChangePair={handleChangePair} />
      )}
      <div className="triangle-right" />
    </PurchaseBox>
  )

  const renderSwapButton = (): JSX.Element => (
    <SwapButton
      className="d-flex justify-content-center align-itmes-center"
      onClick={handleSwapClick}
    >
      <img src={SwapIcon} alt="swap button" />
    </SwapButton>
  )

  const renderRateBox = (): JSX.Element =>
    !invalidInputAmount ? (
      <RateBox className="d-flex justify-content-between align-items-center pt-3">
        <div className="d-flex flex-column">
          <span className="label mb-1">I will receive(Approx)</span>
          <span className="receive-amount mb-2">
            {toAmount.toFixed(3)} {toToken.denom}
          </span>
          <span className="receive-rate">
            1 {fromToken.denom} ≈ {rate.toFixed(2)} {toToken.denom}
          </span>
        </div>
        <div className="d-flex flex-column mr-3">
          <div className="d-flex flex-column mb-2">
            <span className="slippage-label">Slippage</span>
            <span className={cx('slippage-value', { error: slippage > 0.08 })}>
              8%
            </span>
          </div>
          <div className="d-flex flex-column">
            <span className="fee-percent">Fee 0.3%</span>
            <span className="fee-amount">12.5 IXO</span>
          </div>
        </div>
      </RateBox>
    ) : (
      <RateBox className="">
        <span className="label error">
          The maximum order size is {fromTokenBalance.toFixed(2)}{' '}
          {fromToken.denom.toUpperCase()}
        </span>
      </RateBox>
    )
  const renderSlippageBox = (): JSX.Element => (
    <SelectSlippage
      className="pt-3"
      value={slippage}
      handleChange={(newSlippage): void => {
        setSlippage(newSlippage)
      }}
    />
  )

  const renderSettingButton = (): JSX.Element => (
    <SettingButton
      onClick={(): void => {
        setViewSlippageSetting(!viewSlippageSetting)
      }}
    >
      <img src={!viewSlippageSetting ? SettingIcon : CloseIcon} alt="ts" />
    </SettingButton>
  )

  const renderSwapPanel = (): JSX.Element => (
    <>
      <CardHeader>
        I want to&nbsp;<span>Swap</span>
      </CardHeader>
      <CardBody height={panelHeight}>
        <div className="position-relative mb-2">
          {renderFromToken()}
          {renderToToken()}
          {renderSwapButton()}
        </div>

        <div className="position-relative pt-2 px-4">
          {!viewSlippageSetting && renderRateBox()}
          {viewSlippageSetting && renderSlippageBox()}
          {renderSettingButton()}
        </div>
      </CardBody>

      <Submit className="float-right mt-5" onClick={handleSubmit}>
        Swap
      </Submit>
    </>
  )

  return selectedAccountAddress ? (
    <div className="d-flex">
      <AssetCardPanel>{renderAssetCard()}</AssetCardPanel>
      <SwapPanel>{renderSwapPanel()}</SwapPanel>
      <AssetCardPanel>{renderAssetCard()}</AssetCardPanel>
    </div>
  ) : null
}
export default Swap
