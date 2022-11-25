import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import { Container, NextStep, Overlay } from './Modal.styles'
import { AssetType } from 'states/configs/configs.types'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import { getUSDRateByCoingeckoId } from 'utils'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import BigNumber from 'bignumber.js'
import { calcToAmount } from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.utils'
import { displayTokenAmount } from 'common/utils/currency.utils'
import { ReactComponent as WarningIcon } from 'assets/images/exchange/warning.svg'
import SignStep, { TXStatus } from './components/SignStep'

const SwapPanel = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const SwapInput = styled.div`
  border: 0.5px solid ${(props): string => props.theme.ixoBlue}88;
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
    background-color: ${(props): string => props.theme.ixoBlue};
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
  open: boolean
  setOpen: (open: boolean) => void
}

let timer: any = null
const timeInterval = 30 * 1000 //  30s

const SwapModal: React.FunctionComponent<Props> = ({ open, setOpen, fromAsset, toAsset, fromAmount }) => {
  const steps = ['Review', 'Sign', 'Result']
  const [currentStep, setCurrentStep] = useState(0)
  const [fromUSDRate, setFromUSDRate] = useState(0)
  const [toUSDRate, setToUSDRate] = useState(0)
  const [shouldPriceUpdate, setShouldPriceUpdate] = useState(false)

  const toAmount: BigNumber = useMemo(
    () => calcToAmount(fromAmount, fromUSDRate, toUSDRate),
    [fromAmount, fromUSDRate, toUSDRate],
  )

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
    if (fromAsset?.coingeckoId) {
      getUSDRateByCoingeckoId(fromAsset?.coingeckoId).then((rate): void => setFromUSDRate(rate))
    }
  }, [fromAsset])
  useEffect(() => {
    if (toAsset?.coingeckoId) {
      getUSDRateByCoingeckoId(toAsset?.coingeckoId).then((rate): void => setToUSDRate(rate))
    }
  }, [toAsset])

  const handleUpdatePrice = (): void => {
    getUSDRateByCoingeckoId(fromAsset?.coingeckoId).then((rate): void => setFromUSDRate(rate))
    getUSDRateByCoingeckoId(toAsset?.coingeckoId).then((rate): void => setToUSDRate(rate))
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

  const renderSignStep = (): JSX.Element => <SignStep status={TXStatus.PENDING} />

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
        {currentStep === 1 && renderSignStep()}
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
