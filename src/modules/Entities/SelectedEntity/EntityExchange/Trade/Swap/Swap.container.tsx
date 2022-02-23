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
} from './Swap.container.styles'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

import { Currency } from 'types/models'
import {
  apiCurrencyToCurrency,
  formatCurrency,
} from 'modules/Account/Account.utils'
import SelectSlippage from '../components/SelectSlippage'
import PairListBox from '../components/PairListBox'

import SwapIcon from 'assets/images/exchange/swap.svg'
import SettingIcon from 'assets/images/exchange/setting.svg'
import CloseIcon from 'assets/images/exchange/close.svg'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'

interface TokenInfo {
  image: string
  name: string
  currency: Currency
}

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

  const [fromToken, setFromToken] = useState<TokenInfo>({
    image: require(`assets/images/exchange/token-${'ixo'}.png`),
    name: 'IXO',
    currency: { denom: 'uixo', amount: 0 },
  })
  const [toToken, setToToken] = useState<TokenInfo>({
    image: require(`assets/images/exchange/token-${'usdc'}.png`),
    name: 'USDC',
    currency: { denom: 'usdc', amount: 0 },
  })

  const [fromTokenBalance, setFromTokenBalance] = useState<Currency>({
    denom: '',
    amount: 0,
  })

  const [pairList] = useState([
    {
      image: require(`assets/images/exchange/token-${'usdc'}.png`),
      denom: 'usdc',
    },
    {
      image: require(`assets/images/exchange/token-${'usdc'}.png`),
      denom: 'usdc',
    },
    {
      image: require(`assets/images/exchange/token-${'usdc'}.png`),
      denom: 'usdc',
    },
    {
      image: require(`assets/images/exchange/token-${'usdc'}.png`),
      denom: 'usdc',
    },
    {
      image: require(`assets/images/exchange/token-${'usdc'}.png`),
      denom: 'usdc',
    },
  ])

  const invalidInputAmount = useMemo(
    () => fromToken.currency.amount > formatCurrency(fromTokenBalance).amount,
    [fromTokenBalance, fromToken],
  )

  const handleSwapClick = (): void => {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  const handleFromAmountChange = (e): void => {
    const newValue = e.target.value
    setFromToken({
      ...fromToken,
      currency: {
        ...fromToken.currency,
        amount: Number(newValue),
      },
    })
    setToToken({
      ...toToken,
      currency: {
        ...toToken.currency,
        amount: Number(newValue) * rate,
      },
    })
  }

  const handleMaxFromAmount = (): void => {
    const amount = formatCurrency(fromTokenBalance)?.amount
    setFromToken({
      ...fromToken,
      currency: {
        ...fromToken.currency,
        amount,
      },
    })
    setToToken({
      ...toToken,
      currency: {
        ...toToken.currency,
        amount: Number(amount) * rate,
      },
    })
  }

  const handleViewPairList = (): void => {
    setViewPairList(!viewPairList)
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
            .map((coin) => apiCurrencyToCurrency(coin))
            .find((coin) => coin.denom === fromToken.currency.denom)
          setFromTokenBalance(updated)
        })
    }
  }, [selectedAccountAddress, fromToken.currency.denom])

  useEffect(() => {
    if (!walletType || !selectedAccountAddress) {
      history.push(`/projects/${selectedEntity.did}/exchange/trade`)
    }
    // eslint-disable-next-line
  }, [walletType, selectedAccountAddress])

  useEffect(() => {
    const currency = 'usd'
    const fromDenom = formatCurrency(fromToken.currency).denom
    const toDenom = formatCurrency(toToken.currency).denom

    Axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${fromDenom},${toDenom}&vs_currencies=${currency}`,
    )
      .then((response) => response.data)
      .then((response) => {
        const fromRate = response[fromDenom] ? response[fromDenom][currency] : 1
        const toRate = response[toDenom] ? response[toDenom][currency] : 1

        setRate(fromRate / toRate)
      })
  }, [fromToken.currency, toToken.currency])

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

  const renderSwapPanel = (): JSX.Element => (
    <>
      <CardHeader>
        I want to&nbsp;<span>Swap</span>
      </CardHeader>
      <CardBody>
        <PurchaseBox>
          <img className="mr-3" src={fromToken.image} alt={fromToken.name} />
          <div className="d-inline-flex flex-column">
            <span className="token-label">{fromToken.name}</span>
            <div className="d-flex align-items-center">
              <input
                className="token-amount mr-2"
                type="number"
                step={0.1}
                min={0}
                value={fromToken.currency.amount}
                onChange={handleFromAmountChange}
              />
              <button className="max-button" onClick={handleMaxFromAmount}>
                Max
              </button>
            </div>
            <span
              className={cx('token-stored mt-1', { error: invalidInputAmount })}
            >
              I have {formatCurrency(fromTokenBalance).amount.toFixed(2)}
            </span>
          </div>
          <div className="triangle-left" />
        </PurchaseBox>

        <PurchaseBox className="mt-2 position-relative">
          <img className="mr-3" src={toToken.image} alt={toToken.name} />
          <span className="token-label">{toToken.name}</span>
          <div
            className={cx('indicator', { reverse: viewPairList })}
            onClick={handleViewPairList}
          >
            <img src={ChevDownIcon} alt="" />
          </div>
          {viewPairList && <PairListBox pairList={pairList} />}
        </PurchaseBox>

        <SwapButton
          className="d-flex justify-content-center align-itmes-center"
          onClick={handleSwapClick}
        >
          <img src={SwapIcon} alt="swap button" />
        </SwapButton>
      </CardBody>

      <div style={{ marginTop: '10px' }} />

      <CardBody style={{ padding: '30px' }} border={viewSlippageSetting}>
        {!viewSlippageSetting && !invalidInputAmount && (
          <RateBox className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span className="label mb-1">Receive (Approx)</span>
              <span className="receive-amount mb-2">
                {toToken.currency.amount.toFixed(3)} {toToken.name}
              </span>
              <span className="receive-rate">
                1 {formatCurrency(fromToken.currency).denom} ≈ {rate.toFixed(2)}{' '}
                {formatCurrency(toToken.currency).denom}
              </span>
            </div>
            <div className="d-flex flex-column mr-3">
              <span className="fee-percent">Fee 0.3%</span>
              <span className="fee-amount">12.5 IXO</span>
            </div>
          </RateBox>
        )}
        {!viewSlippageSetting && invalidInputAmount && (
          <RateBox className="">
            <span className="label error">
              The maximum order size is{' '}
              {formatCurrency(fromTokenBalance).amount.toFixed(2)}{' '}
              {formatCurrency(fromTokenBalance).denom.toUpperCase()}
            </span>
          </RateBox>
        )}

        {viewSlippageSetting && (
          <SelectSlippage
            value={slippage}
            handleChange={(newSlippage): void => {
              setSlippage(newSlippage)
            }}
          />
        )}

        <SettingButton
          onClick={(): void => {
            setViewSlippageSetting(!viewSlippageSetting)
          }}
        >
          <img src={!viewSlippageSetting ? SettingIcon : CloseIcon} alt="ts" />
        </SettingButton>
      </CardBody>

      <Submit className="float-right mt-5" onClick={handleSubmit}>
        Swap
      </Submit>
    </>
  )

  return selectedAccountAddress ? (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-4">{renderAssetCard()}</div>
        <div className="col-xs-12 col-md-6 col-lg-4">{renderSwapPanel()}</div>
      </div>
    </div>
  ) : null
}
export default Swap
