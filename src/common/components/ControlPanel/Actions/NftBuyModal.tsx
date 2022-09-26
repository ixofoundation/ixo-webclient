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
import SignStep, { TXStatus } from './components/SignStep'

const NftBuyPanel = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const NftBuyInput = styled.div`
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
const NftBuyInputAsset = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > img {
    width: 20px;
    height: 20px;
  }
`
const NftBuyInputAmount = styled.span``

interface Props {
  nftAsset: any //  TODO: TBD
  token: AssetType
  nftAmount: number
  nftRemainings: number
  price: number
  open: boolean
  setOpen: (open: boolean) => void
}

const NftBuyModal: React.FunctionComponent<Props> = ({
  open,
  setOpen,
  nftAsset,
  token,
  nftAmount,
  nftRemainings,
  price,
}) => {
  const steps = ['Review', 'Sign', 'Result']
  const [currentStep, setCurrentStep] = useState(0)
  const [tokenUSDRate, setTokenUSDRate] = useState(0)

  const tokenAmount: BigNumber = useMemo(
    () => calcToAmount(new BigNumber(nftAmount), price, tokenUSDRate),
    [nftAmount, price, tokenUSDRate],
  )

  useEffect(() => {
    setCurrentStep(0)
  }, [open])
  useEffect(() => {
    if (token?.coingeckoId) {
      getUSDRateByCoingeckoId(token.coingeckoId).then((rate): void =>
        setTokenUSDRate(rate),
      )
    }
  }, [token])

  const handleNextStep = (): void => setCurrentStep((step) => step + 1)

  const renderReviewStep = (): JSX.Element => (
    <>
      <NftBuyPanel>
        <NftBuyInput>
          <NftBuyInputAsset>
            <img src={nftAsset.image} alt="" />
            <div className="d-flex flex-column">
              <span>{nftAsset.symbol}</span>
              <span>
                {nftAmount > 1 ? `${nftAmount} items` : `# ${nftRemainings}`}
              </span>
            </div>
          </NftBuyInputAsset>
          <NftBuyInputAmount>
            ${displayTokenAmount(new BigNumber(price * nftAmount), 2)}
          </NftBuyInputAmount>
        </NftBuyInput>
        <NftBuyInput>
          <NftBuyInputAsset>
            <img src={token.logoURIs.png} alt="" />
            <span>{token.symbol}</span>
          </NftBuyInputAsset>
          <NftBuyInputAmount>
            {displayTokenAmount(new BigNumber(tokenAmount), 2)}
          </NftBuyInputAmount>
        </NftBuyInput>
        <Overlay src={OverlayButtonIcon} alt="" />
      </NftBuyPanel>
    </>
  )

  const renderSignStep = (): JSX.Element => (
    <SignStep status={TXStatus.PENDING} />
  )

  const renderResultStep = (): JSX.Element => (
    <SignStep
      status={TXStatus.SUCCESS}
      customDesc={`You bought ${
        nftAsset.symbol
      } #${nftRemainings} for ${displayTokenAmount(
        new BigNumber(tokenAmount),
        2,
      )} ${token.symbol}`}
    />
  )

  if (!nftAsset || !token) {
    return null
  }
  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Buy',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <StepsTransactions
          className="px-4 pb-4"
          steps={steps}
          currentStepNo={currentStep}
        />

        {currentStep === 0 && renderReviewStep()}
        {currentStep === 1 && renderSignStep()}
        {currentStep === 2 && renderResultStep()}

        {currentStep === 0 && (
          <NextStep onClick={handleNextStep}>
            <img src={NextStepIcon} alt="next-step" />
          </NextStep>
        )}
      </Container>
    </ModalWrapper>
  )
}

export default NftBuyModal
