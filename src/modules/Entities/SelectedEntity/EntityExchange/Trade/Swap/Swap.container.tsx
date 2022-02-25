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

const Swap: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const { selectedAccountAddress } = useSelector(
    (state: RootState) => state.selectedEntityExchange,
  )
  const [viewSlippageSetting, setViewSlippageSetting] = useState(false)
  const [viewPairList, setViewPairList] = useState(false)
  const [slippage, setSlippage] = useState(0.05)
  const [rate, setRate] = useState(1)

  const [fromToken, setFromToken] = useState<CurrencyType>(Currencies[0])
  const [toToken, setToToken] = useState<CurrencyType>(Currencies[1])

  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toAmount, setToAmount] = useState<number>(0)
  const [fromTokenBalance, setFromTokenBalance] = useState<number>(0)
  const [toTokenBalance, setToTokenBalance] = useState<number>(0)

  const pairList = useMemo<CurrencyType[]>(
    () =>
      Currencies.filter(
        (currency) =>
          currency.denom !== fromToken.denom &&
          currency.denom !== toToken.denom,
      ),
    [fromToken, toToken],
  )

  const invalidInputAmount = useMemo(
    () => fromAmount > fromTokenBalance,
    [fromTokenBalance, fromAmount],
  )

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

  const handleSubmit = (): void => {
    console.log('handleSubmit')
  }

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
    const currency = 'usd'
    const fromDenom = fromToken.denom
    const toDenom = toToken.denom

    Axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${fromDenom},${toDenom}&vs_currencies=${currency}`,
    )
      .then((response) => response.data)
      .then((response) => {
        const fromRate = response[fromDenom] ? response[fromDenom][currency] : 1
        const toRate = response[toDenom] ? response[toDenom][currency] : 1

        setRate(fromRate / toRate)
      })
  }, [fromToken, toToken])

  useEffect(() => {
    setToAmount(fromAmount * rate)
  }, [fromAmount, rate])

  const renderAssetCard = (): JSX.Element => (
    <>
      <CardHeader>Asset</CardHeader>
      <AssetNewCard
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
    <PurchaseBox className="mt-2 position-relative" border="#083347">
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
      <RateBox className="d-flex justify-content-between align-items-center pt-2">
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
          <div className="d-flex flex-column mb-3">
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
      <CardBody>
        <div className="position-relative mb-2">
          {renderFromToken()}
          {renderToToken()}
          {renderSwapButton()}
        </div>

        <div className="position-relative p-4">
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
    </div>
  ) : null
}
export default Swap
