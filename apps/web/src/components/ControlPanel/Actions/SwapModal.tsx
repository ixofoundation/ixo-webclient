import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'
import { Container, NextStep, Overlay } from './Modal.styles'
import { AssetType } from 'redux/configs/configs.types'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import BigNumber from 'bignumber.js'
import { displayTokenAmount } from 'utils/currency'
import { ReactComponent as WarningIcon } from 'assets/images/exchange/warning.svg'
import SignStep, { TXStatus } from './components/SignStep'
import RenderSignStep from 'components/Pages/Exchange/Swap/RenderSignStep'
import { ExchangeAsset } from 'redux/exchange/exchange.types'
import { useDispatch } from 'react-redux'
import { resetState, setInputAssetUSDAmount, setOutputAssetUSDAmount } from 'redux/exchange/exchange.actions'

const SwapPanel = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const SwapInput = styled.div`
  border: 0.5px solid ${(props): string => props.theme.ixoNewBlue}88;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #ffffff;
`
const SwapInputAsset = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > img {
    width: 20px;
    height: 20px;
  }
`
const SwapInputAmount = styled.span``

const PriceUpdateLabelWrapper = styled.div<{ visible: boolean }>`
  visibility: ${(props): string => (props.visible ? 'visible' : 'hidden')};
  pointer-events: ${(props): string => (props.visible ? 'auto' : 'none')};
  width: 100%;
  margin: 50px 0px;
  display: flex;
  justify-content: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: ${(props): string => props.theme.ixoOrange};
`
const PriceUpdateLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const PriceUpdateProgress = styled.div`
  width: 100%;
  &::after {
    content: ' ';
    height: 4px;
    background-color: ${(props): string => props.theme.ixoNewBlue};
    float: right;
    border-radius: 10px;
    animation-name: percent;
    animation-duration: 30s;
  }

  @keyframes percent {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`

interface Props {
  fromAsset: AssetType
  toAsset: AssetType
  fromAmount: BigNumber
  toAmount: BigNumber
  open: boolean
  setOpen: (open: boolean) => void
  slippage: any
  inputAsset: ExchangeAsset
  outputAsset: ExchangeAsset
  tokenBalances: any
}

let timer: any = null
const timeInterval = 30 * 1000 //  30s

const SwapModal: React.FunctionComponent<Props> = ({
  open,
  setOpen,
  fromAsset,
  toAsset,
  fromAmount,
  slippage,
  toAmount,
  inputAsset,
  outputAsset,
  tokenBalances,
}) => {
  const steps = ['Review', 'Sign', 'Result']
  const [currentStep, setCurrentStep] = useState(0)
  const [shouldPriceUpdate, setShouldPriceUpdate] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentStep(0)
    setShouldPriceUpdate(false)
    if (!open) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        setShouldPriceUpdate(true)
      }, timeInterval)
    }
  }, [open])
  useEffect(() => {
    if (inputAsset?.asset?.coingeckoId) {
      getUSDRateByCoingeckoId(inputAsset?.asset?.coingeckoId).then((rate): void => {
        dispatch(setInputAssetUSDAmount(BigNumber(rate)))
      })
    }
  }, [inputAsset?.asset?.coingeckoId, dispatch])
  useEffect(() => {
    if (outputAsset?.asset?.coingeckoId) {
      getUSDRateByCoingeckoId(outputAsset?.asset?.coingeckoId).then((rate): void => {
        dispatch(setOutputAssetUSDAmount(BigNumber(rate)))
      })
    }
  }, [outputAsset?.asset?.coingeckoId, dispatch])

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (currentStep === 2) {
      timerId = setTimeout(() => {
        dispatch(resetState())
      }, 3000)
    }
    return () => clearTimeout(timerId)
  }, [currentStep, dispatch])

  const handleUpdatePrice = (): void => {
    getUSDRateByCoingeckoId(fromAsset?.coingeckoId).then((rate): void => {
      dispatch(setInputAssetUSDAmount(BigNumber(rate)))
    })
    getUSDRateByCoingeckoId(toAsset?.coingeckoId).then((rate): void => {
      dispatch(setOutputAssetUSDAmount(BigNumber(rate)))
    })
    setShouldPriceUpdate(false)

    clearTimeout(timer)
    timer = setTimeout(() => {
      setShouldPriceUpdate(true)
    }, timeInterval)
  }

  const handleNextStep = (): void => setCurrentStep((step) => step + 1)

  const renderReviewStep = (): JSX.Element => (
    <>
      <SwapPanel>
        <SwapInput>
          <SwapInputAsset>
            <img src={fromAsset.logoURIs.png} alt='' />
            <span>{fromAsset.symbol}</span>
          </SwapInputAsset>
          <SwapInputAmount>{displayTokenAmount(new BigNumber(fromAmount), 2)}</SwapInputAmount>
        </SwapInput>
        <SwapInput>
          <SwapInputAsset>
            <img src={toAsset.logoURIs.png} alt='' />
            <span>{toAsset.symbol}</span>
          </SwapInputAsset>
          <SwapInputAmount>{displayTokenAmount(new BigNumber(toAmount), 2)}</SwapInputAmount>
        </SwapInput>
        <Overlay src={OverlayButtonIcon} alt='' />
      </SwapPanel>

      <PriceUpdateLabelWrapper visible={shouldPriceUpdate}>
        <PriceUpdateLabel onClick={handleUpdatePrice}>
          <WarningIcon />
          <span>Update Price</span>
        </PriceUpdateLabel>
      </PriceUpdateLabelWrapper>

      {!shouldPriceUpdate && <PriceUpdateProgress />}
    </>
  )

  const renderResultStep = (): JSX.Element => (
    <SignStep
      status={TXStatus.SUCCESS}
      customDesc={`You exchanged ${displayTokenAmount(new BigNumber(fromAmount), 2)} ${
        fromAsset.symbol
      } for ${displayTokenAmount(new BigNumber(toAmount), 2)} ${toAsset.symbol}`}
    />
  )

  if (!fromAsset || !toAsset) {
    return null
  }
  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Swap',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <StepsTransactions className='px-4 pb-4' steps={steps} currentStepNo={currentStep} />

        {currentStep === 0 && renderReviewStep()}
        {currentStep === 1 && (
          <RenderSignStep
            tokenBalances={tokenBalances}
            inputAsset={inputAsset}
            outputAsset={outputAsset}
            slippage={slippage}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && renderResultStep()}

        {currentStep === 0 && (
          <NextStep onClick={handleNextStep}>
            <img src={NextStepIcon} alt='next-step' />
          </NextStep>
        )}
      </Container>
    </ModalWrapper>
  )
}

export default SwapModal
